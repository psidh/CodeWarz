import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: { email, password: hashed },
    });
  } catch {
    return NextResponse.json({ error: "User exists" }, { status: 409 });
  }

  return NextResponse.json({ success: true });
}
