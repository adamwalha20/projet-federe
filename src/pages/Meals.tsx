import { useState } from 'react';
import { useStore } from '../store/useStore';

export default function Meals() {
  const { logMeal, meals } = useStore();
  const [search, setSearch] = useState('');

  const dishes = [
    {
      id: 1,
      name: "Couscous au poisson",
      calories: 800,
      serving: "350g serving",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpCQjuOSdhEqe5aV4XCwd-6SVD6OKTK4GQv-1_SYN6EMH1fQibJ9Xes5Sy0zkCRuha-ZQT_DoLS4Uke9MHa7P2mvItJO8E89JrlvguCwT0bTBgYApg_zt1OLBMP8whc9n9qzsff3rxP5-xP8Xn0dAmKmiAFkUJWFrvSk2aVqeohXoAQgZb2NEZUeAUoYQo4-PFw3PZTyVQRcJT0DTYENsin33tW6NrDTdMGdMfnei1WsJpC5z8Cpf1FK-c_ZZ5_aYohhGk_IfXSJlL"
    },
    {
      id: 2,
      name: "Brik au thon",
      calories: 150,
      serving: "1 piece",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmN0_pyRMnd54vkREHL9loTCDTDwwMKkBCX8WSEWCAjQFLMQ23g7Kz9VtKtfqvJCM93k1G3q6d2r7CrAWblcDXkxaPiKuzsHlesiMnfaUezk34uYgIcf6m1Obm0xZsxZnoAM87L2LB6RkQMOUgrpQgGD4n2UKXBp9yXI4wBW0AakNoC-qtqdRKLc8D0k0u4HfAWndfWbuDN2tMl_Uewhjk6pjwdwwBmFpyQXNqh6iWMHhtsTPodJJ0eja_MGIt8fklyKUF7-KP0zN5"
    },
    {
      id: 3,
      name: "Ojja merguez",
      calories: 450,
      serving: "standard portion",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJL4QacZo2apzby4B4uDQNOEmyoQJskhzl2ZEdsIQjwluThW-CS-UBB2xrVstIYIVsGSKn6dw9o2tBBjh4aZeH-AK3cD9MmOUChbhmG72PaDimFnu4OJneDR_5_pBnCPvk0bPLmveM0U8nlbSTiK07xWHjqGcyhtiyduD4E7mx6qS5RMWnaeKyYI5YyL8xLsrr5v7Fok6bQl01__hWIa1Iw9noEbZ5fY-II_m9Kd5TvCdSwEgRDDXVhSjpFcWM62eLqxMKWgYNwdC4"
    },
    {
      id: 4,
      name: "Lablabi",
      calories: 700,
      serving: "full bowl",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFu-ap5u2swkrQf-jlk09S9QFTe0_soB2QgCjLMWjstV2CVbe8nJ4_0fQ2GHGlDy7TL85lF4bdZq5RBf7oL06iNOsa7JGE8PqHroAzqHv98Ix9iaAwy1opSCR6LXRPkvt5RucIz3Tmu3sx4Ksy5bTBn9F_YIP9giMudmenU8H5AQXNaPO_tMeRZpW6QM7JgXcJmj6SOEP4EnzKPQfU4kf2xy_zvaONvBDkwIyeF6cuO6USckuPWzcB_Y9d0q6tERVORNh3azCzCMel"
    }
  ];

  const filteredDishes = dishes.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
  const totalCalories = meals.reduce((acc, meal) => acc + meal.calories, 0) || 2100;

  const handleAddMeal = (dish: typeof dishes[0]) => {
    logMeal({
      meal_name: dish.name,
      calories: dish.calories
    });
    // Optional: Add a toast notification here
  };

  return (
    <main className="pt-24 pb-32 px-6 max-w-2xl mx-auto space-y-8">
      {/* Hero Section / Search */}
      <section className="space-y-6">
        <div className="space-y-1">
          <p className="text-primary font-headline font-bold uppercase tracking-widest text-xs">Calorie Tracker</p>
          <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">Tunisian Flavors</h2>
        </div>
        
        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-outline">search</span>
          </div>
          <input 
            type="text" 
            placeholder="Search traditional dishes..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-surface-container border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/50"
          />
        </div>
      </section>

      {/* List Section */}
      <section className="space-y-4">
        <h3 className="font-headline font-bold text-lg px-2">Popular Dishes</h3>
        <div className="space-y-3">
          {filteredDishes.map((dish) => (
            <div key={dish.id} className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl group transition-all hover:bg-surface-container-low">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-surface-container overflow-hidden">
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="font-bold text-on-surface">{dish.name}</p>
                  <p className="text-sm text-on-surface-variant">{dish.calories} kcal • {dish.serving}</p>
                </div>
              </div>
              <button 
                onClick={() => handleAddMeal(dish)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-container text-on-primary-container hover:scale-110 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Summary / Macro Breakdown Section */}
      <section className="bg-primary-container rounded-3xl p-6 text-on-primary-container space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="font-headline font-bold text-lg opacity-80 uppercase tracking-wider text-xs">Total Daily Consumption</h3>
            <p className="font-headline font-extrabold text-5xl">{totalCalories.toLocaleString()} <span className="text-xl font-normal opacity-70">kcal</span></p>
          </div>
          <div className="w-16 h-16 relative">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="opacity-20"></circle>
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="175" strokeDashoffset="40" strokeLinecap="round"></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">75%</div>
          </div>
        </div>

        {/* Macro Bento */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-on-primary-container/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Protein</span>
            <span className="text-lg font-bold">85g</span>
            <div className="w-full h-1.5 bg-on-primary-container/20 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-secondary w-[60%] rounded-full"></div>
            </div>
          </div>
          <div className="bg-on-primary-container/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Carbs</span>
            <span className="text-lg font-bold">240g</span>
            <div className="w-full h-1.5 bg-on-primary-container/20 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-primary w-[85%] rounded-full"></div>
            </div>
          </div>
          <div className="bg-on-primary-container/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Fats</span>
            <span className="text-lg font-bold">65g</span>
            <div className="w-full h-1.5 bg-on-primary-container/20 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-tertiary w-[45%] rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
