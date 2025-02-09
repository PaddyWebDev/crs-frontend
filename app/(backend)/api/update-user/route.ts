import { getUserById } from "@/hooks/user-hooks";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const { name, email, phoneNumber, pincode, state, district, addressLine } =
      await request.json();
    const userId = new URL(request.url).searchParams.get("userId");

    if (!userId) {
      return new NextResponse(
        "User id is required to full fill the update request",
        { status: 409 }
      );
    }

    if (!(await getUserById(userId))) {
      return new NextResponse("User Doesn't Exist", {
        status: 404,
      });
    }

    await db?.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        Address: {
          update: {
            addressLine,
            district,
            state,
            pincode,
          },
        },
      },
      include: { Address: true },
    });
    return NextResponse.json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { success: false, message: "Error updating user", error },
      { status: 500 }
    );
  }
}
