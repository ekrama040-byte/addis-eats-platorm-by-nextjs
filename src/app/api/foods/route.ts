import { NextResponse } from 'next/server';

export async function GET() {
  const foods = [
    {
      id: '1',
      name: 'Habesha Special Beyaynetu',
      category: 'Vegetarian/Fasting',
      price: 380,
      rating: 4.9,
      prepTime: '25 mins',
      spicy: false,
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
      description: 'Assorted vegan stews served on spongy sourdough injera with shiro, misir, and kik alicha.',
    },
    {
      id: '2',
      name: 'Sizzling Tibs Special',
      category: 'Tibs',
      price: 520,
      rating: 4.8,
      prepTime: '20 mins',
      spicy: true,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80',
      description: 'Cubed tender beef sautéed in spiced butter, onions, rosemary, and green chili peppers.',
    },
    {
      id: '3',
      name: 'Traditional Doro Wat',
      category: 'Traditional',
      price: 490,
      rating: 4.9,
      prepTime: '35 mins',
      spicy: true,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80',
      description: 'Slow-cooked chicken stew in rich berbere sauce infused with niter kibbeh and hard-boiled eggs.',
    },
    {
      id: '4',
      name: 'Kitfo Special with Ayibe',
      category: 'Traditional',
      price: 560,
      rating: 5.0,
      prepTime: '25 mins',
      spicy: true,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
      description: 'Minced lean beef warmed in mitmita and clarified butter, served rare with cottage cheese and kocho.',
    },
  ];

  return NextResponse.json({ success: true, data: foods });
}