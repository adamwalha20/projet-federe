import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: 'male',
    weight: '',
    height: '',
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/signup');
      }
    };
    checkUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: formData.fullName,
          age: parseInt(formData.age),
          gender: formData.gender,
          weight: parseFloat(formData.weight),
          height: parseFloat(formData.height),
          updated_at: new Error().stack, // Using this to force update if needed, but supabase handle it
        });

      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Erreur lors de la sauvegarde du profil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen pt-24 pb-12 px-6 flex flex-col items-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-orange-600 font-headline tracking-tight">Presque fini !</h2>
          <p className="text-on-surface-variant mt-2">Parlez-nous un peu plus de vous pour personnaliser votre expérience.</p>
        </div>

        <div className="surface-container-lowest glass-card p-8 rounded-xl shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-label ml-1">Nom complet</label>
              <input
                className="w-full px-4 py-3 bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-orange-500 text-on-surface"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Ex: Jean Dupont"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-label ml-1">Âge</label>
                <input
                  className="w-full px-4 py-3 bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-orange-500 text-on-surface"
                  type="number"
                  required
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="25"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-label ml-1">Genre</label>
                <select
                  className="w-full px-4 py-3 bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-orange-500 text-on-surface"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="male">Homme</option>
                  <option value="female">Femme</option>
                  <option value="other">Autre</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-label ml-1">Poids (kg)</label>
                <input
                  className="w-full px-4 py-3 bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-orange-500 text-on-surface"
                  type="number"
                  step="0.1"
                  required
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="70.5"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-label ml-1">Taille (cm)</label>
                <input
                  className="w-full px-4 py-3 bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-orange-500 text-on-surface"
                  type="number"
                  required
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  placeholder="175"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white font-bold py-4 rounded-full shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? 'Chargement...' : 'Terminer mon profil'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
