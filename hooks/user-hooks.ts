"use server";

import prisma from "@/lib/db";
import { signOut } from "@/auth";
import { User } from "@prisma/client";
import axios from "axios";
import db from "@/lib/db";

export async function getUserByEmail(email: string): Promise<User | null> {
  const existingUser = await prisma?.user.findUnique({
    where: {
      email: email,
    },
  });
  return existingUser || null;
}

export async function getUserById(userId: string): Promise<User | null> {
  const existingUser = await prisma?.user.findUnique({
    where: {
      id: userId,
    },
  });
  return existingUser || null;
}

export async function fetchUserDetails(userId: string) {
  try {
    const userDetails = await prisma?.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        createdAt: true,
        phoneNumber: true,
        Address: {
          select: {
            state: true,
            district: true,
            addressLine: true,
            pincode: true,
            village: true,
          },
        },
      },
    });
    if (!userDetails) {
      throw new Error("User not found");
    }
    return userDetails;
  } catch (error) {
    return "Error Occurred while  processing the request for fetching user details";
  }
}

export default async function SignOutUser() {
  await signOut();
}

export async function getWeatherDetails(city: String): Promise<any> {
  let result = {};
  await axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process
        .env.OPEN_WEATHER_API_KEY!}&units=metric`
    )
    .then(async (data) => {
      result = {
        current: {
          city: data.data?.name,
          temperature: data.data?.main?.temp,
          humidity: data.data?.main?.humidity,
          wind: data.data?.wind?.speed,
          description: data.data?.weather[0]?.description,
          feelsLike: data.data?.main?.feels_like,
          temp_max: data.data.main?.temp_max,
          temp_min: data.data.main?.temp_min,
        },
        forecast: await getWeatherForecast(
          data.data.coord.lat,
          data.data.coord.lon
        ),
      };
    })

    .catch((error) => {
      return null;
    });

  return result;
}

export async function getWeatherForecast(
  latitude: number,
  longitude: number
): Promise<any> {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=${39}&appid=${process
        .env.OPEN_WEATHER_API_KEY!}&units=metric`
    );

    const forecast = [];
    for (let idx = 0; idx < response.data.list.length; idx++) {
      if (idx === 6 || idx === 14 || idx === 22 || idx === 30 || idx === 38) {
        forecast.push(response.data.list[idx]);
      }
    }

    return forecast;
  } catch (error: any) {
    return null;
  }
}

export async function getVillageOfUser(userId: string): Promise<string | null> {
  try {
    const response = await db?.address.findFirst({
      where: {
        userId: userId,
      },
      select: {
        village: true,
      },
    });
    if (!response) return null;
    return response.village;
  } catch (error) {
    return null;
  }
}
