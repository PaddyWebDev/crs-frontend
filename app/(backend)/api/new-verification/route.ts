import { getUserByEmail } from "@/hooks/user-hooks";
import db from "@/lib/db";
import { getVerificationTokenByToken } from "@/lib/verification-token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    console.log(token);
    const existingToken = await getVerificationTokenByToken(token);
    console.log(existingToken);
    if (!existingToken) {
      return new NextResponse("Token is required", { status: 400 });
    }
    const hasExpired = new Date(existingToken.expiresAt) < new Date();

    if (hasExpired) {
      return new NextResponse("Token Has Expired!", { status: 400 });
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
      return new NextResponse("Email Doesn't Exist", { status: 404 });
    }

    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
