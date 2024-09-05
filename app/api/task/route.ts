import { prisma } from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const TaskSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  date: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({
        status: 401,
        body: { error: "UNAUTHORIZED" },
      });
    }

    const body = await req.json();

    const validated = TaskSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({
        status: 400,
        body: { error: validated.error.errors },
      });
    }

    const newTask = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        date: body.date,
        isCompleted: body.isCompleted,
        isImportant: body.isImportant,
        userId,
      },
    });

    return NextResponse.json({ status: 200, body: newTask });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      body: { error: "ERROR CREATEING TASK" },
    });
  }
}

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({
        status: 401,
        body: { error: "UNAUTHORIZED" },
      });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json({ status: 200, body: tasks });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      body: { error: "ERROR GETTING TASKS" },
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({
        status: 401,
        body: { error: "UNAUTHORIZED" },
      });
    }

    const body = await req.json();

    const validated = TaskSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({
        status: 400,
        body: { error: validated.error.errors },
      });
    }

    const updatedTask = await prisma.task.update({
      data: {
        title: body.title,
        description: body.description,
        date: body.date,
        isCompleted: body.isCompleted,
        isImportant: body.isImportant,
        userId,
      },
      where: {
        id: body.id,
      },
    });

    return NextResponse.json({ status: 200, body: updatedTask });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      body: { error: "ERROR UPDATING TASK" },
    });
  }
}
