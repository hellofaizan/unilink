import { db } from "@/lib/db";
import { auth } from "./auth";

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const fullUserData = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {},
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const linkedAccounts = async (id: string) => {
  try {
    const accounts = await db.account.findMany({
      where: {
        userId: id,
      },
    });
    return accounts;
  } catch (error) {
    return null;
  }
};

export const currentUser = async () => {
    const session = await auth();
  
    return session?.user;
  };
  
  export const currentRole = async () => {
    const session = await auth();
  
    return session?.user?.role;
  };
  
  export const onWaitlist = async (email: string) => {
    try {
      const user = await db.waitlist.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (error) {
      return null;
    }
  };