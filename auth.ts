import NextAuth, { type DefaultSession } from "next-auth";
import { getUserByEmail, getUserById } from "@/hooks/user-hooks";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/db";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas/auth-schemas";
import bcryptjs from "bcryptjs";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  // role: userRole;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
export const {
  auth,
  signOut,
  signIn,
  handlers: { GET, POST },
} = NextAuth({
  pages: {
    signIn: "/guest/Login",
    error: "/guest/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow non credential user to login without email verification
      if (account?.provider !== "credentials") {
        return true;
      }

      // Prevent SignIn without email Verification
      const existingUser = await getUserById(user.id!);
      if (!existingUser || !existingUser.emailVerified) {
        return false;
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      // if (token.role && session.user) {
      //   session.user.role = token.role as userRole;
      // }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (!token.sub) return token;

      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      // token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  // ...AuthConfig,

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
});
