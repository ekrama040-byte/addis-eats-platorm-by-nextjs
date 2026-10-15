import { Flame, Star, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MealDBMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strInstructions?: string;
}

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

async function getFoods(): Promise<FoodItem[]> {
  const searchTerms = ["chicken", "beef", "rice", "vegetarian"];

  try {
    const responses = await Promise.all(
      searchTerms.map(async (term) => {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`,
          { next: { revalidate: 3600 } }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch ${term} meals`);
        }

        const data: { meals: MealDBMeal[] | null } = await res.json();

        return data.meals ?? [];
      })
    );

    const uniqueMeals = Array.from(
      new Map(
        responses.flat().map((meal) => [meal.idMeal, meal])
      ).values()
    );

    return uniqueMeals.slice(0, 20).map((meal, index) => ({
      id: meal.idMeal,
      name: meal.strMeal,
      category: meal.strCategory || "Popular",
      price: 180 + (index % 5) * 50,
      rating: 4.5 + (index % 5) * 0.1,
      prepTime: `${25 + (index % 4) * 10} min`,
      spicy: /chilli|chili|spicy|pepper/i.test(
        `${meal.strMeal} ${meal.strInstructions ?? ""}`
      ),
      image: meal.strMealThumb,
      description: (
        meal.strInstructions ||
        `Enjoy ${meal.strMeal}, prepared for your next meal.`
      )
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 120),
    }));
  } catch (error) {
    console.error("Error fetching food catalog:", error);
    return [];
  }
}

export default async function HomePage() {
  const foods = await getFoods();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <section className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-stone-950 via-stone-900 to-stone-800 p-8 text-white shadow-xl md:p-12">
        <div className="absolute right-4 top-4 rounded-full bg-[#C85A32] px-3 py-1 text-xs font-semibold uppercase tracking-wider">
          Fresh Food • Addis Ababa
        </div>

        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            Taste Ethiopia
          </p>

          <h1 className="mb-4 text-3xl font-extrabold leading-tight md:text-5xl">
            Authentic Ethiopian Cuisine,{" "}
            <span className="text-[#D4AF37]">
              Delivered Sizzling Hot
            </span>{" "}
            from Addis.
          </h1>

          <p className="mb-6 text-base text-stone-300 md:text-lg">
            Discover delicious meals, explore food pictures, and
            find your next favorite dish.
          </p>

          <a
            href="#food-menu"
            className="inline-flex rounded-xl bg-[#C85A32] px-6 py-3 font-bold text-white transition hover:bg-[#a94424]"
          >
            Explore Our Menu
          </a>
        </div>
      </section>

      <section id="food-menu">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-[#C85A32]">
              Discover your next meal
            </p>
            <h2 className="text-2xl font-extrabold text-stone-900 md:text-3xl">
              Explore Our Menu
            </h2>
          </div>

          <span className="text-sm text-stone-500">
            {foods.length} meals available
          </span>
        </div>

        {foods.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-10 text-center">
            <h3 className="mb-2 text-xl font-bold text-stone-800">
              Menu temporarily unavailable
            </h3>
            <p className="text-stone-600">
              Please check your internet connection and try again.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {foods.map((food, index) => (
              <article
                key={food.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-48 bg-stone-200">
                  <Image
                    src={food.image}
                    alt={food.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-500 hover:scale-105"
                    priority={index === 0}
                  />

                  {food.spicy && (
                    <span className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white shadow">
                      <Flame className="h-3 w-3" />
                      Spicy
                    </span>
                  )}

                  <span className="absolute bottom-3 left-3 z-10 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-stone-800">
                    {food.category}
                  </span>
                </div>

                <div className="flex flex-grow flex-col p-5">
                  <h3 className="mb-2 text-lg font-bold leading-snug text-stone-900">
                    {food.name}
                  </h3>

                  <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-stone-500">
                    {food.description}
                    {food.description.length >= 120 ? "..." : ""}
                  </p>

                  <div className="mb-4 mt-auto flex items-center gap-4 text-xs text-stone-500">
                    <span className="flex items-center gap-1 font-semibold text-amber-600">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      {food.rating.toFixed(1)}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {food.prepTime}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 border-t border-stone-100 pt-3">
                    <span className="text-lg font-extrabold text-stone-900">
                      {food.price} ETB
                    </span>

                    <Link
                      href={`/checkout?food=${encodeURIComponent(food.id)}`}
                      className="rounded-xl bg-[#C85A32]/10 px-4 py-2 text-sm font-bold text-[#C85A32] transition hover:bg-[#C85A32] hover:text-white"
                    >
                      Order Now
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="mt-12 border-t border-stone-200 py-6 text-center text-sm text-stone-500">
        Made with love for food lovers in Addis Ababa.
      </footer>
    </main>
  );
}