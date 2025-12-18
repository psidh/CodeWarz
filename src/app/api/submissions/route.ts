import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get('userId');
    const problemId = searchParams.get('problemId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const submissions = await prisma.submission.findMany({
      where: {
        userId,
        ...(problemId ? { problemId } : {}),
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        problemId: true,
        verdict: true,
        createdAt: true,
        stdout: true,
        stderr: true,
      },
    });

    return NextResponse.json({ submissions });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
