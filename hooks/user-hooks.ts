"use server";

import prisma from "@/lib/db";
import { signOut } from "@/auth";
import { User } from "@prisma/client";

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
        gender: true
      },
    });
    if (!userDetails) {
      throw new Error("User not found");
    }
    return userDetails;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function SignOutUser() {
  await signOut();
}

