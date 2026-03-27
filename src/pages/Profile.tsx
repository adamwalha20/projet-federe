import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const { user, meals, activities } = useStore();

  const handleLogout = async () => {
    const { supabase } = await import('../lib/supabase');
    await supabase.auth.signOut();
    navigate('/login');
  };

  const displayName = user?.full_name || 'Utilisateur TuniFit';
  const displayGoal = user?.fitness_goal || 'Maintenir le poids';

  return (
    <main className="pt-24 px-6 max-w-2xl mx-auto pb-32">
      {/* Profile Header Section */}
      <header className="mb-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-1">{displayName}</h1>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">location_on</span>
              <span className="text-sm font-medium">Tunis, Tunisie</span>
            </div>
          </div>
          <Link 
            to="/settings"
            className="bg-surface-container-highest text-on-surface px-5 py-2.5 rounded-full font-semibold text-sm hover:opacity-80 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">settings</span>
            Settings
          </Link>
        </div>

        {/* Bento Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-surface-container-low p-6 rounded-3xl flex flex-col justify-between aspect-square md:aspect-auto md:h-32">
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Âge</span>
            <span className="text-3xl font-black text-on-surface">{user?.age || '--'} <span className="text-base font-normal">ans</span></span>
          </div>
          <div className="bg-surface-container-low p-6 rounded-3xl flex flex-col justify-between aspect-square md:aspect-auto md:h-32">
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Poids</span>
            <span className="text-3xl font-black text-on-surface">{user?.weight || '--'} <span className="text-base font-normal">kg</span></span>
          </div>
          <div className="bg-primary-container/10 p-6 rounded-3xl flex flex-col justify-between col-span-2 md:col-span-1 aspect-video md:aspect-auto md:h-32">
            <span className="text-xs font-bold uppercase tracking-widest text-primary font-bold">Taille</span>
            <span className="text-3xl font-black text-primary">{user?.height || '--'} <span className="text-base font-normal">cm</span></span>
          </div>
        </div>
      </header>

      {/* Goals Section */}
      <section className="mb-12">
        <div className="bg-surface-container-lowest p-8 rounded-[2rem] border-outline-variant/15 border shadow-sm">
          <div className="flex justify-between items-end mb-6">
            <div>
              <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">Objectif Principal</span>
              <h2 className="text-2xl font-bold tracking-tight">{displayGoal}</h2>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-secondary">Objectif</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-surface-container p-4 rounded-2xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant opacity-60 block mb-1">Calories/Jour</span>
              <span className="text-xl font-bold text-secondary">{user?.daily_calorie_goal || 2000} kcal</span>
            </div>
            <div className="bg-surface-container p-4 rounded-2xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant opacity-60 block mb-1">Pas/Jour</span>
              <span className="text-xl font-bold text-primary">{user?.daily_step_goal || 10000} pas</span>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Activités Récentes</h3>
          <button className="text-primary font-bold text-sm hover:underline">Voir tout</button>
        </div>
        
        <div className="space-y-4">
          {meals.slice(0, 2).map((meal) => (
            <div key={meal.id} className="flex items-center gap-4 bg-surface-container-low p-4 rounded-2xl group hover:bg-surface-container transition-colors">
              <div className="w-14 h-14 rounded-xl bg-secondary-container/20 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-secondary text-3xl">restaurant</span>
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-on-surface">{meal.meal_name}</h4>
                <p className="text-xs text-on-surface-variant">Repas • {new Date(meal.created_at).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <span className="block font-bold text-secondary">{meal.calories}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant opacity-60">kcal</span>
              </div>
            </div>
          ))}

          {activities.slice(0, 2).map((activity) => (
            <div key={activity.id} className="flex items-center gap-4 bg-surface-container-low p-4 rounded-2xl group hover:bg-surface-container transition-colors">
              <div className="w-14 h-14 rounded-xl bg-primary-fixed/30 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary text-3xl">fitness_center</span>
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-on-surface">{activity.activity_type}</h4>
                <p className="text-xs text-on-surface-variant">Activité • {activity.duration} min</p>
              </div>
              <div className="text-right">
                <span className="block font-bold text-primary">{activity.calories_burned}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant opacity-60">kcal</span>
              </div>
            </div>
          ))}

          {meals.length === 0 && activities.length === 0 && (
            <p className="text-center py-8 text-on-surface-variant opacity-60 italic">Aucune activité récente</p>
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
          <span>Déconnexion</span>
        </button>
        <p className="text-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-40 mt-4">
          TuniFit Version 1.1.0
        </p>
      </section>
    </main>
  );
}
