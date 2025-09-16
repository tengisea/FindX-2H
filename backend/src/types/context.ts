import { NextRequest } from "next/server";

export interface Context {
  req: NextRequest;
  studentId?: string;
  organizerId?: string;
}

export async function buildContext(req: NextRequest): Promise<Context> {
  try {
    // Next.js App Router-д headers шууд ашиглах
    const studentId = req.headers.get("x-student-id");
    const organizerId = req.headers.get("x-organizer-id");

    return {
      req,
      studentId: studentId || undefined,
      organizerId: organizerId || undefined,
    };
  } catch (error) {
    console.error("Error building context:", error);
    return {
      req,
    };
  }
}
