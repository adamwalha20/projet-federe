import { useState, FormEvent } from 'react';
import { useStore } from '../store/useStore';

export default function Meals() {
  const { logMeal, meals } = useStore();
  const [search, setSearch] = useState('');

  const dishes = [
    {
      id: 1,
      name: "Couscous with Lamb",
      calories: 850,
      serving: "Large portion",
      ingredients: "Semolina, Lamb, Chickpeas, Carrots, Potatoes, Zucchini, Spices",
      image: "/images/meals/couscous.png"
    },
    {
      id: 2,
      name: "Brik with Tuna",
      calories: 280,
      serving: "1 piece",
      ingredients: "Pastry, Egg, Tuna, Parsley, Capers, Onion",
      image: "/images/meals/brik.png"
    },
    {
      id: 3,
      name: "Ojja Merguez",
      calories: 450,
      serving: "Standard portion",
      ingredients: "Eggs, Merguez sausages, Peppers, Tomatoes, Garlic, Harissa",
      image: "/images/meals/ojja.png"
    },
    {
      id: 4,
      name: "Lablabi",
      calories: 650,
      serving: "Full bowl",
      ingredients: "Chickpeas, Bread, Garlic, Cumin, Harissa, Olive oil, Egg",
      image: "/images/meals/lablabi.png"
    }
  ];

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMeal, setNewMeal] = useState({ name: '', calories: '', serving: '', ingredients: '' });

  const filteredDishes = dishes.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
  const totalCalories = meals.reduce((acc, meal) => acc + meal.calories, 0) || 2100;

  const handleAddMeal = (dish: any) => {
    logMeal({
      meal_name: dish.name,
      calories: dish.calories,
      ingredients: dish.ingredients
    });
  };

  const handleSubmitCustomMeal = (e: FormEvent) => {
    e.preventDefault();
    logMeal({
      meal_name: newMeal.name,
      calories: parseInt(newMeal.calories),
      ingredients: newMeal.ingredients
    });
    setNewMeal({ name: '', calories: '', serving: '', ingredients: '' });
    setShowAddForm(false);
  };

  return (
    <main className="pt-24 pb-32 px-6 max-w-2xl mx-auto space-y-8">
      {/* Hero Section / Search */}
      <section className="space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-primary font-headline font-bold uppercase tracking-widest text-xs">Calorie Tracker</p>
            <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">Tunisian Flavors</h2>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="p-3 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span className="text-sm font-bold">Add Custom</span>
          </button>
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

      {/* Add Meal Form (Modal-like) */}
      {showAddForm && (
        <section className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-headline font-bold">New Custom Meal</h3>
              <button 
                onClick={() => setShowAddForm(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                title="Close"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmitCustomMeal} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-1">Meal Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Shakshuka"
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all border-none outline-none"
                  value={newMeal.name}
                  onChange={e => setNewMeal({...newMeal, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">Calories (kcal)</label>
                  <input 
                    required
                    type="number" 
                    placeholder="e.g. 450"
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all border-none outline-none"
                    value={newMeal.calories}
                    onChange={e => setNewMeal({...newMeal, calories: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">Serving Size</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 200g"
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all border-none outline-none"
                    value={newMeal.serving}
                    onChange={e => setNewMeal({...newMeal, serving: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-1">Ingredients</label>
                <textarea 
                  rows={3}
                  placeholder="List main ingredients..."
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all border-none outline-none resize-none"
                  value={newMeal.ingredients}
                  onChange={e => setNewMeal({...newMeal, ingredients: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all transform active:scale-95 shadow-lg shadow-primary/20"
              >
                Log Meal
              </button>
            </form>
          </div>
        </section>
      )}

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
