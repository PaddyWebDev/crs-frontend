import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/schemas/auth-schemas";
import { getUserByEmail } from "./hooks/user-hooks";

const AuthConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }

          const verifyPass = await bcryptjs.compare(password, user.password);
          if (verifyPass) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
} satisfies NextAuthConfig;

export default AuthConfig;
