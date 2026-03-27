import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialEmail = searchParams.get('email') || '';
  const message = searchParams.get('message');
  
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email });
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      if (data.user) {
        navigate('/');
      }
    } catch (error: any) {
      console.error('Login error:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image with Vitality Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          className="w-full h-full object-cover" 
          alt="Modern high-end gym interior" 
          src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop" 
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(159,66,0,0.85)_0%,rgba(255,109,0,0.7)_100%)]"></div>
      </div>

      {/* Main Content Shell */}
      <main className="relative z-10 w-full max-w-md px-6 py-12">
        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] p-10 shadow-2xl transition-all duration-300 border border-white/20">
          {/* Brand Identity Anchor */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-white text-4xl">fitness_center</span>
            </div>
            {/* Brand Casing Integrity: TuniFit */}
            <h1 className="font-headline text-4xl font-black italic text-orange-600 tracking-tighter">TuniFit</h1>
            <p className="font-label text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">Votre éveil commence ici</p>
          </div>

          {/* Feedback Messages */}
          {message === 'account_exists' && (
            <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
              <span className="material-symbols-outlined text-orange-600">info</span>
              <p className="text-sm font-medium text-orange-800">
                Ce compte existe déjà. Veuillez vous connecter.
              </p>
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-2">
              <label className="font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-1" htmlFor="email">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined text-xl">mail</span>
                </div>
                <input 
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary-container transition-all outline-none placeholder:text-slate-400 font-medium" 
                  id="email" 
                  placeholder="nom@exemple.com" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="password">Mot de passe</label>
                <button type="button" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-primary-container transition-colors">Mot de passe oublié ?</button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined text-xl">lock</span>
                </div>
                <input 
                  className="w-full pl-12 pr-12 py-4 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary-container transition-all outline-none placeholder:text-slate-400 font-medium" 
                  id="password" 
                  placeholder="••••••••" 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-primary transition-colors" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button 
              className="w-full py-4 px-6 bg-gradient-to-r from-primary to-primary-container text-white font-headline font-bold text-lg rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group" 
              type="submit"
            >
              <span>Se connecter</span>
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-10">
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute w-full h-[1px] bg-slate-200"></div>
              <span className="relative bg-white px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">ou continuer avec</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center py-3 bg-surface-container hover:bg-surface-container-high rounded-2xl transition-colors border border-outline-variant/10">
                <img 
                  className="w-5 h-5 mr-2" 
                  alt="Google icon" 
                  src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" 
                />
                <span className="text-xs font-bold text-on-surface-variant">Google</span>
              </button>
              <button className="flex items-center justify-center py-3 bg-surface-container hover:bg-surface-container-high rounded-2xl transition-colors border border-outline-variant/10">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05,20.28c-0.96,0-1.66-0.6-2.9-0.6s-2.04,0.6-2.9,0.6c-1.66,0-4.08-3-4.08-6.09c0-3.08,2.11-4.58,3.95-4.58c0.95,0,1.85,0.59,2.49,0.59c0.61,0,1.64-0.68,2.78-0.68c1.39,0,3.31,0.79,4.18,2.3c-0.03,0.02-2.52,1.26-2.5,4.3c0.03,3.02,2.48,4.09,2.5,4.1C20.46,20.3,18.52,20.28,17.05,20.28z M12.03,7.52c-0.02-1.1,0.5-2.25,1.11-2.99c0.6-0.75,1.7-1.33,2.75-1.33c0.01,1.13-0.41,2.25-1.12,3C14.07,7.96,12.98,8.51,12.03,7.52z"/>
                </svg>
                <span className="text-xs font-bold text-on-surface-variant">Apple</span>
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Pas encore de compte ? {' '}
              <Link className="text-orange-600 font-bold hover:underline transition-all" to="/signup">S'inscrire</Link>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-center text-white/60 text-[10px] font-bold uppercase tracking-widest">
          © 2024 TuniFit Fitness &amp; Nutrition • Tout droit réservé
        </p>
      </main>
    </div>
  );
};

export default Login;
