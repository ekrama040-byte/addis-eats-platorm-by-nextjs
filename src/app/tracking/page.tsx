'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Clock, MapPin, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';

export default function TrackingPage() {
  const [step, setStep] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-stone-100">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div>
            <span className="text-xs font-semibold text-[#C85A32] bg-[#C85A32]/10 px-3 py-1 rounded-full uppercase">
              Live GPS Dispatch
            </span>
            <h1 className="text-2xl font-bold mt-2 text-stone-900">Order #AE-8942 Tracking</h1>
          </div>
          <Link href="/" className="text-sm text-[#C85A32] hover:underline font-medium">
            Back to Catalog
          </Link>
        </div>

        {/* Map Simulation */}
        <div className="w-full h-64 bg-stone-100 rounded-xl relative overflow-hidden mb-8 flex items-center justify-center border border-stone-200">
          <div className="absolute inset-0 opacity-45 bg-[radial-gradient(#C85A32_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="text-center z-10 p-4 bg-white/90 backdrop-blur rounded-xl shadow-sm">
            <MapPin className="w-8 h-8 text-[#C85A32] mx-auto mb-2 animate-bounce" />
            <p className="font-bold text-stone-800">Route: Bole Medhanealem ➔ 22 Mazoria</p>
            <p className="text-xs text-stone-500">Estimated Arrival in 14 minutes</p>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-full ${step >= 1 ? 'bg-green-100 text-green-600' : 'bg-stone-100 text-stone-400'}`}>
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-stone-900">Order Received & Confirmed by Kitchen</h3>
              <p className="text-xs text-stone-500">Your order has been sent directly to the chef.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-full ${step >= 2 ? 'bg-green-100 text-green-600' : 'bg-stone-100 text-stone-400'}`}>
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-stone-900">Preparation & Sizzling in Progress</h3>
              <p className="text-xs text-stone-500">Fresh ingredients are being prepared with niter kibbeh.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-full ${step >= 3 ? 'bg-green-100 text-green-600' : 'bg-stone-100 text-stone-400'}`}>
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-stone-900">Rider Assigned (Dawit M. • Plate: 3-49281)</h3>
              <p className="text-xs text-stone-500">Insulated thermal food box secured for delivery.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-full ${step >= 4 ? 'bg-green-100 text-green-600' : 'bg-stone-100 text-stone-400'}`}>
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-stone-900">Out for Delivery</h3>
              <p className="text-xs text-stone-500">Rider is heading to your drop-off location.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}