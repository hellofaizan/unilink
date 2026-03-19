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
import { generateUniqueUsername } from "@/lib/username";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      bio: string;
      username: string;
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
    // Runs when OAuth creates user for first time (e.g. Google signup)
    async createUser({ user }) {
      if (!user.id) return;

      const dbUser = await db.user.findUnique({
        where: { id: user.id },
        select: { email: true, name: true, username: true, id: true },
      });

      if (!dbUser || dbUser.username) return;

      const seedName = dbUser.name || dbUser.email.split("@")[0] || "user";

      const username = await generateUniqueUsername(
        seedName,
        async (candidate) => {
          const existing = await db.user.findUnique({
            where: { username: candidate },
            select: { id: true },
          });
          return Boolean(existing);
        },
      );

      await db.user.update({
        where: { id: user.id },
        data: { username },
      });
    },

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
    // Allow OAuth without verification
    async signIn({ user, account }) {
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

      if (token.bio && session.user) {
        session.user.bio = token.bio as string;
      }

      if (token.username && session.user) {
        session.user.username = token.username as string;
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

      token.username = existingUser.username;
      token.bio = existingUser.bio;
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
