import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useEffect, useState } from 'react';
import { sendToN8n } from '../lib/n8n';

export default function Home() {
  const { user, meals, activities, steps, dailyCalorieGoal } = useStore();
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  const caloriesConsumed = meals.reduce((acc, meal) => acc + meal.calories, 0) || 840;
  const caloriesLeft = dailyCalorieGoal - caloriesConsumed;

  useEffect(() => {
    // Fetch AI insight on load
    const fetchInsight = async () => {
      const res = await sendToN8n('recommendations', {
        user,
        caloriesConsumed,
        steps,
        activities
      });
      if (res && res.advice) {
        setAiInsight(res.advice);
      }
    };
    fetchInsight();
  }, [user, caloriesConsumed, steps, activities]);

  return (
    <main className="pt-24 px-6 max-w-7xl mx-auto pb-32">
      {/* Hero Section: The Vitality Ring */}
      <section className="mb-10">
        <div className="flex flex-col md:flex-row items-center gap-8 bg-surface-container-lowest rounded-[2rem] p-8">
          {/* Large Calorie Ring */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-[16px] border-surface-container"></div>
            <div 
              className="absolute inset-0 rounded-full border-[16px] border-primary border-t-transparent border-r-transparent transform -rotate-45 transition-all duration-1000"
              style={{ clipPath: `polygon(0 0, 100% 0, 100% ${Math.min(100, (caloriesConsumed / dailyCalorieGoal) * 100)}%, 0 100%)` }}
            ></div>
            <div className="text-center">
              <span className="block text-4xl font-extrabold text-on-surface tracking-tight">{caloriesLeft}</span>
              <span className="block text-sm font-semibold text-slate-500 uppercase tracking-widest">kcal left</span>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold tracking-tight text-on-surface">Good Morning, {user?.name?.split(' ')[0] || 'Sarah'}</h2>
              <p className="text-on-surface-variant font-medium">You've consumed {caloriesConsumed} kcal of your {dailyCalorieGoal} kcal goal.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Small Ring: Steps */}
              <div className="flex items-center gap-3 bg-surface-container-low p-4 rounded-2xl">
                <div className="w-12 h-12 rounded-full border-4 border-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary text-sm">footprint</span>
                </div>
                <div>
                  <span className="block font-bold text-lg leading-none">{steps.toLocaleString()}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Steps</span>
                </div>
              </div>
              {/* Small Ring: Water */}
              <div className="flex items-center gap-3 bg-surface-container-low p-4 rounded-2xl">
                <div className="w-12 h-12 rounded-full border-4 border-tertiary flex items-center justify-center">
                  <span className="material-symbols-outlined text-tertiary text-sm">water_drop</span>
                </div>
                <div>
                  <span className="block font-bold text-lg leading-none">1.2 L</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Water</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recommended Meal Card (Large) */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-[2rem] overflow-hidden flex flex-col md:flex-row min-h-[320px]">
          <div className="md:w-1/2 relative h-48 md:h-auto">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGhPypKcXJZ_Liem9UxE47AFHzIN4naQd5CJ7sh35aJajPIRzTJ6PQ1rh8JkR3JoRTR5HvESI4xoMyphxfLMn4C4oRG-ub1QSBWFSgGqKqfxLdiLLDmJo3f3EnoJndoQUub6jhzvd4jtugxe6sgvITLa8bWWD7IxQuCXbYDL6qWA8xwtaJp2W_j9brFEQiIxeQFL-k4WDg_5UmTcJwie6xOz2KLqAMQjD2CXyQJdYn_Sjr5uOPMfZUoAip6BjIUjAvNLzdvxfzOXvY" 
              alt="Tunisian Lablabi Bowl" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary">Recommended</div>
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">Next Meal: Lunch</span>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">Tunisian Lablabi Bowl</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-4">A protein-rich chickpea soup with cumin, garlic, and harissa to fuel your afternoon focus.</p>
              <div className="flex gap-4 text-xs font-bold text-slate-500 uppercase">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> 15m</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">local_fire_department</span> 420 kcal</span>
              </div>
            </div>
            <button className="mt-6 w-full py-4 bg-gradient-to-r from-primary to-primary-container text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95">
              Log This Meal
            </button>
          </div>
        </div>

        {/* AI Insight Section */}
        <div className="lg:col-span-4 bg-secondary-container rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <span className="material-symbols-outlined text-secondary">auto_awesome</span>
            </div>
            <h3 className="text-xl font-bold text-on-secondary-container mb-4">AI Insight</h3>
            <p className="text-on-secondary-container/80 text-sm leading-relaxed mb-6 italic">
              "{aiInsight || "Based on your lower morning activity, consider a lighter dinner tonight like Salade Méchouia to maintain your metabolic rhythm."}"
            </p>
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs font-bold text-on-secondary-container uppercase tracking-widest">Personalized For You</span>
            <Link to="/ai" className="text-on-secondary-container font-bold text-sm underline underline-offset-4">Learn Why</Link>
          </div>
          {/* Abstract visual element */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/meals" className="bg-surface-container p-6 rounded-[1.5rem] flex flex-col items-center gap-3 hover:bg-primary-fixed transition-colors">
            <span className="material-symbols-outlined text-primary text-3xl">add_circle</span>
            <span className="text-xs font-bold text-on-surface uppercase tracking-widest">Log Food</span>
          </Link>
          <Link to="/activity" className="bg-surface-container p-6 rounded-[1.5rem] flex flex-col items-center gap-3 hover:bg-secondary-fixed transition-colors">
            <span className="material-symbols-outlined text-secondary text-3xl">fitness_center</span>
            <span className="text-xs font-bold text-on-surface uppercase tracking-widest">Log Activity</span>
          </Link>
          <button className="bg-surface-container p-6 rounded-[1.5rem] flex flex-col items-center gap-3 hover:bg-tertiary-fixed transition-colors">
            <span className="material-symbols-outlined text-tertiary text-3xl">opacity</span>
            <span className="text-xs font-bold text-on-surface uppercase tracking-widest">Add Water</span>
          </button>
          <Link to="/profile" className="bg-surface-container p-6 rounded-[1.5rem] flex flex-col items-center gap-3 hover:bg-outline-variant transition-colors">
            <span className="material-symbols-outlined text-slate-600 text-3xl">straighten</span>
            <span className="text-xs font-bold text-on-surface uppercase tracking-widest">Update Weight</span>
          </Link>
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <button className="fixed right-6 bottom-28 w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-xl shadow-primary/30 z-40 active:scale-90 transition-transform">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'wght' 600" }}>add</span>
      </button>
    </main>
  );
}
