import { createTask, getTasks } from "@/lib/repositories/task";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const tasks = await getTasks();
    return NextResponse.json(tasks);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const { text, done } = await request.json();
  try {
    const task = await createTask({ text, done });
    if (task?.acknowledged) {
      return new NextResponse("", { status: 200 });
    } else {
      return new NextResponse(`Internal Error`, { status: 500 });
    }
  } catch (err) {
    return new NextResponse(`Internal Error`, { status: 500 });
  }
};
