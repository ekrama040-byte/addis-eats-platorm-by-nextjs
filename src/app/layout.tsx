import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { ShoppingBag, Compass } from 'lucide-react';

export const metadata: Metadata = {
  title: {
    default: 'Addis Eats | Authentic Ethiopian Food Delivery in Addis Ababa',
    template: '%s | Addis Eats',
  },
  description: 'Order authentic Beyaynetu, sizzling Tibs, and Doro Wat online with instant Telebirr & CBE digital banking checkout in Addis Ababa.',
  keywords: ['Ethiopian food delivery', 'Addis Ababa restaurants', 'Tibs', 'Beyaynetu', 'Telebirr food app', 'Addis Eats'],
  authors: [{ name: 'Ekram Ahmed' }],
  openGraph: {
    title: 'Addis Eats | Authentic Ethiopian Food Delivery',
    description: 'Savor traditional homemade flavors delivered hot across Bole, 22, and Piassa.',
    url: 'https://addiseats.et',
    siteName: 'Addis Eats',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🇪🇹</span>
              <span className="font-extrabold text-xl text-stone-900 tracking-tight">
                Addis<span className="text-[#C85A32]">Eats</span>
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Link href="/tracking" className="hidden md:flex items-center gap-1 text-sm font-medium text-stone-600 hover:text-[#C85A32]">
                <Compass className="w-4 h-4" /> Live Tracking
              </Link>
              <Link
                href="/checkout"
                className="bg-stone-100 hover:bg-stone-200 p-2.5 transition text-stone-800 flex items-center gap-2 px-4 rounded-full"
              >
                <ShoppingBag className="w-5 h-5 text-[#C85A32]" />
                <span className="text-sm font-semibold">Checkout</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-grow">{children}</main>

        {/* Static Footer */}
        <footer className="bg-stone-900 text-stone-300 py-10 px-6 mt-16 border-t border-stone-800">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                <span className="text-[#C85A32]">🇪🇹</span> Addis Eats Platform
              </h3>
              <p className="text-stone-400">
                Powered by Next.js App Router, Edge Middleware, and secure Ethiopian digital banking infrastructure.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Service Areas in Addis</h4>
              <ul className="space-y-1 text-stone-400">
                <li>Bole • 22 Mazoria • Kazanchis</li>
                <li>Piassa • Megenagna • CMC • Ayat</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Environment & Security</h4>
              <p className="text-stone-400 mb-1">Region: {process.env.NEXT_PUBLIC_DEFAULT_CITY || 'Addis Ababa'}</p>
              <p className="text-stone-500 text-xs">© 2026 Addis Eats. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}