import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";
import { normalize, CONTEST_START, getBasePoints } from "@/lib/utils";

function calculatePoints(problemId: string): number {
  const basePoints = getBasePoints(problemId);

  const now = new Date();
  const diffMs = now.getTime() - CONTEST_START.getTime();
  const diffMinutes = Math.max(0, Math.floor(diffMs / (1000 * 60)));

  const penalty = diffMinutes * 5;

  return Math.max(0, basePoints - penalty);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const problemId = formData.get("problemId") as string | null;
    const userId = formData.get("userId") as string | null;

    if (!file || !problemId || !userId) {
      return NextResponse.json(
        { error: "Missing file, problemId, or userId" },
        { status: 400 }
      );
    }
    console.log(problemId);
    console.log(userId);

    const lastSubmission = await prisma.submission.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    if (lastSubmission) {
      const diff = Date.now() - new Date(lastSubmission.createdAt).getTime();

      if (diff < 15 * 1000) {
        return NextResponse.json(
          { error: "Please wait 30 seconds before submitting again" },
          { status: 429 }
        );
      }
    }

    const code = await file.text();

    const ext = file.name.split(".").pop();
    let languageId: number;

    switch (ext) {
      case "py":
        languageId = 71;
        break;

      case "java":
        languageId = 62;
        break;

      case "c":
        languageId = 50;
        break;

      case "cpp":
      case "cxx":
        languageId = 54;
        break;

      case "rs":
        languageId = 73;
        break;

      case "js":
        languageId = 63;
        break;

      default:
        return NextResponse.json(
          { error: "Unsupported language" },
          { status: 400 }
        );
    }

    const basePath = path.join(process.cwd(), "src/problems", problemId);

    const input = fs.readFileSync(path.join(basePath, "in.txt"), "utf-8");

    const expectedOutput = fs.readFileSync(
      path.join(basePath, "out.txt"),
      "utf-8"
    );

    const submission = await prisma.submission.create({
      data: {
        userId,
        problemId,
        verdict: "PENDING",
        sourceCode: code,
      },
    });

    const judgeRes = await fetch(
      `${process.env.JUDGE0_URL}/submissions?wait=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.JUDGE0_TOKEN}`,
        },
        body: JSON.stringify({
          source_code: code,
          language_id: languageId,
          stdin: input,
        }),
      }
    );

    const judgeData = await judgeRes.json();

    if (judgeData.compile_output) {
      await prisma.submission.update({
        where: { id: submission.id },
        data: {
          verdict: "CE",
          stderr: judgeData.compile_output,
        },
      });

      return NextResponse.json({
        verdict: "CE",
        compile_output: judgeData.compile_output,
      });
    }

    if (judgeData.status?.description !== "Accepted") {
      let verdict: "RE" | "TLE" = "RE";

      if (judgeData.status?.description === "Time Limit Exceeded") {
        verdict = "TLE";
      }

      await prisma.submission.update({
        where: { id: submission.id },
        data: {
          verdict,
          stdout: judgeData.stdout,
          stderr: judgeData.stderr,
        },
      });

      return NextResponse.json({
        verdict,
        stdout: judgeData.stdout,
        stderr: judgeData.stderr,
      });
    }

    const actual = normalize(judgeData.stdout || "");
    const expected = normalize(expectedOutput);

    const verdict = actual === expected ? "AC" : "WA";

    await prisma.submission.update({
      where: { id: submission.id },
      data: {
        verdict,
        stdout: judgeData.stdout,
      },
    });

    return NextResponse.json({
      verdict,
      stdout: judgeData.stdout,
      expected: expectedOutput,
      submissionId: submission.id,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
