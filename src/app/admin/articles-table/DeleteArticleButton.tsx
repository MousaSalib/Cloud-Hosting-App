"use client";

import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteArticleButton {
  articleId: number;
}
const DeleteArticleButton = ({ articleId }: DeleteArticleButton) => {
  const router = useRouter();

  const deleteArticleHandler = async () => {
    try {
      if (confirm("Are you sure you want to delete this article?")) {
        await axios.delete(`${DOMAIN}/api/articles/${articleId}`);
        router.refresh();
        toast.success("Article deleted successfully!");
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };
  return (
    <div
      onClick={deleteArticleHandler}
      className="bg-red-600 text-white rounded-lg cursor-pointer inline-block text-center py-1 px-2 hover:bg-red-800 transition"
    >
      DELETE
    </div>
  );
};

export default DeleteArticleButton;
