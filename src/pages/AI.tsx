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

export default function AI() {
  const { user, meals, activities, steps } = useStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: "Hello! Based on your recent health data, I'm analyzing your routine. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<AIInsight[]>([
    {
      type: 'NUTRITION',
      title: 'Optimize your lunch',
      description: 'Based on your metabolism, we suggest substituting fried foods for grilled Grilled Sea Bream to maintain ketosis.',
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

  // Initial fetch of insights
  useEffect(() => {
    const fetchInsights = async () => {
      const response = await sendToN8n({
        type: 'initial_insights',
        user,
        meals,
        activities,
        steps
      });
      if (response && response.insights) {
        setInsights(response.insights);
      }
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

    if (response && response.reply) {
      setMessages(prev => [...prev, { role: 'ai', content: response.reply }]);
    } else {
      setMessages(prev => [...prev, { role: 'ai', content: "I'm having trouble connecting right now. Please try again later." }]);
    }
    setLoading(false);
  };

  return (
    <main className="pt-24 pb-12 px-6 max-w-2xl mx-auto space-y-8">
      {/* Header & Title */}
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-primary font-bold">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <span className="font-label text-xs uppercase tracking-widest">AI Recommendations</span>
        </div>
        <h1 className="font-headline font-extrabold text-4xl text-on-surface tracking-tight leading-none">TuniFit AI Insights</h1>
      </header>

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
          <p className="text-[11px] font-medium text-on-surface-variant italic">Reach 72kg by July 15th</p>
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
