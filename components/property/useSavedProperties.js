import { FAILED_TO_FETCH_SAVED_PROPERTIES } from "@/constants/constants";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function useSavedProperties() {
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function fetchSavedProperties() {
      try {
        const response = await fetch("/api/bookmarks");

        if (response.status !== 200) {
          console.log(response.statusText);
          toast.error(FAILED_TO_FETCH_SAVED_PROPERTIES);
          return;
        }

        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.log(error);
        toast.error(FAILED_TO_FETCH_SAVED_PROPERTIES);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSavedProperties();
  }, []);

  return { isLoading, properties };
}
