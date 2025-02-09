"use server";
import { resetPassSchema } from "@/schemas/auth-schemas";
import { z } from "zod";
import { getUserByEmail } from "@/hooks/user-hooks";
import { generatePasswordResetToken } from "@/hooks/reset-pass";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL!,
    pass: process.env.PASSWORD!,
  },
});

export async function sendVerificationEmail(
  email: string,
  token: string
): Promise<void> {
  const verificationLink = `${process.env.AUTH_TRUST_HOST}/guest/new-verification?token=${token}`;

  await transporter.sendMail({
    to: email,
    subject: "Verify your email address",
    html: `<p> Click <a href="${verificationLink}">here</a> to verify your email address</p>`,
  });

}

export async function sendResetPassEmail(
  data: z.infer<typeof resetPassSchema>
): Promise<string> {
  const validatedFields = resetPassSchema.safeParse(data);
  if (!validatedFields.success) {
    throw new Error("Invalid Email");
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) throw new Error("Email Not Found");
  const passwordResetToken = await generatePasswordResetToken(email);

  const resetLink = `${process.env.AUTH_TRUST_HOST}/reset-password?token=${passwordResetToken.token}`;

  await transporter.sendMail({
    to:  passwordResetToken.email,
    subject: "Reset your password",
    html: `<p> Click <a href="${resetLink}">here</a> to reset password</p>`,
  });
  return "Reset Email Sent!";
}

export async function sendTwoFactorEmail(
  email: string,
  token: string
): Promise<string> {
  await transporter.sendMail({
    to: email,
    subject: "Reset your password",
    html: `<p> Your 2FA code: ${token}</p>`,
  });

  return "Email Sent!";
}
