import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const submissions = await prisma.submission.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        problemId: true,
        verdict: true,
      },
    });

    const verdictMap: Record<string, string> = {};
    for (const sub of submissions) {
      if (!verdictMap[sub.problemId]) {
        verdictMap[sub.problemId] = sub.verdict;
      }
    }

    return NextResponse.json({ verdicts: verdictMap });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
