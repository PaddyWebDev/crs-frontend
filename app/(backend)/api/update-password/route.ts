import { getUserById } from "@/hooks/user-hooks";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PATCH(req: NextRequest) {
    try {
        const { oldPassword, password } = await req.json();

        const userId = req.nextUrl.searchParams.get("userId")
        console.log(userId)

        if (!userId ) {
            return new NextResponse("User id is required for updating user", {
                status: 400
            })
        }
        const user = await getUserById(userId)

        if (!user) {
            return new NextResponse("User doesn't exist on the system", {
                status: 404
            })
        }

        if (await bcrypt.compare(password, user.password!)) {
            return new NextResponse("Previous password and current password shouldn't be same", {
                status: 409
            })
        }


        if (!(await bcrypt.compare(oldPassword, user.password!))) {
            return new NextResponse("Incorrect current password", { status: 400 });
        }

        await prisma.user.update({
            data: {
                password: await bcrypt.hash(password, 11)
            },
            where: {
                id: userId
            }
        })

        return new NextResponse("Password updated successfully", {
            status: 200
        })

    } catch (error: any) {
        return new NextResponse("Internal Server Error", {
            status: 500
        })
    }
}