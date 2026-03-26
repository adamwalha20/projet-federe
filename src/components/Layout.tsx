import { Outlet, Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: 'home', label: 'Home' },
    { path: '/meals', icon: 'restaurant', label: 'Meals' },
    { path: '/ai', icon: 'auto_awesome', label: 'AI', isAi: true },
    { path: '/activity', icon: 'fitness_center', label: 'Activity' },
    { path: '/profile', icon: 'person', label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body pb-32">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container overflow-hidden ring-2 ring-primary-container/20">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJKYvZA4KFfskogvSD5QDlvszqwNVobfu6ezXsaHXWETCynVcDELWjWnAdiu4L7-YH26sPMepLTSjwCPvmyYrSDeenswAlxxDGvznPvqQHrC5LAtIxVJPFSGs41tLyy-cznsZkUk01XrQ4_OwaK0cJZ7vX3Ln8PjaPOV_X2HtLcvNgbsBuOh4WHckGQqt9CvIW4B6f9FS3g_t5ASzu9xn3C1epD4Ko1NpNPgx88hVbTyfrYIdg_iUDfc_ZWF2ZxmqRk0-GE-GM1Ann" 
              alt="User" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-2xl font-black italic text-orange-600 dark:text-orange-500 font-headline tracking-tight">TuniFit</span>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low text-orange-600 hover:opacity-80 transition-opacity active:scale-95">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      {/* Main Content */}
      <Outlet />

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl z-50 rounded-t-[32px] shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                "flex flex-col items-center justify-center px-5 py-2 transition-all duration-200 active:scale-90",
                isActive 
                  ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-2xl" 
                  : "text-slate-400 dark:text-slate-500 hover:text-orange-500"
              )}
            >
              <span 
                className="material-symbols-outlined mb-1"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span className={clsx("font-['Inter'] text-[11px] font-semibold uppercase tracking-wider mt-1", isActive && "text-orange-600")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
