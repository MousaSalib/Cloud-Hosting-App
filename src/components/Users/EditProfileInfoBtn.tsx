"use client";

import { useState } from "react";
import UpdateUserProfileInfo from "./UpdateUserProfileInfo";

interface EditProfileInfoBtnProps {
  userId: number;
  username: string;
  email: string;
  password: string;
}

const EditProfileInfoBtn = ({
  username,
  userId,
  email,
  password,
}: EditProfileInfoBtnProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
      >
        Edit
      </button>
      {open && (
        <UpdateUserProfileInfo
          setOpen={setOpen}
          userId={userId}
          username={username}
          email={email}
          password={password}
        />
      )}
    </div>
  );
};

export default EditProfileInfoBtn;
