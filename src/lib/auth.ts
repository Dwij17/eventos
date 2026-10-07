import NextAuth from "next-auth";
import { decode as defaultDecode } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

const KNOWN_SECRETS = Array.from(
  new Set(
    [
      process.env.AUTH_SECRET,
      process.env.NEXTAUTH_SECRET,
      "das-sal-bad-bhi-mai-rahun-iconic",
      "i-love-seedheMaut",
      "dev-secret-key-eventos-2024-change-in-production",
    ].filter(Boolean) as string[]
  )
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "das-sal-bad-bhi-mai-rahun-iconic",
  trustHost: true,
  session: { strategy: "jwt" },
  jwt: {
    async decode(params) {
      if (!params.token) return null;
      // Try current and previous secrets so existing browser cookies decrypt seamlessly
      for (const secret of KNOWN_SECRETS) {
        try {
          const decoded = await defaultDecode({ ...params, secret });
          if (decoded) return decoded;
        } catch {
          // Continue to next secret
        }
      }
      // If no secret matches, return null safely instead of throwing JWTSessionError
      return null;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isPasswordValid) {
          return null;
        }

        if (user.status !== "ACTIVE") {
          throw new Error("Account is suspended or deactivated");
        }

        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          avatar: user.avatar,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.email = user.email!;
        token.firstName = (user as any).firstName;
        token.lastName = (user as any).lastName;
        token.role = (user as any).role;
        token.avatar = (user as any).avatar;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        role: token.role as any,
        avatar: token.avatar as string | null,
      } as any;
      return session;
    },
  },
});
