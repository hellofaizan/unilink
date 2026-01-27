import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "@/server/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import { WelcomeEmail } from "@/emails/welcomeemail";
// import { resend } from "@/lib/mail";
import { db } from "@/lib/db";
import { getUserById } from "./user";
import { STATUS, USERROLE } from "@prisma/client";
import { resend } from "@/email/mail";
import WelcomeEmail from "@/email/welcomeemail";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      role: USERROLE;
      planStatus: STATUS;
      joinedAt: string;
      error?: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  pages: {
    signIn: "/login",
    newUser: "/register",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without verification
      if (account?.provider !== "credentials") {
        const existingUser = await getUserById(user.id as string);

        // Email user
        if (!existingUser) {
          const firstName = user.name?.split(" ")[0] || "there";
          await resend.emails.send({
            from: process.env.EMAIL_FROM || "onboarding@resend.dev",
            to: user.email as string,
            subject: `Welcome to Unilink, ${firstName} – Let's Get Started!`,
            react: WelcomeEmail({
              firstName: user.name as string,
            }),
          });
        }

        return true;
      }

      const userData = await getUserById(user.id as string);

      if (!userData?.emailVerified) return false;

      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as USERROLE;
      }

      if (token.planStatus && session.user) {
        session.user.planStatus = token.planStatus as STATUS;
      }

      if (token.joinedAt && session.user) {
        session.user.joinedAt = token.joinedAt as string;
      }

      if (token.error && session.user) {
        session.user.error = token.error as string;
      } else if (session.user) {
        session.user.error = undefined;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      token.planStatus = existingUser.planStatus;
      token.joinedAt = existingUser.joinedAt;
      token.name = existingUser.name;
      token.picture = existingUser.image;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
