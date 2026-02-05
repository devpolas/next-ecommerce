import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },

  session: {
    strategy: "jwt",
    maxAge: Number(process.env.NEXTAUTH_JWT_MAX_AGE),
  },

  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },

      async authorize(credentials) {
        if (credentials === null) {
          return null;
        }

        if (credentials?.email === null && credentials?.password === null) {
          return null;
        }

        // find user in database
        const user = await prisma.user.findFirst({
          where: { email: credentials?.email as string },
        });

        if (user && user.password) {
          const isMatched = (credentials?.password as string) === user.password;

          if (isMatched) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }

        return null;
      },
    }),
  ],

  callbacks: {
    //   async signIn({ user, account, profile, email, credentials }) {
    //     return true;
    //   },
    //   async redirect({ url, baseUrl }) {
    //     return baseUrl;
    //   },
    async session({ session, user, token, trigger }) {
      session.user.id = token.sub;

      if (trigger === "update") {
        session.user.name = user.name;
      }
      return session;
    },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token;
    // },
  },
};
