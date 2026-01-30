import { useSession } from "next-auth/react";

export const useCurrentPlan = () => {

    const session = useSession();
    
    return session?.data?.user.planStatus;
}