import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return new NextResponse("UserId is required to store to db", {
        status: 400,
      });
    }
    const { n, p, k, ph, soil_quality, district, village, prediction } =
      await req.json();

    await db.cropSuggestion.create({
      data: {
        nitrogen: n,
        Phosphorus: p,
        Potassium: k,
        pH: ph,
        village: village,
        district: district,
        soilQuality: soil_quality,
        prediction: prediction,
        userId,
       
      },
    });
    return new NextResponse("Success", { status: 200 });
  } catch (error: any) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
