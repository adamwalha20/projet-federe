import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup attempt:', { fullName, email });
    navigate('/');
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 w-full max-w-screen-xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-600" data-icon="fitness_center">fitness_center</span>
            <h1 className="text-2xl font-black italic text-orange-600 tracking-tighter font-headline">TuniFit</h1>
          </Link>
          <button className="text-slate-500 font-label text-xs font-semibold uppercase tracking-widest hover:text-orange-500 transition-colors">Aide</button>
        </div>
      </header>

      <main className="relative pt-24 pb-12 px-6 flex flex-col items-center justify-center min-h-screen overflow-hidden">
        {/* Visual Background Accent */}
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary-fixed/30 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-secondary-fixed/20 rounded-full blur-[80px] -z-10"></div>
        
        <div className="w-full max-w-md space-y-8">
          {/* Header Section */}
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-4xl font-extrabold text-on-surface font-headline tracking-tight leading-tight">
              Créer un compte
            </h2>
            <p className="text-on-surface-variant font-body">
              Rejoignez la communauté et commencez à transformer votre routine dès aujourd'hui.
            </p>
          </div>

          {/* Signup Card */}
          <div className="surface-container-lowest glass-card p-8 rounded-xl shadow-sm space-y-6">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Input Nom */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-label ml-1" htmlFor="full_name">
                  Nom complet
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">person</span>
                  <input 
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-primary-container font-body text-on-surface placeholder:text-outline/60 transition-all" 
                    id="full_name" 
                    placeholder="Ex: Jean Dupont" 
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Input Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-label ml-1" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">mail</span>
                  <input 
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-primary-container font-body text-on-surface placeholder:text-outline/60 transition-all" 
                    id="email" 
                    placeholder="jean.dupont@exemple.com" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Input Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-label ml-1" htmlFor="password">
                  Mot de passe
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">lock</span>
                  <input 
                    className="w-full pl-12 pr-12 py-3.5 bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-primary-container font-body text-on-surface placeholder:text-outline/60 transition-all" 
                    id="password" 
                    placeholder="••••••••" 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors" 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                className="w-full bg-[linear-gradient(135deg,#9f4200_0%,#ff6d00_100%)] text-on-primary font-bold py-4 rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group" 
                type="submit"
              >
                Commencer l'aventure
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center py-2">
              <div className="w-full h-[1px] bg-slate-200"></div>
              <span className="absolute px-4 bg-white text-xs font-label uppercase tracking-widest text-slate-400">Ou s'inscrire avec</span>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-3 px-4 bg-surface-container-high hover:bg-surface-container-highest rounded-xl transition-colors font-semibold text-on-surface-variant">
                <img 
                  alt="Google" 
                  className="w-5 h-5" 
                  src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" 
                />
                Google
              </button>
              <button className="flex items-center justify-center gap-3 py-3 px-4 bg-surface-container-high hover:bg-surface-container-highest rounded-xl transition-colors font-semibold text-on-surface-variant">
                <span className="material-symbols-outlined text-xl">ios</span>
                Apple
              </button>
            </div>
          </div>

          {/* Footer Link */}
          <div className="text-center space-y-4">
            <p className="text-on-surface-variant font-body">
              Déjà un compte ? <Link className="text-primary font-bold hover:underline underline-offset-4" to="/login">Se connecter</Link>
            </p>
            <p className="text-[10px] text-outline font-label uppercase tracking-widest max-w-[280px] mx-auto leading-relaxed">
              En vous inscrivant, vous acceptez nos <button className="underline">Conditions d'utilisation</button> et notre <button className="underline">Politique de confidentialité</button>.
            </p>
          </div>
        </div>
      </main>

      {/* Visual Element: Floating Image Card (Bento-style snippet) */}
      <div className="hidden lg:block fixed right-12 bottom-12 w-80">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
          <div className="rounded-xl overflow-hidden aspect-square mb-4">
            <img 
              alt="Morning Workout" 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" 
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Prochaine étape</p>
              <p className="font-headline font-extrabold text-on-surface">Définir vos objectifs</p>
            </div>
            <div className="w-10 h-10 bg-secondary-container rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-on-secondary-container">bolt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
