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

interface UserProfile {
  id: string;
  full_name: string;
  age: number;
  weight: number;
  height: number;
  gender: string;
  daily_step_goal: number;
  daily_calorie_goal: number;
  fitness_goal: string;
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
  fetchUserData: () => Promise<void>;
  logMeal: (meal: Omit<MealLog, 'id' | 'user_id' | 'created_at'>) => Promise<void>;
  logActivity: (activity: Omit<ActivityLog, 'id' | 'user_id' | 'created_at'>) => Promise<void>;
  updateSteps: (steps: number) => Promise<void>;
  setSteps: (steps: number) => void;
}

export const useStore = create<AppState>((set, get) => ({
  user: null,
  meals: [],
  activities: [],
  steps: 0,

  fetchUserData: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [profileRes, mealsRes, activitiesRes, stepsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('meals').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('activities').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('daily_steps').select('steps_count').eq('user_id', user.id).eq('date', new Date().toISOString().split('T')[0]).single()
      ]);

      if (profileRes.data) {
        const profileData: UserProfile = {
          ...profileRes.data,
          daily_step_goal: profileRes.data.daily_step_goal || 10000, // Default if not set
          daily_calorie_goal: profileRes.data.daily_calorie_goal || 2000, // Default if not set
          fitness_goal: profileRes.data.fitness_goal || 'Maintain Weight', // Default if not set
        };
        set({ user: profileData });
      }
      if (mealsRes.data) set({ meals: mealsRes.data });
      if (activitiesRes.data) set({ activities: activitiesRes.data });
      if (stepsRes.data) set({ steps: stepsRes.data.steps_count });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  logMeal: async (meal) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('meals')
      .insert([{ ...meal, user_id: user.id }])
      .select()
      .single();

    if (data) {
      set((state) => ({ meals: [data, ...state.meals] }));
    }
  },

  logActivity: async (activity) => {
    const { data: { user } = { user: null } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('activities')
      .insert([{ ...activity, user_id: user.id }])
      .select()
      .single();

    if (data) {
      set((state) => ({ activities: [data, ...state.activities] }));
    }
  },

  updateSteps: async (steps) => {
    const { data: { user } = { user: null } } = await supabase.auth.getUser();
    if (!user) return;

    set({ steps });
    await supabase.from('daily_steps')
      .upsert({ 
        user_id: user.id, 
        date: new Date().toISOString().split('T')[0], 
        steps_count: steps 
      }, { onConflict: 'user_id,date' });
  },
  setSteps: (steps) => set({ steps })
}));
