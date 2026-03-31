import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface UserProfile {
  id: string;
  name: string;
  age: number;
  weight: number;
  height: number;
  goal: string;
}

interface MealLog {
  id: string;
  user_id: string;
  meal_name: string;
  calories: number;
  ingredients?: string;
  created_at: string;
}

interface ActivityLog {
  id: string;
  user_id: string;
  activity_type: string;
  duration: number;
  calories_burned: number;
  created_at: string;
}

interface AppState {
  user: UserProfile | null;
  meals: MealLog[];
  activities: ActivityLog[];
  steps: number;
  dailyCalorieGoal: number;
  fetchUserData: () => Promise<void>;
  logMeal: (meal: Omit<MealLog, 'id' | 'user_id' | 'created_at'>) => Promise<void>;
  logActivity: (activity: Omit<ActivityLog, 'id' | 'user_id' | 'created_at'>) => Promise<void>;
  updateSteps: (steps: number) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  user: null,
  meals: [],
  activities: [],
  steps: 0,
  dailyCalorieGoal: 2260,

  fetchUserData: async () => {
    if (!supabase) return;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        set({ user: null, meals: [], activities: [], steps: 0 });
        return;
      }

      const [profileRes, mealsRes, activitiesRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('meals').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('activities').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      ]);

      if (profileRes.data) {
        set({ 
          user: {
            id: profileRes.data.id,
            name: profileRes.data.full_name || user.user_metadata?.full_name || 'Utilisateur',
            age: profileRes.data.age || 0,
            weight: profileRes.data.weight || 0,
            height: profileRes.data.height || 0,
            goal: profileRes.data.goal || 'maintenance'
          } 
        });
      } else {
        // Fallback if profile doesn't exist yet but user is authenticated
        set({
          user: {
            id: user.id,
            name: user.user_metadata?.full_name || 'Utilisateur',
            age: 0,
            weight: 0,
            height: 0,
            goal: 'maintenance'
          }
        });
      }
      if (mealsRes.data) set({ meals: mealsRes.data });
      if (activitiesRes.data) set({ activities: activitiesRes.data });
      
      const today = new Date().toISOString().split('T')[0];
      const { data: statsData } = await supabase.from('daily_stats').select('steps').eq('user_id', user.id).eq('date', today).single();
      if (statsData) {
        set({ steps: statsData.steps });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  logMeal: async (meal) => {
    if (!supabase) return;
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;
    
    const newMeal = { ...meal, id: Date.now().toString(), user_id: session.user.id, created_at: new Date().toISOString() };
    set((state) => ({ meals: [newMeal, ...state.meals] }));
    
    await supabase.from('meals').insert([{ ...meal, user_id: session.user.id }]);
  },

  logActivity: async (activity) => {
    if (!supabase) return;
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    const newActivity = { ...activity, id: Date.now().toString(), user_id: session.user.id, created_at: new Date().toISOString() };
    set((state) => ({ activities: [newActivity, ...state.activities] }));

    await supabase.from('activities').insert([{ ...activity, user_id: session.user.id }]);
  },

  updateSteps: async (steps) => {
    set({ steps });
    if (!supabase) return;
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;
    
    // We update the steps for today. The unique constraint on (user_id, date) 
    // in daily_stats (if set) allows upserting.
    const { error } = await supabase.from('daily_stats')
      .upsert({ 
        user_id: session.user.id, 
        date: new Date().toISOString().split('T')[0], 
        steps 
      }, { onConflict: 'user_id,date' });

    if (error) {
      console.error('Error updating steps:', error);
    }
  }
}));
