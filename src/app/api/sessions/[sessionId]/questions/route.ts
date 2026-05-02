import { NextResponse } from "next/server";
import { questionService } from "@/services/question.service";

export async function GET(
  req: Request,
  { params }: { params: { sessionId: string } }
) {
  const questions = await questionService.getBySession(
    params.sessionId
  );

  return NextResponse.json(questions);
}

export async function POST(
  req: Request,
  { params }: { params: { sessionId: string } }
) {
  try {
    const body = await req.json();

    // validation simple
    if (!body.content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const question = await questionService.create(
      params.sessionId,
      body.content,
      body.authorName
    );

    return NextResponse.json(question, { status: 201 });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}