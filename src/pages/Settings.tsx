import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { user, fetchUserData } = useStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    daily_step_goal: '10000',
    daily_calorie_goal: '2000',
    fitness_goal: 'Maintain Weight',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        age: user.age?.toString() || '',
        gender: user.gender || 'male',
        weight: user.weight?.toString() || '',
        height: user.height?.toString() || '',
        daily_step_goal: user.daily_step_goal?.toString() || '10000',
        daily_calorie_goal: user.daily_calorie_goal?.toString() || '2000',
        fitness_goal: user.fitness_goal || 'Maintain Weight',
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) throw new Error('No user found');

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: authUser.id,
          full_name: formData.full_name,
          age: parseInt(formData.age),
          gender: formData.gender,
          weight: parseFloat(formData.weight),
          height: parseFloat(formData.height),
          daily_step_goal: parseInt(formData.daily_step_goal),
          daily_calorie_goal: parseInt(formData.daily_calorie_goal),
          fitness_goal: formData.fitness_goal,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      await fetchUserData();
      alert('Profil mis à jour avec succès !');
      navigate('/profile');
    } catch (error: any) {
      console.error('Error saving settings:', error);
      alert('Erreur lors de la sauvegarde : ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="text-3xl font-extrabold text-on-surface font-headline tracking-tight">Paramètres du profil</h2>
        </div>

        <div className="surface-container-lowest glass-card p-8 rounded-[2rem] shadow-sm border border-outline-variant/10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Sections: Personal Info */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">person</span>
                Informations Personnelles
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Nom complet</label>
                  <input
                    className="w-full px-5 py-4 bg-surface-container rounded-2xl border-none focus:ring-2 focus:ring-primary transition-all"
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Genre</label>
                  <select
                    className="w-full px-5 py-4 bg-surface-container rounded-2xl border-none focus:ring-2 focus:ring-primary transition-all"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    <option value="male">Homme</option>
                    <option value="female">Femme</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Âge</label>
                  <input
                    className="w-full px-5 py-4 bg-surface-container rounded-2xl border-none focus:ring-2 focus:ring-primary transition-all"
                    type="number"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Poids (kg)</label>
                    <input
                      className="w-full px-5 py-4 bg-surface-container rounded-2xl border-none focus:ring-2 focus:ring-primary transition-all"
                      type="number"
                      step="0.1"
                      required
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Taille (cm)</label>
                    <input
                      className="w-full px-5 py-4 bg-surface-container rounded-2xl border-none focus:ring-2 focus:ring-primary transition-all"
                      type="number"
                      required
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-outline-variant/10" />

            {/* Sections: Health Goals */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">track_changes</span>
                Objectifs Santé
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Objectif de pas quotidien</label>
                  <input
                    className="w-full px-5 py-4 bg-surface-container rounded-2xl border-none focus:ring-2 focus:ring-primary transition-all"
                    type="number"
                    required
                    value={formData.daily_step_goal}
                    onChange={(e) => setFormData({ ...formData, daily_step_goal: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Objectif calories quotidien</label>
                  <input
                    className="w-full px-5 py-4 bg-surface-container rounded-2xl border-none focus:ring-2 focus:ring-primary transition-all"
                    type="number"
                    required
                    value={formData.daily_calorie_goal}
                    onChange={(e) => setFormData({ ...formData, daily_calorie_goal: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Objectif Fitness Principal</label>
                  <select
                    className="w-full px-5 py-4 bg-surface-container rounded-2xl border-none focus:ring-2 focus:ring-primary transition-all"
                    value={formData.fitness_goal}
                    onChange={(e) => setFormData({ ...formData, fitness_goal: e.target.value })}
                  >
                    <option value="Lose Weight">Perte de poids</option>
                    <option value="Gain Muscle">Prise de masse muscle</option>
                    <option value="Maintain Weight">Maintenir le poids</option>
                    <option value="Endurance">Améliorer l'endurance</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-400 text-white font-bold py-5 rounded-full shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 mt-4 h-16 flex items-center justify-center text-lg"
            >
              {loading ? 'Mise à jour...' : 'Sauvegarder les modifications'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
