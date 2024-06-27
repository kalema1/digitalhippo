import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function useBookmarkButton(property) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    async function checkBookmarkStatus() {
      if (!userId) {
        return;
      }
      try {
        const response = await fetch("/api/bookmarks/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ propertyId: property._id }),
        });

        if (response.status === 200) {
          const data = await response.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.log(error);
      }
    }
    checkBookmarkStatus();
  }, [property._id, userId]);

  /*
   * handles the click event on the bookmark button
   */
  async function handleClick() {
    if (!userId) {
      toast.error("You need to Sign in to Bookmark  a Property");
      return;
    }

    try {
      const response = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId: property._id }),
      });

      if (response.status === 200) {
        const data = await response.json();
        toast.success(data.message);
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  return { handleClick, isBookmarked };
}
