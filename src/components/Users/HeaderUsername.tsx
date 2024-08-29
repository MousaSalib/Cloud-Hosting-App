import { getUserProfile } from "@/apiCalls/userApiCall";
import { UserProfile } from "@/utils/type";

interface HeaderUsernameProps {
  params: { id: string };
}
const HeaderUsername = async ({ params }: HeaderUsernameProps) => {
  const userInfo: UserProfile = await getUserProfile(params.id);

  return <span>{userInfo.username}</span>;
};

export default HeaderUsername;
