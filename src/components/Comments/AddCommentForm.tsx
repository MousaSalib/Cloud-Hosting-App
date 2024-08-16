"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface AddCommentFormProps {
  articleId: number;
}

const AddCommentForm = ({ articleId }: AddCommentFormProps) => {
  const router = useRouter();

  const [text, setText] = useState("");

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text === "") return toast.error("Text is required");

    try {
      await axios.post(`${DOMAIN}/api/comments`, { text, articleId });
      toast.success("Comment added successfully!");
      router.refresh();
      setText("");
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <input
          className="rounded-lg text-xl p-2 w-full bg-white focus:shadow-md"
          type="text"
          placeholder="Add A Comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="text-xl text-white bg-green-700 mt-2 hover:bg-green-900 p-1 rounded-lg transition"
        >
          Comment
        </button>
      </form>
    </>
  );
};

export default AddCommentForm;
