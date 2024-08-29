import { DOMAIN } from "@/utils/constants";
import { UpdateUserProfile, UserProfile } from "@/utils/type";
import { cookies } from "next/headers";

export async function getUserProfile(userId: string): Promise<UserProfile> {
  const token = cookies().get("jwtToken")?.value || "";

  const response = await fetch(`${DOMAIN}/api/users/profile/${userId}`, {
    method: "GET",
    headers: {
      Cookie: `jwtToken=${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    console.log(response.url);
    throw new Error("Failed to fetch user profile");
  }

  return response.json();
}



