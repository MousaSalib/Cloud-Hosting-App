import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";
import ResetPasswordModal from "./ResetPasswordModal"; // Import the reset password modal

interface UpdateUserProfileInfoProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  userId: number;
  username: string;
  email: string;
  password: string;
}

const UpdateUserProfileInfo = ({
  setOpen,
  username,
  userId,
  email,
}: UpdateUserProfileInfoProps) => {
  const router = useRouter();
  const [updatedUsername, setUpdatedUsername] = useState(username);
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // State to control password modal

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (updatedUsername === "") return toast.error("Username is required");
    if (updatedEmail === "") return toast.error("Email is required");

    try {
      await axios.put(`${DOMAIN}/api/users/profile/${userId}`, {
        username: updatedUsername,
        email: updatedEmail,
      });
      router.refresh();
      toast.success("Username and email updated successfully!");
      setUpdatedUsername("");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-10 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="w-11/12 lg:w-2/4 bg-white rounded-lg p-3">
        <div className="flex justify-end items-start mb-5">
          <IoMdCloseCircleOutline
            onClick={() => setOpen(false)}
            className="text-red-500 cursor-pointer text-3xl"
          />
        </div>
        <form onSubmit={formSubmitHandler}>
          <input
            type="text"
            placeholder="Edit Username..."
            className="text-xl rounded-lg p-2 w-full bg-white mb-2"
            value={updatedUsername}
            onChange={(e) => setUpdatedUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Edit Email..."
            className="text-xl rounded-lg p-2 w-full bg-white mb-2"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setIsPasswordModalOpen(true)} // Open password modal
            className="bg-blue-700 text-white w-full mt-2 p-1 text-xl rounded-lg hover:bg-blue-900 transition"
          >
            Reset Password
          </button>
          <button
            type="submit"
            className="bg-green-700 text-white w-full mt-2 p-1 text-xl rounded-lg hover:bg-green-900 transition"
          >
            Edit
          </button>
        </form>
      </div>
      {isPasswordModalOpen && (
        <ResetPasswordModal setOpen={setIsPasswordModalOpen} userId={userId} />
      )}
    </div>
  );
};

export default UpdateUserProfileInfo;
