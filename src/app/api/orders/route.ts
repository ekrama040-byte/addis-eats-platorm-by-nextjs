import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, paymentMethod, phone, deliveryAddress } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ success: false, error: 'Cart is empty' }, { status: 400 });
    }

    const transactionId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;

    return NextResponse.json({
      success: true,
      message: `Payment initiated successfully via ${paymentMethod}`,
      orderId,
      transactionId,
      estimatedDeliveryTime: '30-45 mins',
      deliveryAddress,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}