export default function AI() {
  return (
    <main className="pt-24 pb-32 px-6 max-w-2xl mx-auto space-y-8">
      {/* Header & Title */}
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-primary font-bold">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <span className="font-label text-xs uppercase tracking-widest">AI Recommendations</span>
        </div>
        <h1 className="font-headline font-extrabold text-4xl text-on-surface tracking-tight leading-none">Insights de WakeUp IA</h1>
      </header>

      {/* Bento Recommendations Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nutrition Card (Asymmetric Layout) */}
        <div className="md:col-span-2 bg-surface-container-lowest rounded-[2rem] p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden group">
          <div className="flex-1 space-y-4 z-10">
            <div className="inline-flex items-center gap-2 bg-secondary-container px-3 py-1 rounded-full">
              <span className="material-symbols-outlined text-on-secondary-container text-sm">restaurant</span>
              <span className="font-label text-[10px] font-bold text-on-secondary-container uppercase">Nutrition</span>
            </div>
            <h3 className="font-headline font-bold text-2xl text-on-surface">Optimize your lunch</h3>
            <p className="text-on-surface-variant leading-relaxed">Based on your metabolism, we suggest substituting fried foods for grilled <span className="text-primary font-bold italic">Dorade grillée</span> to maintain ketosis.</p>
            <button className="bg-primary-container text-on-primary-container px-6 py-3 rounded-full font-bold text-sm inline-flex items-center gap-2 active:scale-95 transition-transform">
              See Recipe <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden relative">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT5bodbrrDe4Rp0gjFk-MRDwgOASwhSszAyOfQ1joLq28j8hxATChRC2JMAJUoHntT37AjGf4emvlpwxpId6LKm5H19xNi4T8EGAo-v-uSO8b3McIiiDxYlt_cXJhPamPSu_0ZIoRkaM-CPf7GSKSz0gyycBkE2DG_Gy_y-rbLW52FQTRdaY9XhLeL23Gp0FyzJXsljl_mdu8EZCiAVSe0YlSBX2qiyWslobAl1V9XGevmak4xMujnDKY5BYITuY5FQl6KScb5HxOl" 
              alt="Grilled Dorade" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Activity Notification Card */}
        <div className="bg-surface-container rounded-[2rem] p-6 space-y-4 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-white rounded-2xl">
              <span className="material-symbols-outlined text-primary text-2xl">fitness_center</span>
            </div>
            <span className="font-label text-[10px] font-bold text-slate-500 uppercase tracking-widest">Activity</span>
          </div>
          <div>
            <h4 className="font-headline font-bold text-lg text-on-surface leading-snug">You're 1,500 steps away from your goal!</h4>
            <p className="text-on-surface-variant text-sm mt-1">Go for a 15-min walk to close your ring.</p>
          </div>
          <div className="vitality-ring-gradient-ai w-12 h-12 rounded-full relative flex items-center justify-center p-1">
            <div className="w-full h-full bg-surface-container rounded-full flex items-center justify-center">
              <span className="text-[10px] font-bold">85%</span>
            </div>
          </div>
        </div>

        {/* Prediction Weight Loss Chart */}
        <div className="bg-surface-container-low rounded-[2rem] p-6 space-y-4 overflow-hidden relative">
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
      <section className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col min-h-[400px]">
        {/* Chat Header */}
        <div className="ai-gradient-bg p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
            <div>
              <div className="font-headline font-bold">WakeUp AI</div>
              <div className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Active Assistant</div>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-slate-50/30">
          {/* AI Message */}
          <div className="flex gap-3 max-w-[85%]">
            <div className="w-8 h-8 rounded-full bg-primary-container shrink-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xs">smart_toy</span>
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-none text-sm text-on-surface-variant shadow-sm border border-slate-100">
              Hello! Based on your sleep quality last night (7.5h, 88% efficiency), I recommend a light morning cardio today. How can I help you optimize your routine?
            </div>
          </div>

          {/* User Message */}
          <div className="flex gap-3 max-w-[85%] ml-auto flex-row-reverse">
            <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-500 text-xs">person</span>
            </div>
            <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-none text-sm shadow-md">
              Should I adjust my calorie intake if I do cardio today?
            </div>
          </div>
        </div>

        {/* Chat Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Ask anything about your health..." 
              className="w-full bg-surface-container-low border-none rounded-full py-4 pl-6 pr-14 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400"
            />
            <button className="absolute right-2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center active:scale-90 transition-transform">
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
