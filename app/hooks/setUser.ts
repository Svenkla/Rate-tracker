import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { UserTrackerI } from "@/models/userTracker/UserTracker";

function setUser() {
  const [user, setUser] = useState<UserTrackerI | undefined>();

  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) return;
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `/api/user?email=${session && session.user?.email}`
        );
        const data: UserTrackerI = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [session]);

  const addWork = async (works: any[]) => {
    if (!session?.user) return;

    try {
      const response = await fetch(`/api/user/insertMongo`, {
        method: "POST",
        body: JSON.stringify({
          email: session?.user?.email,
          works: works,
        }),
      });

      if (response.ok) {
        console.log("User transactions updated successfully");
      } else {
        console.error(
          "Failed to update user transactions:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Failed to update user transactions:", error);
    }
  };

  return {
    addWork,
    user,
  };
}

export default setUser;
