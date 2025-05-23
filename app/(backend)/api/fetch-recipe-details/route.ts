import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id")
        if (!id) {
            return new NextResponse("Id is required", {
                status: 400
            })
        }

        const recipe = await prisma.recipe.findUnique({
            where: {
                id: id
            }
        })
        if (!recipe) {
            return new NextResponse("Recipe not found", {
                status: 404
            })
        }
        return NextResponse.json({
            recipe: recipe,
            message: "Recipe found"
        }, {
            status: 200
        })
    } catch (error) {
        return new NextResponse("Internal Server Error", {
            status: 500
        })
    }
}