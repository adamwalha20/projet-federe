import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { supabase } from '../lib/supabase';
import { format, subDays, startOfDay } from 'date-fns';

export default function Activity() {
  const { steps, activities, logActivity, setSteps } = useStore();
  const [manualSteps, setManualSteps] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch last 7 days
      const { data, error } = await supabase
        .from('daily_steps')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(7);

      if (error) throw error;
      setHistory(data || []);
      
      // Update today's steps in store if found
      const today = format(new Date(), 'yyyy-MM-dd');
      const todayRecord = data?.find(r => r.date === today);
      if (todayRecord) {
        setSteps(todayRecord.steps_count);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleManualStepEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualSteps) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const today = format(new Date(), 'yyyy-MM-dd');
      const count = parseInt(manualSteps);

      const { error } = await supabase
        .from('daily_steps')
        .upsert({
          user_id: user.id,
          date: today,
          steps_count: count,
        }, { onConflict: 'user_id,date' });

      if (error) throw error;
      
      setSteps(count);
      setManualSteps('');
      fetchHistory();
      alert('Pas mis à jour !');
    } catch (error) {
      console.error('Error updating steps:', error);
    }
  };

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
          
          {/* Manual Entry Form */}
          <form onSubmit={handleManualStepEntry} className="mb-6 flex gap-2 w-full max-w-xs">
            <input 
              type="number" 
              placeholder="Ajouter des pas..." 
              value={manualSteps}
              onChange={(e) => setManualSteps(e.target.value)}
              className="flex-1 px-4 py-2 bg-surface-container rounded-full border-none focus:ring-2 focus:ring-orange-500 text-on-surface text-sm"
            />
            <button 
              type="submit"
              className="bg-orange-600 text-white px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform"
            >
              Ajouter
            </button>
          </form>

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
            <h2 className="font-headline font-bold text-xl text-on-surface">History</h2>
            <p className="font-body text-sm text-outline">Last 7 days behavior</p>
          </div>
        </div>
        
        <div className="flex items-end justify-between h-40 gap-2">
          {[...Array(7)].map((_, i) => {
            const date = subDays(new Date(), 6 - i);
            const dateStr = format(date, 'yyyy-MM-dd');
            const dayRecord = history.find(r => r.date === dateStr);
            const stepCount = dayRecord ? dayRecord.steps_count : 0;
            const height = Math.min((stepCount / 10000) * 100, 100);
            const isToday = i === 6;

            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-3">
                <div 
                  className={`w-full rounded-t-lg transition-all duration-500 ${isToday ? 'bg-orange-600 shadow-[0_0_20px_rgba(255,109,0,0.2)]' : 'bg-surface-container-high'}`}
                  style={{ height: `${Math.max(height, 5)}%` }}
                ></div>
                <span className={`font-label text-[10px] ${isToday ? 'text-on-surface font-bold' : 'text-outline'}`}>
                  {format(date, 'EEE').charAt(0)}
                </span>
              </div>
            );
          })}
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
