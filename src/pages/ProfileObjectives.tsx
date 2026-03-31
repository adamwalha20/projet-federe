import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import clsx from 'clsx';

const ProfileObjectives: React.FC = () => {
  const navigate = useNavigate();
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goal, setGoal] = useState('loss');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!supabase) {
      setError('Erreur de configuration: Supabase non connecté.');
      setLoading(false);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    const fullName = user?.user_metadata?.full_name || '';

    if (!user) {
      setError('Vous devez être connecté pour configurer votre profil.');
      setLoading(false);
      return;
    }

    const { error: upsertError } = await supabase.from('profiles').upsert({
      id: user.id,
      full_name: fullName,
      age: parseInt(age),
      weight: parseFloat(weight),
      start_weight: parseFloat(weight),
      height: parseFloat(height),
      goal: goal,
      updated_at: new Date().toISOString()
    });

    setLoading(false);

    if (upsertError) {
      setError(upsertError.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen selection:bg-primary-container/30">
      <header className="sticky top-0 z-50 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md flex justify-between items-center w-full px-6 h-16">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
          <h1 className="font-headline font-black text-xl text-orange-600 tracking-tighter">TuniFit</h1>
        </div>
        <div className="w-6"></div>
      </header>

      <main className="max-w-xl mx-auto px-6 py-8 pb-32">
        <section className="mb-12">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mb-3 leading-tight">
            Créez votre <span className="text-primary">énergie</span>.
          </h2>
          <p className="text-on-surface-variant font-body text-lg max-w-[85%]">
            Commençons par les bases pour personnaliser votre parcours santé de précision.
          </p>
        </section>

        {error && (
          <div className="bg-error-container/20 border-l-4 border-error text-error p-4 rounded-r-lg font-body text-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1 space-y-4">
              <div className="bg-surface-container-lowest p-6 rounded-3xl transition-all border border-transparent hover:border-primary/10 shadow-sm">
                <label className="block font-label text-[10px] uppercase tracking-widest text-slate-400 mb-4">Âge</label>
                <div className="flex items-end gap-2">
                  <input 
                    className="w-full bg-transparent border-none p-0 text-3xl font-headline font-bold focus:ring-0 text-on-surface placeholder-surface-dim" 
                    placeholder="25" 
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                  <span className="text-on-surface-variant font-medium pb-1 text-sm">ans</span>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-3xl transition-all border border-transparent hover:border-primary/10 shadow-sm">
                <label className="block font-label text-[10px] uppercase tracking-widest text-slate-400 mb-4">Poids (kg)</label>
                <div className="flex items-end gap-2">
                  <input 
                    className="w-full bg-transparent border-none p-0 text-3xl font-headline font-bold focus:ring-0 text-on-surface placeholder-surface-dim" 
                    placeholder="70.5" 
                    step="0.1" 
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                  />
                  <span className="text-on-surface-variant font-medium pb-1 text-sm">kg</span>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="h-full bg-surface-container-lowest p-6 rounded-3xl transition-all border border-transparent hover:border-primary/10 shadow-sm flex flex-col justify-between overflow-hidden relative">
                <div>
                  <label className="block font-label text-[10px] uppercase tracking-widest text-slate-400 mb-4">Taille (cm)</label>
                  <div className="flex items-end gap-2">
                    <input 
                      className="w-full bg-transparent border-none p-0 text-3xl font-headline font-bold focus:ring-0 text-on-surface placeholder-surface-dim" 
                      placeholder="178" 
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      required
                    />
                    <span className="text-on-surface-variant font-medium pb-1 text-sm">cm</span>
                  </div>
                </div>
                <div className="mt-8 opacity-20 pointer-events-none flex justify-center">
                  <div className="flex items-end gap-1.5 h-32">
                    <div className="w-1 bg-primary rounded-full h-[20%]"></div>
                    <div className="w-1 bg-primary rounded-full h-[40%]"></div>
                    <div className="w-1 bg-primary rounded-full h-[60%]"></div>
                    <div className="w-1 bg-primary rounded-full h-[85%]"></div>
                    <div className="w-1 bg-primary rounded-full h-[100%]"></div>
                    <div className="w-1 bg-primary rounded-full h-[80%]"></div>
                    <div className="w-1 bg-primary rounded-full h-[50%]"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-2 mt-2">
              <label className="block font-label text-[10px] uppercase tracking-widest text-slate-400 mb-4 px-2">Objectif Principal</label>
              <div className="grid grid-cols-1 gap-3">
                <label className="relative group cursor-pointer">
                  <input 
                    checked={goal === 'loss'} 
                    onChange={() => setGoal('loss')}
                    className="sr-only" 
                    name="goal" 
                    type="radio" 
                  />
                  <div className={clsx(
                    "flex items-center justify-between p-5 rounded-[2rem] bg-surface-container-lowest border transition-all",
                    goal === 'loss' ? "border-primary/20 bg-orange-50/50" : "border-transparent"
                  )}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined">fitness_center</span>
                      </div>
                      <div>
                        <p className="font-headline font-bold text-on-surface">Perte de Poids</p>
                        <p className="text-xs text-on-surface-variant">Brûler des calories & tonicité</p>
                      </div>
                    </div>
                    <div className={clsx(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                      goal === 'loss' ? "border-primary" : "border-surface-variant"
                    )}>
                      <div className={clsx(
                        "w-2.5 h-2.5 rounded-full bg-primary transition-opacity",
                        goal === 'loss' ? "opacity-100" : "opacity-0"
                      )}></div>
                    </div>
                  </div>
                </label>

                <label className="relative group cursor-pointer">
                  <input 
                    checked={goal === 'gain'} 
                    onChange={() => setGoal('gain')}
                    className="sr-only" 
                    name="goal" 
                    type="radio" 
                  />
                  <div className={clsx(
                    "flex items-center justify-between p-5 rounded-[2rem] bg-surface-container-lowest border transition-all",
                    goal === 'gain' ? "border-primary/20 bg-orange-50/50" : "border-transparent"
                  )}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined">bolt</span>
                      </div>
                      <div>
                        <p className="font-headline font-bold text-on-surface">Prise de Muscle</p>
                        <p className="text-xs text-on-surface-variant">Force & hypertrophie</p>
                      </div>
                    </div>
                    <div className={clsx(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                      goal === 'gain' ? "border-primary" : "border-surface-variant"
                    )}>
                      <div className={clsx(
                        "w-2.5 h-2.5 rounded-full bg-primary transition-opacity",
                        goal === 'gain' ? "opacity-100" : "opacity-0"
                      )}></div>
                    </div>
                  </div>
                </label>

                <label className="relative group cursor-pointer">
                  <input 
                    checked={goal === 'maintenance'} 
                    onChange={() => setGoal('maintenance')}
                    className="sr-only" 
                    name="goal" 
                    type="radio" 
                  />
                  <div className={clsx(
                    "flex items-center justify-between p-5 rounded-[2rem] bg-surface-container-lowest border transition-all",
                    goal === 'maintenance' ? "border-primary/20 bg-orange-50/50" : "border-transparent"
                  )}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined">self_improvement</span>
                      </div>
                      <div>
                        <p className="font-headline font-bold text-on-surface">Maintenance</p>
                        <p className="text-xs text-on-surface-variant">Santé globale & vitalité</p>
                      </div>
                    </div>
                    <div className={clsx(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                      goal === 'maintenance' ? "border-primary" : "border-surface-variant"
                    )}>
                      <div className={clsx(
                        "w-2.5 h-2.5 rounded-full bg-primary transition-opacity",
                        goal === 'maintenance' ? "opacity-100" : "opacity-0"
                      )}></div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="visual-indicator mt-8 relative overflow-hidden rounded-[2.5rem] aspect-[16/9] shadow-2xl shadow-orange-900/10">
            <img 
              alt="Determined athlete" 
              className="absolute inset-0 w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <p className="text-white font-headline font-bold text-xl leading-snug">
                Votre précision aujourd'hui définit votre force demain.
              </p>
            </div>
          </div>

          <footer className="fixed bottom-0 left-0 w-full p-6 z-50">
            <div className="max-w-xl mx-auto">
              <button 
                type="submit"
                className={`w-full bg-gradient-to-r from-primary to-primary-container text-white py-5 rounded-full font-headline font-extrabold text-lg shadow-lg shadow-primary/25 active:scale-95 transition-transform ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Enregistrement...' : 'Terminer la configuration'}
              </button>
              <div className="mt-4 flex justify-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/20"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/20"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/20"></div>
                <div className="w-4 h-1.5 rounded-full bg-primary"></div>
              </div>
            </div>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default ProfileObjectives;
