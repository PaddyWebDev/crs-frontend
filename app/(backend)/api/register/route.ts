import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { getUserByEmail } from "@/hooks/user-hooks";
import { generateVerificationToken } from "@/lib/verification-token";
import { sendVerificationEmail } from "@/hooks/mail-hooks";
import db from "@/lib/db";


export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      state,
      district,
      addressLine,
      pincode,
      village,
    } = await request.json();
    const hashPassword = await bcryptjs.hash(password, 10);
    if (await getUserByEmail(email)) {
      return new NextResponse("Email already in use", { status: 409 });
    }
    await db?.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        phoneNumber: phoneNumber,
        Address: {
          create: {
            village,
            state,
            district,
            addressLine: addressLine,
            pincode,
          },
        },
      },
      include: {
        Address: true, // Include the created address in the result
      },
    });

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return new NextResponse("Confirmation Email Sent", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
