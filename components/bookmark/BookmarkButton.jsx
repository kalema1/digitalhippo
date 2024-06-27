"use client";

import { FaBookmark } from "react-icons/fa";
import { useBookmarkButton } from "./useBookmarkButton";
import { ADD_BOOKMARK, REMOVE_BOOKMARK } from "@/constants/constants";

export default function BookmarkButton({ property }) {
  const { handleClick, isBookmarked } = useBookmarkButton(property);
  return (
    <button
      onClick={handleClick}
      className={`${
        isBookmarked
          ? "bg-red-500 hover:bg-red-600"
          : "bg-blue-500 hover:bg-blue-600"
      } text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
    >
      <FaBookmark className="mr-2" />{" "}
      {isBookmarked ? REMOVE_BOOKMARK : ADD_BOOKMARK}
    </button>
  );
}
