import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function getVerificationTokenByEmail(email: string) {
  try {
    const verificationToken = await db?.verificationToken.findFirst({
      where: {
        email,
      },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
}
export async function getVerificationTokenByToken(token: string) {
  try {
    const verificationToken = await db?.verificationToken.findFirst({
      where: {
        token,
      },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
}

export async function generateVerificationToken(email: string) {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const newToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expiresAt: expires,
    },
  });

  return newToken;
}
