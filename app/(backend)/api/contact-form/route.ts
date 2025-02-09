import { getUserByEmail } from "@/hooks/user-hooks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    let isSystemUser = false;
    if (await getUserByEmail(email)) {
      isSystemUser = true;
    }

    await prisma?.contactForm.create({
      data: {
        name,
        email,
        message,
        isSystemUser,
      },
    });

    return new NextResponse("Contact Form Submitted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
