'use client';

import { useState, useEffect } from 'react';
import { Search, Flame, Star, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface FoodItem {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  prepTime: string;
  spicy: boolean;
  image: string;
  description: string;
}

export default function HomePage() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch('/api/foods')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFoods(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load foods:', err);
        setLoading(false);
      });
  }, []);

  const categories = ['All', 'Vegetarian/Fasting', 'Tibs', 'Traditional'];

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-3xl p-8 md:p-12 mb-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-4 right-4 bg-[#C85A32] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          SSR • Revalidated Hourly
        </div>
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            Authentic Ethiopian Cuisine, <span className="text-[#D4AF37]">Delivered Sizzling Hot</span> from Addis.
          </h1>
          <p className="text-stone-300 text-base md:text-lg mb-6">
            From Bole to Piassa, savor traditional homemade flavors with instant Telebirr & CBE digital checkout.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3.5 w-5 h-5 text-stone-400" />
          <input
            type="text"
            placeholder="Search Beyaynetu, Tibs, Doro Wat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] shadow-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#C85A32] text-white shadow-md shadow-[#C85A32]/20'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-20 text-stone-500 font-medium">Loading delicious Ethiopian dishes from API...</div>
      ) : (
        /* Food Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFoods.map((food) => (
            <div key={food.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-stone-100 overflow-hidden flex flex-col">
              <div className="relative h-48 bg-stone-200">
                <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                {food.spicy && (
                  <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 font-bold shadow">
                    <Flame className="w-3 h-3" /> Spicy
                  </span>
                )}
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-stone-900 leading-snug">{food.name}</h3>
                  <span className="text-xs bg-stone-100 px-2 py-1 rounded-md text-stone-600 font-medium whitespace-nowrap">
                    {food.category}
                  </span>
                </div>
                <p className="text-stone-500 text-xs mb-4 line-clamp-2">{food.description}</p>

                <div className="flex items-center gap-4 text-xs text-stone-500 mb-4 mt-auto">
                  <span className="flex items-center gap-1 text-amber-600 font-semibold">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> {food.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {food.prepTime}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                  <span className="text-lg font-extrabold text-stone-900">{food.price} ETB</span>
                  <Link
                    href="/checkout"
                    className="bg-[#C85A32]/10 text-[#C85A32] hover:bg-[#C85A32] hover:text-white px-4 py-2 rounded-xl font-bold text-sm transition"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}