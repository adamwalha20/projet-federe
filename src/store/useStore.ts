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
  user: {
    id: 'mock-id',
    name: 'Amine Trabelsi',
    age: 28,
    weight: 82,
    height: 184,
    goal: 'Perte de poids'
  },
  meals: [],
  activities: [],
  steps: 8432,
  dailyCalorieGoal: 2260,

  fetchUserData: async () => {
    if (!supabase) return;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [profileRes, mealsRes, activitiesRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('meals').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('activities').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      ]);

      if (profileRes.data) set({ user: profileRes.data });
      if (mealsRes.data) set({ meals: mealsRes.data });
      if (activitiesRes.data) set({ activities: activitiesRes.data });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  logMeal: async (meal) => {
    const newMeal = { ...meal, id: Date.now().toString(), user_id: 'mock-id', created_at: new Date().toISOString() };
    set((state) => ({ meals: [newMeal, ...state.meals] }));
    
    if (!supabase) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('meals').insert([{ ...meal, user_id: user.id }]);
    }
  },

  logActivity: async (activity) => {
    const newActivity = { ...activity, id: Date.now().toString(), user_id: 'mock-id', created_at: new Date().toISOString() };
    set((state) => ({ activities: [newActivity, ...state.activities] }));

    if (!supabase) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('activities').insert([{ ...activity, user_id: user.id }]);
    }
  },

  updateSteps: async (steps) => {
    set({ steps });
    if (!supabase) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // Assuming a daily_stats table
      await supabase.from('daily_stats')
        .upsert({ user_id: user.id, date: new Date().toISOString().split('T')[0], steps });
    }
  }
}));
