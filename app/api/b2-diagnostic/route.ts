import { NextResponse } from 'next/server';
import { testB2Connection } from '@/lib/b2';

export async function GET() {
  try {
    const result = await testB2Connection();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      {
        connected: false,
        bucketExists: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
