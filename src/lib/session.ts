import { auth } from "@/server/auth";
import { getUserById } from "@/server/user";

export async function getCurrentUser() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return null;
    }
    
    const user = await getUserById(session.user.id);
    return user;
  } catch (error) {
    return null;
  }
} 