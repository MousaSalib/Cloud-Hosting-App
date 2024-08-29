"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteUserAccountProps {
  userId: number;
}

const DeleteUserAccount = ({ userId }: DeleteUserAccountProps) => {
  const router = useRouter();

  const deleteUserAccountHandler = async () => {
    try {
      if (confirm("Are you sure, you want to delete your account?")) {
        await axios.delete(`${DOMAIN}/api/users/profile/${userId}`);

        router.push("/");
        router.refresh();
        toast.success("Your account has been deleted successfully");
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };
  return (
    <div>
      <button
        onClick={deleteUserAccountHandler}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Delete Account
      </button>
    </div>
  );
};

export default DeleteUserAccount;
