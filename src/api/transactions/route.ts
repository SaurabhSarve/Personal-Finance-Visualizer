import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Transaction from '@/models/Transaction';

export async function GET() {
  await connectToDatabase();
  const data = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const newTx = await Transaction.create(body);
  return NextResponse.json(newTx);
}
