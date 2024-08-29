import { cookies } from "next/headers";
import styles from "../Profile.module.css";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { getUserProfile } from "@/apiCalls/userApiCall";
import { UserProfile } from "@/utils/type";
import EditProfileInfoBtn from "@/components/Users/EditProfileInfoBtn";
import DeleteUserAccount from "@/components/Users/DeleteUserAccount";

interface UserProfilePageProps {
  params: { id: string };
}
const ProfilePage = async ({ params }: UserProfilePageProps) => {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  const userProfile: UserProfile = await getUserProfile(params.id);
  if (payload?.id !== userProfile.id) {
    throw new Error("Un Authorized");
  }

  return (
    <div className="fix-height flex justify-center  bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
        <div className={`${styles.profileTitle} p-4 text-white text-center`}>
          <h1 className="text-3xl font-bold">
            User Profile
          </h1>
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-3xl font-bold text-gray-800">
              {userProfile.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{userProfile.username}</h2>
              <p className="text-blue-700 text-base">{userProfile.email}</p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between mb-4">
              <h4 className="text-xl font-bold">Created At:</h4>
              <p
                className={`${styles.profileTitle} text-white text-xl font-semibold py-1 px-3 rounded-md`}
              >
                {new Date(userProfile.createdAt).toDateString()}
              </p>
            </div>
            <div className="flex justify-between">
              <h4 className="text-xl font-bold">Admin:</h4>
              <p
                className={`${styles.profileTitle} text-white text-xl font-semibold py-1 px-3 rounded-md`}
              >
                {userProfile.isAdmin ? "True" : "False"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-4 p-4">
          <EditProfileInfoBtn
            userId={userProfile.id}
            username={userProfile.username}
            email={userProfile.email}
            password={userProfile.password}
          />

          <DeleteUserAccount userId={userProfile.id} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
