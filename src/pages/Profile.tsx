import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { supabase } from '../lib/supabase';

export default function Profile() {
  const navigate = useNavigate();
  const { user, meals, activities } = useStore();

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    useStore.setState({ user: null, meals: [], activities: [], steps: 0 });
    navigate('/login');
  };

  if (!user) {
    return (
      <main className="pt-24 px-6 max-w-2xl mx-auto pb-32 text-center flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-on-surface-variant font-medium">Chargement de votre profil...</p>
        </div>
      </main>
    );
  }

  const recentItems = [
    ...meals.map(m => ({ ...m, type: 'meal' as const })),
    ...activities.map(a => ({ ...a, type: 'activity' as const }))
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

  return (
    <main className="pt-24 px-6 max-w-2xl mx-auto pb-32">
      <header className="mb-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-1">{user.name}</h1>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">location_on</span>
              <span className="text-sm font-medium">Tunis, Tunisie</span>
            </div>
          </div>
          <button 
            onClick={() => navigate('/profile-objectives')}
            className="bg-surface-container-highest text-on-surface px-5 py-2.5 rounded-full font-semibold text-sm hover:opacity-80 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            Modifier
          </button>
        </div>

        {/* Bento Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-surface-container-low p-6 rounded-3xl flex flex-col justify-between aspect-square md:aspect-auto md:h-32">
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Age</span>
            <span className="text-3xl font-black text-on-surface">{user.age || '--'} <span className="text-base font-normal">ans</span></span>
          </div>
          <div className="bg-surface-container-low p-6 rounded-3xl flex flex-col justify-between aspect-square md:aspect-auto md:h-32">
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Poids</span>
            <span className="text-3xl font-black text-on-surface">{user.weight || '--'} <span className="text-base font-normal">kg</span></span>
          </div>
          <div className="bg-primary-container/10 p-6 rounded-3xl flex flex-col justify-between col-span-2 md:col-span-1 aspect-video md:aspect-auto md:h-32">
            <span className="text-xs font-bold uppercase tracking-widest text-primary font-bold">Taille</span>
            <span className="text-3xl font-black text-primary">{user.height || '--'} <span className="text-base font-normal">cm</span></span>
          </div>
        </div>
      </header>

      {/* Goals Section */}
      <section className="mb-12">
        <div className="bg-surface-container-lowest p-8 rounded-[2rem] border-outline-variant/15 border shadow-sm">
          <div className="flex justify-between items-end mb-6">
            <div>
              <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">Objectif Principal</span>
              <h2 className="text-2xl font-bold tracking-tight capitalize">
                {user.goal === 'loss' ? 'Perte de poids' : user.goal === 'gain' ? 'Prise de masse' : 'Maintien'}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-secondary">En cours</span>
            </div>
          </div>
          
          <div className="flex justify-between text-sm font-medium">
            <div className="flex flex-col text-center w-full">
              <span className="text-on-surface-variant opacity-60">Poids Actuel</span>
              <span className="text-secondary font-bold text-xl">{user.weight || '--'} kg</span>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Recent Activities</h3>
          <button className="text-primary font-bold text-sm hover:underline">View all</button>
        </div>
        
        <div className="space-y-4">
          {recentItems.length === 0 ? (
            <div className="text-center py-8 text-on-surface-variant opacity-60 text-sm">
              Aucune activité récente.
            </div>
          ) : (
            recentItems.map((item, index) => (
              <div key={item.id || index} className="flex items-center gap-4 bg-surface-container-low p-4 rounded-2xl group hover:bg-surface-container transition-colors">
                {item.type === 'meal' ? (
                  <>
                    <div className="w-14 h-14 rounded-xl flex-shrink-0 bg-primary-container/30 flex items-center justify-center">
                       <span className="material-symbols-outlined text-primary text-3xl">restaurant</span>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-on-surface">{item.meal_name}</h4>
                      <p className="text-xs text-on-surface-variant">Repas • {new Date(item.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-secondary">{item.calories}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant opacity-60">kcal</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-xl bg-tertiary-container/30 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-tertiary text-3xl">
                        {item.activity_type === 'Course à pied' ? 'directions_run' : 'fitness_center'}
                      </span>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-on-surface">{item.activity_type}</h4>
                      <p className="text-xs text-on-surface-variant">Activité • {new Date(item.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-primary">{item.calories_burned}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant opacity-60">kcal</span>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* Logout Action */}
      <section className="mt-12 mb-8">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 py-5 bg-error-container/20 text-error font-bold rounded-3xl border-2 border-dashed border-error/20 hover:bg-error-container/30 transition-all group"
        >
          <span className="material-symbols-outlined text-error">logout</span>
          <span>Se déconnecter</span>
        </button>
        <p className="text-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-40 mt-4">
          TuniFit Version 0.3.0
        </p>
      </section>
    </main>
  );
}
