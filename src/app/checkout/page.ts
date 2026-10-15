'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Telebirr');
  const [formData, setFormData] = useState({
    fullName: 'Ekram Ahmed',
    phone: '+251 911 234567',
    address: 'Bole Road, near Friendship City Center, Addis Ababa',
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ id: '1', name: 'Habesha Special Beyaynetu', price: 380, qty: 1 }],
          paymentMethod,
          ...formData,
        }),
      });

      const data = await res.json();
      if (data.success) {
        router.push('/tracking');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const methods = [
    { id: 'Telebirr', name: 'Telebirr Mobile Money', desc: 'Instant USSD / Push notification approval' },
    { id: 'CBE', name: 'Commercial Bank of Ethiopia (CBE)', desc: 'Direct secure bank account transfer' },
    { id: 'Awash', name: 'Awash Bank', desc: 'Awash Mobile & Internet banking' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-stone-900">Secure Checkout & Banking</h1>

      <form onSubmit={handleCheckout} className="space-y-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-stone-100">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#C85A32] focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Phone Number (Ethiopia)</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#C85A32] focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Delivery Address in Addis Ababa</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#C85A32] focus:outline-none"
            required
          />
        </div>

        {/* Banking Selector */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-stone-700">Select Local Banking / Payment Gateway</label>
          <div className="grid grid-cols-1 gap-3">
            {methods.map((method) => (
              <div
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                  paymentMethod === method.id
                    ? 'border-[#C85A32] bg-[#C85A32]/5 ring-2 ring-[#C85A32]/20'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{method.name}</h4>
                  <p className="text-xs text-stone-500">{method.desc}</p>
                </div>
                <input
                  type="radio"
                  checked={paymentMethod === method.id}
                  onChange={() => setPaymentMethod(method.id)}
                  className="text-[#C85A32] focus:ring-[#C85A32]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4 flex justify-between items-center">
          <div>
            <p className="text-xs text-stone-500">Total Due (incl. VAT & Delivery)</p>
            <p className="text-xl font-extrabold text-stone-900">440.00 ETB</p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#C85A32] hover:bg-[#A64621] text-white font-bold px-8 py-3 rounded-xl transition shadow-lg shadow-[#C85A32]/20 disabled:opacity-50"
          >
            {loading ? 'Processing Bank Payment...' : 'Pay & Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
}