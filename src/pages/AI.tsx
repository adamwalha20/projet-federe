import { useState, useEffect, useRef, FormEvent } from 'react';
import { useStore } from '../store/useStore';
import { sendToN8n } from '../lib/n8n';
import clsx from 'clsx';

interface Message {
  role: 'ai' | 'user';
  content: string;
}

interface AIInsight {
  type: string;
  title: string;
  description: string;
  image?: string;
}

interface N8nStructuredData {
  status: string;
  calorie_feedback: string;
  activity_feedback: string;
  food_feedback: string;
  recommendations: string[];
  notifications: string[];
  prediction: string;
}

export default function AI() {
  const { user, meals, activities, steps } = useStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: "Hello! I'm analyzing your TuniFit health data. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [n8nData, setN8nData] = useState<N8nStructuredData | null>(null);
  const [insights, setInsights] = useState<AIInsight[]>([
    {
      type: 'NUTRITION',
      title: 'Syncing your data...',
      description: 'Please wait while I analyze your latest meals and activities to provide custom recommendations.',
      image: '/images/meals/couscous.png'
    }
  ]);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Robust parser for n8n's nested output format
  const parseN8nResponse = (data: any) => {
    try {
      if (!data) return null;
      
      // Handle array response: [{ output: "..." }]
      const first = Array.isArray(data) ? data[0] : data;
      const outputStr = first?.output || first?.reply || "";
      
      // If it looks like a markdown code block: ```json\n{...}\n```
      const jsonMatch = outputStr.match(/```json\n([\s\S]*?)\n```/) || outputStr.match(/```([\s\S]*?)```/);
      const cleanJson = jsonMatch ? jsonMatch[1] : outputStr;
      
      // If it's pure JSON string, parse it.
      // If parsing fails, it might just be a regular message string.
      try {
        return JSON.parse(cleanJson);
      } catch {
        return { reply: outputStr }; // Fallback to a simple reply object
      }
    } catch (e) {
      console.error("Critical parsing error", e);
      return null;
    }
  };

  // Initial fetch of insights
  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      const response = await sendToN8n({
        type: 'initial_insights',
        user,
        meals,
        activities,
        steps
      });
      
      const parsed = parseN8nResponse(response);
      if (parsed && parsed.recommendations) {
        setN8nData(parsed);
        // Map recommendations to our AIInsight format
        const newInsights = parsed.recommendations.map((rec: string, idx: number) => ({
          type: idx % 2 === 0 ? 'NUTRITION' : 'ACTIVITY',
          title: idx === 0 ? "Top Recommendation" : `Tip #${idx + 1}`,
          description: rec,
          image: idx === 0 ? '/images/meals/couscous.png' : undefined
        }));
        setInsights(newInsights);
      }
      setLoading(false);
    };
    fetchInsights();
  }, []);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    const response = await sendToN8n({
      type: 'chat',
      message: userMessage,
      user,
      meals,
      activities,
      steps
    });

    const parsed = parseN8nResponse(response);
    if (parsed) {
      // Prioritize explicit reply fields, then fall back to feedback or raw output
      const first = Array.isArray(response) ? response[0] : response;
      const rawOutput = first?.output || first?.reply || first?.text || "";
      
      const reply = parsed.reply || parsed.message || parsed.text || 
                    parsed.calorie_feedback || parsed.activity_feedback || 
                    (typeof parsed === 'string' ? parsed : rawOutput) || 
                    "I've processed your data. Check the insights section for updates!";
      
      setMessages(prev => [...prev, { role: 'ai', content: reply }]);
      
      // If the chat response also updated recommendations, update the UI
      if (parsed.recommendations) {
        setN8nData(parsed);
        const newInsights = parsed.recommendations.map((rec: string, idx: number) => ({
          type: idx % 2 === 0 ? 'NUTRITION' : 'ACTIVITY',
          title: idx === 0 ? "Top Recommendation" : `Tip #${idx + 1}`,
          description: rec,
          image: idx === 0 ? '/images/meals/couscous.png' : undefined
        }));
        setInsights(newInsights);
      }
    } else {
      setMessages(prev => [...prev, { role: 'ai', content: "I'm having trouble connecting right now. Please try again later." }]);
    }
    setLoading(false);
  };

  return (
    <main className="pt-24 pb-12 px-6 max-w-2xl mx-auto space-y-8">
      {/* Header & Title */}
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary font-bold">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span className="font-label text-xs uppercase tracking-widest">AI Recommendations</span>
            </div>
            <h1 className="font-headline font-extrabold text-4xl text-on-surface tracking-tight leading-none">TuniFit AI Insights</h1>
          </div>
          {n8nData && (
            <div className={clsx(
              "px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-sm border",
              n8nData.status === 'balanced' ? "bg-green-50 text-green-700 border-green-100" : "bg-orange-50 text-orange-700 border-orange-100"
            )}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
              Status: {n8nData.status}
            </div>
          )}
        </div>
      </header>

      {/* Notifications Section */}
      {n8nData && n8nData.notifications && n8nData.notifications.length > 0 && (
        <section className="space-y-3">
          {n8nData.notifications.map((note, i) => (
            <div key={i} className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-lg">notifications_active</span>
              </div>
              <p className="text-sm font-medium text-on-surface">{note}</p>
            </div>
          ))}
        </section>
      )}

      {/* Daily Overview / Feedback Bento */}
      {n8nData && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface-container-low p-6 rounded-[2rem] space-y-3 border border-slate-100 transition-all hover:border-primary/20">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-2">
              <span className="material-symbols-outlined">restaurant</span>
            </div>
            <h4 className="font-headline font-bold text-lg">Nutrition</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-4">{n8nData.food_feedback}</p>
          </div>
          <div className="bg-surface-container-low p-6 rounded-[2rem] space-y-3 border border-slate-100 transition-all hover:border-primary/20">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <h4 className="font-headline font-bold text-lg">Calories</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-4">{n8nData.calorie_feedback}</p>
          </div>
          <div className="bg-surface-container-low p-6 rounded-[2rem] space-y-3 border border-slate-100 transition-all hover:border-primary/20">
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-2">
              <span className="material-symbols-outlined">directions_run</span>
            </div>
            <h4 className="font-headline font-bold text-lg">Activity</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-4">{n8nData.activity_feedback}</p>
          </div>
        </section>
      )}

      {/* Bento Recommendations Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dynamic Insight Card */}
        {insights.map((insight, idx) => (
          <div key={idx} className={clsx(
            "rounded-[2rem] p-6 flex flex-col gap-6 relative overflow-hidden group transition-all hover:shadow-lg",
            idx === 0 ? "md:col-span-2 bg-surface-container-lowest md:flex-row" : "bg-surface-container"
          )}>
            <div className="flex-1 space-y-4 z-10">
              <div className="inline-flex items-center gap-2 bg-secondary-container px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-on-secondary-container text-sm">
                  {insight.type === 'NUTRITION' ? 'restaurant' : 'fitness_center'}
                </span>
                <span className="font-label text-[10px] font-bold text-on-secondary-container uppercase">{insight.type}</span>
              </div>
              <h3 className="font-headline font-bold text-2xl text-on-surface">{insight.title}</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm">{insight.description}</p>
              {idx === 0 && (
                <button className="bg-primary-container text-on-primary-container px-6 py-3 rounded-full font-bold text-sm inline-flex items-center gap-2 active:scale-95 transition-transform">
                  View Detail <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              )}
            </div>
            {insight.image && idx === 0 && (
              <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden relative">
                <img 
                  src={insight.image} 
                  alt={insight.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
          </div>
        ))}
        
        {/* Placeholder for smaller insight if only one exists */}
        {insights.length < 2 && (
          <div className="bg-surface-container rounded-[2rem] p-6 space-y-4 flex flex-col justify-center items-center text-center opacity-50 grayscale border-2 border-dashed border-slate-200">
            <span className="material-symbols-outlined text-4xl text-slate-300">data_exploration</span>
            <p className="text-xs font-bold text-slate-400">Syncing more data for deeper insights...</p>
          </div>
        )}

        {/* Prediction Weight Loss Chart (keep static for visual impact, or make dynamic later) */}
        <div className="bg-surface-container-low rounded-[2rem] p-6 space-y-4 overflow-hidden relative min-h-[220px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-tertiary">trending_down</span>
            <span className="font-label text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Prediction</span>
          </div>
          <h4 className="font-headline font-bold text-lg leading-tight">Projected Weight Loss</h4>
          
          <div className="h-24 flex items-end gap-2 mt-4">
            <div className="flex-1 bg-tertiary-fixed h-[90%] rounded-t-lg opacity-30"></div>
            <div className="flex-1 bg-tertiary-fixed h-[80%] rounded-t-lg opacity-40"></div>
            <div className="flex-1 bg-tertiary-fixed h-[65%] rounded-t-lg opacity-60"></div>
            <div className="flex-1 bg-tertiary h-[45%] rounded-t-lg shadow-lg relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-bold text-[10px] text-tertiary">Goal</div>
            </div>
          </div>
          <p className="text-[11px] font-medium text-on-surface-variant italic">
            {n8nData ? `Currently ${n8nData.prediction}` : 'Syncing data...'}
          </p>
        </div>
      </section>

      {/* AI Chat Interface */}
      <section className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col h-[500px]">
        {/* Chat Header */}
        <div className="ai-gradient-bg p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
            <div>
              <div className="font-headline font-bold">TuniFit AI</div>
              <div className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Powered by n8n</div>
            </div>
          </div>
          <span className={clsx("w-2 h-2 rounded-full", loading ? "bg-orange-400 animate-bounce" : "bg-green-400 animate-pulse")}></span>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-slate-50/30 scroll-smooth">
          {messages.map((msg, i) => (
            <div key={i} className={clsx("flex gap-3 max-w-[85%]", msg.role === 'user' ? "ml-auto flex-row-reverse" : "")}>
              <div className={clsx(
                "w-8 h-8 rounded-full shrink-0 flex items-center justify-center",
                msg.role === 'ai' ? "bg-primary-container" : "bg-slate-200"
              )}>
                <span className="material-symbols-outlined text-xs text-on-primary-container">
                  {msg.role === 'ai' ? 'smart_toy' : 'person'}
                </span>
              </div>
              <div className={clsx(
                "p-4 rounded-2xl text-sm shadow-sm border",
                msg.role === 'ai' 
                  ? "bg-white rounded-tl-none text-on-surface-variant border-slate-100" 
                  : "bg-primary text-white rounded-tr-none border-primary"
              )}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 max-w-[85%] animate-pulse">
              <div className="w-8 h-8 rounded-full bg-slate-100 shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-300 text-xs">more_horiz</span>
              </div>
              <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none w-24 h-10"></div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <form onSubmit={handleSendMessage} className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Ask anything about your health..." 
              className="w-full bg-surface-container-low border-none rounded-full py-4 pl-6 pr-14 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400 text-on-surface"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center active:scale-90 transition-all disabled:opacity-50 disabled:scale-100"
            >
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
