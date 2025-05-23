import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const query = request.nextUrl.searchParams.get('query')
        if (!query)
            return new NextResponse("Recipe name is required", {
                status: 400
            })

        const data = await prisma.recipe.findMany({
            where: {
                name: {
                    contains: query,
                    mode: 'insensitive'
                }
            }, select: {
                id: true,
                name: true,
            }
        })

        if (!data || data.length === 0)
            return new NextResponse("No recipes found", {
                status: 404
            })


        return NextResponse.json({
            message: "Done", data: data
        }, {
            status: 200
        });

    } catch (error) {
        return new NextResponse("Internal Server Error", {
            status: 500
        })
    }
}