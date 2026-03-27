import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // For now, just a direct navigation to login
    navigate('/login');
  };
  return (
    <main className="pt-24 px-6 max-w-2xl mx-auto pb-32">
      {/* Profile Header Section */}
      <header className="mb-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-1">Amine Trabelsi</h1>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">location_on</span>
              <span className="text-sm font-medium">Tunis, Tunisie</span>
            </div>
          </div>
          <button className="bg-surface-container-highest text-on-surface px-5 py-2.5 rounded-full font-semibold text-sm hover:opacity-80 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">edit</span>
            Edit
          </button>
        </div>

        {/* Bento Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-surface-container-low p-6 rounded-3xl flex flex-col justify-between aspect-square md:aspect-auto md:h-32">
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Age</span>
            <span className="text-3xl font-black text-on-surface">28 <span className="text-base font-normal">years</span></span>
          </div>
          <div className="bg-surface-container-low p-6 rounded-3xl flex flex-col justify-between aspect-square md:aspect-auto md:h-32">
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Weight</span>
            <span className="text-3xl font-black text-on-surface">82 <span className="text-base font-normal">kg</span></span>
          </div>
          <div className="bg-primary-container/10 p-6 rounded-3xl flex flex-col justify-between col-span-2 md:col-span-1 aspect-video md:aspect-auto md:h-32">
            <span className="text-xs font-bold uppercase tracking-widest text-primary font-bold">Height</span>
            <span className="text-3xl font-black text-primary">184 <span className="text-base font-normal">cm</span></span>
          </div>
        </div>
      </header>

      {/* Goals Section */}
      <section className="mb-12">
        <div className="bg-surface-container-lowest p-8 rounded-[2rem] border-outline-variant/15 border shadow-sm">
          <div className="flex justify-between items-end mb-6">
            <div>
              <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">Main Goal</span>
              <h2 className="text-2xl font-bold tracking-tight">Weight Loss</h2>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-secondary">65%</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="relative h-4 w-full bg-secondary-container/30 rounded-full overflow-hidden mb-6">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-secondary to-tertiary-container rounded-full" style={{ width: '65%' }}></div>
          </div>
          
          <div className="flex justify-between text-sm font-medium">
            <div className="flex flex-col">
              <span className="text-on-surface-variant opacity-60">Start</span>
              <span className="text-on-surface">90 kg</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="text-on-surface-variant opacity-60">Current</span>
              <span className="text-secondary font-bold">82 kg</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-on-surface-variant opacity-60">Goal</span>
              <span className="text-on-surface">78 kg</span>
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
          {/* Meal Log */}
          <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-2xl group hover:bg-surface-container transition-colors">
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTgDsqX2ESOXYrGP3Kw3V6icy4SPfcM-NyChOuMpkdfWwW4RuByADzEq4lJznPOf2LNSwhD4JbTEf2XC5d00_zn6U8ewGbo-2AVrgN0eQJgjzZKohrtAv2ylKKiFS0XD_ZGnD8RAxOuL1qMBqPS9vV1PsenJZoUhGg-MLcNazy6c296XEZXkqBC7WZwx3sOQJwNWqMKtwZlviniQrYpyMVTrxr7TDC-Aqyq5aU7S2zj3lcUBFdC5-1A8fkWHPaGPPum9gTHLJe6apJ" 
                alt="Healthy Bowl" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-on-surface">Grilled Salmon Salad</h4>
              <p className="text-xs text-on-surface-variant">Lunch • 2 hours ago</p>
            </div>
            <div className="text-right">
              <span className="block font-bold text-secondary">450</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant opacity-60">kcal</span>
            </div>
          </div>

          {/* Activity Log */}
          <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-2xl group hover:bg-surface-container transition-colors">
            <div className="w-14 h-14 rounded-xl bg-primary-fixed/30 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary text-3xl">fitness_center</span>
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-on-surface">HIIT Workout</h4>
              <p className="text-xs text-on-surface-variant">Activity • This morning</p>
            </div>
            <div className="text-right">
              <span className="block font-bold text-primary">320</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant opacity-60">kcal</span>
            </div>
          </div>

          {/* Activity Log */}
          <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-2xl group hover:bg-surface-container transition-colors">
            <div className="w-14 h-14 rounded-xl bg-tertiary-container/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-tertiary text-3xl">directions_walk</span>
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-on-surface">Urban Walk</h4>
              <p className="text-xs text-on-surface-variant">Activity • Yesterday</p>
            </div>
            <div className="text-right">
              <span className="block font-bold text-on-surface">115</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant opacity-60">kcal</span>
            </div>
          </div>
        </div>
      </section>

      {/* Logout Action */}
      <section className="mt-12 mb-8">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 py-5 bg-error-container/20 text-error font-bold rounded-3xl border-2 border-dashed border-error/20 hover:bg-error-container/30 transition-all group"
        >
          <span className="material-symbols-outlined text-error">logout</span>
          <span>Log out</span>
        </button>
        <p className="text-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-40 mt-4">
          TuniFit Version 0.3.0
        </p>
      </section>
    </main>
  );
}
