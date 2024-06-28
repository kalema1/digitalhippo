import { useState } from "react";

export function usePropertySearchForm() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("All");

  /*
   * handles the form submission
   * params {event} - submit event on the form
   */
  function handleSubmit(event) {
    event.preventDefault();
    console.log(location, propertyType);
  }

  return {
    location,
    propertyType,
    setLocation,
    setPropertyType,
    handleSubmit,
  };
}
