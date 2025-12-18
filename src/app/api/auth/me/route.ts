import { getDataFromToken } from '@/lib/getDataFromToken';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const userID = getDataFromToken(request);

    return NextResponse.json(
      { loggedIn: true, userId: userID },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }
}
