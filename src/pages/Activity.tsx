import { useStore } from '../store/useStore';

export default function Activity() {
  const { steps, activities, logActivity } = useStore();

  const handleAddActivity = (type: string, calories: number) => {
    logActivity({
      activity_type: type,
      duration: 30, // Default 30 mins
      calories_burned: calories
    });
  };

  return (
    <main className="pt-24 pb-32 px-6 max-w-2xl mx-auto space-y-10">
      {/* Step Counter Hero Section */}
      <section className="relative">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative w-64 h-64 mb-6">
            {/* Progress Arc SVG */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-surface-container-high"></circle>
              <circle cx="50" cy="50" r="45" fill="none" stroke="url(#arcGradient)" strokeWidth="8" strokeLinecap="round" className="progress-arc" style={{ strokeDashoffset: 283 - (283 * Math.min(steps / 10000, 1)) }}></circle>
              <defs>
                <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9f4200"></stop>
                  <stop offset="100%" stopColor="#ff6d00"></stop>
                </linearGradient>
              </defs>
            </svg>
            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-headline font-extrabold text-5xl tracking-tighter text-on-surface">{steps.toLocaleString()}</span>
              <span className="font-label text-sm uppercase tracking-widest text-outline">/ 10,000 steps</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-secondary-container/30 px-4 py-2 rounded-full">
            <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            <p className="font-body font-semibold text-secondary text-sm tracking-tight">Almost there! Keep it up.</p>
          </div>
        </div>
      </section>

      {/* Bento Activity Quick Actions */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button onClick={() => handleAddActivity('Walking', 150)} className="flex flex-col items-center justify-center gap-2 p-4 bg-surface-container-lowest rounded-xl hover:bg-primary-container/10 transition-colors active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-primary">directions_walk</span>
          <span className="font-label text-xs font-bold uppercase tracking-wider text-on-surface">Walking</span>
        </button>
        <button onClick={() => handleAddActivity('Running', 300)} className="flex flex-col items-center justify-center gap-2 p-4 bg-surface-container-lowest rounded-xl hover:bg-primary-container/10 transition-colors active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-primary">directions_run</span>
          <span className="font-label text-xs font-bold uppercase tracking-wider text-on-surface">Running</span>
        </button>
        <button onClick={() => handleAddActivity('Cycling', 250)} className="flex flex-col items-center justify-center gap-2 p-4 bg-surface-container-lowest rounded-xl hover:bg-primary-container/10 transition-colors active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-primary">directions_bike</span>
          <span className="font-label text-xs font-bold uppercase tracking-wider text-on-surface">Cycling</span>
        </button>
        <button onClick={() => handleAddActivity('Gym', 200)} className="flex flex-col items-center justify-center gap-2 p-4 bg-surface-container-lowest rounded-xl hover:bg-primary-container/10 transition-colors active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-primary">fitness_center</span>
          <span className="font-label text-xs font-bold uppercase tracking-wider text-on-surface">Gym</span>
        </button>
      </section>

      {/* Weekly Chart Section */}
      <section className="bg-surface-container p-6 rounded-3xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-headline font-bold text-xl text-on-surface">Statistics</h2>
            <p className="font-body text-sm text-outline">Weekly Average : 7.2k</p>
          </div>
          <div className="flex gap-2">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
          </div>
        </div>
        
        <div className="flex items-end justify-between h-40 gap-2">
          <div className="flex-1 flex flex-col items-center gap-3">
            <div className="w-full bg-surface-container-high rounded-t-lg h-[40%]"></div>
            <span className="font-label text-[10px] text-outline">T</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-3">
            <div className="w-full bg-surface-container-high rounded-t-lg h-[65%]"></div>
            <span className="font-label text-[10px] text-outline">T</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-3">
            <div className="w-full bg-surface-container-high rounded-t-lg h-[50%]"></div>
            <span className="font-label text-[10px] text-outline">T</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-3">
            <div className="w-full bg-primary rounded-t-lg h-[85%] shadow-[0_0_20px_rgba(159,66,0,0.2)]"></div>
            <span className="font-label text-[10px] text-on-surface font-bold">J</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-3">
            <div className="w-full bg-surface-container-high rounded-t-lg h-[45%]"></div>
            <span className="font-label text-[10px] text-outline">F</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-3">
            <div className="w-full bg-surface-container-high rounded-t-lg h-[60%]"></div>
            <span className="font-label text-[10px] text-outline">S</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-3">
            <div className="w-full bg-surface-container-high rounded-t-lg h-[30%]"></div>
            <span className="font-label text-[10px] text-outline">D</span>
          </div>
        </div>
      </section>

      {/* Activity List Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="font-headline font-bold text-xl text-on-surface">Today</h2>
          <button className="font-label text-sm font-bold text-primary">View all</button>
        </div>
        
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-5 bg-surface-container-lowest rounded-2xl group cursor-pointer hover:bg-surface-container-low transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {activity.activity_type === 'Walking' ? 'directions_walk' : 
                     activity.activity_type === 'Running' ? 'directions_run' : 
                     activity.activity_type === 'Cycling' ? 'directions_bike' : 'fitness_center'}
                  </span>
                </div>
                <div>
                  <h3 className="font-body font-bold text-on-surface">{activity.activity_type}</h3>
                  <div className="flex items-center gap-2 text-outline text-xs mt-0.5">
                    <span>{activity.duration} min</span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span>{new Date(activity.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="font-headline font-bold text-primary">{activity.calories_burned} kcal</span>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <p className="text-center text-outline text-sm py-4">No activity logged today.</p>
          )}
        </div>
      </section>

      {/* Motivational Quote */}
      <section className="py-4">
        <div className="relative overflow-hidden p-8 rounded-3xl bg-gradient-to-br from-primary to-primary-container text-white">
          <div className="absolute top-0 right-0 p-4 opacity-20 transform translate-x-4 -translate-y-4">
            <span className="material-symbols-outlined text-8xl">format_quote</span>
          </div>
          <p className="font-headline font-bold text-xl italic leading-tight relative z-10">"Every step counts toward the most dynamic version of yourself."</p>
          <p className="mt-4 text-sm font-label opacity-80 relative z-10">The TuniFit Team</p>
        </div>
      </section>
    </main>
  );
}
