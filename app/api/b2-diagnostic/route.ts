import { NextResponse } from 'next/server';
import { testB2Connection } from '@/lib/b2';

export async function GET() {
  try {
    const result = await testB2Connection();
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        connected: false,
        bucketExists: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
