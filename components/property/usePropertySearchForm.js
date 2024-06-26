import { useRouter } from "next/navigation";
import { useState } from "react";

export function usePropertySearchForm() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("All");

  const router = useRouter();

  /*
   * handles the form submission
   * params {event} - submit event on the form
   */
  function handleSubmit(event) {
    event.preventDefault();

    if (location === "" && propertyType === "All") {
      router.push("/properties");
      return;
    }

    const query = `?location=${location}&propertyType=${propertyType}`;

    router.push(`/properties/search-results${query}`);
  }

  return {
    location,
    propertyType,
    setLocation,
    setPropertyType,
    handleSubmit,
  };
}
