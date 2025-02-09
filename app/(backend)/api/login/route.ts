import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/hooks/user-hooks";
import bcryptjs from "bcryptjs";
import { generateVerificationToken } from "@/lib/verification-token";
import { sendVerificationEmail } from "@/hooks/mail-hooks";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    const user = await getUserByEmail(email);
    if (!user) {
      return new NextResponse("User doesn't exist", { status: 404 });
    }


    if (!user.emailVerified) {
      const newToken = await generateVerificationToken(email);
      await sendVerificationEmail(newToken.email, newToken.token);
      return new NextResponse("Confirmation email sent!", { status: 200 });
    }

    if (!user.password) {
      return new NextResponse(
        "This account doesn't allow email & password login",
        { status: 403 }
      );
    }

    if (!(await bcryptjs.compare(password, user.password!))) {
      return new NextResponse("Password is incorrect", { status: 401 });
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
      redirectTo: "",
    });

    return new NextResponse("Login Success", { status: 200 });

  } catch (error: any) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
