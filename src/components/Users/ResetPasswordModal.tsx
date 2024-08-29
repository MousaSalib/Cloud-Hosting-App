"use client"

import { Dispatch, SetStateAction, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";

interface ResetPasswordModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  userId: number;
}

const ResetPasswordModal = ({ setOpen, userId }: ResetPasswordModalProps) => {
  const [newPassword, setNewPassword] = useState("");

  const resetPasswordHandler = async () => {
    if (newPassword === "") return toast.error("Password is required");

    try {
      await axios.put(`${DOMAIN}/api/users/profile/${userId}`, {
        password: newPassword,
      });
      toast.success("Password updated successfully!");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-20 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="w-11/12 lg:w-2/4 bg-white rounded-lg p-3">
        <div className="flex justify-end items-start mb-5">
          <IoMdCloseCircleOutline
            onClick={() => setOpen(false)}
            className="text-red-500 cursor-pointer text-3xl"
          />
        </div>
        <input
          type="password"
          placeholder="Enter new password"
          className="text-xl rounded-lg p-2 w-full bg-white mb-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          onClick={resetPasswordHandler}
          className="bg-green-700 text-white w-full mt-2 p-1 text-xl rounded-lg hover:bg-green-900 transition"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
