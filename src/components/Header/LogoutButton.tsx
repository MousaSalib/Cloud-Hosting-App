"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      await axios.get(`${DOMAIN}/api/users/logout`);
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.warning("Something went error");
      console.log(error);
    }
  };
  return (
    <button
      onClick={logoutHandler}
      className="bg-fuchsia-700 text-gray-200 p-1 px-1 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
