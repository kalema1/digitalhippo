import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function usePropertiesSearchResults() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();

  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  useEffect(() => {
    async function fetchSearchedProperties() {
      try {
        const response = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );

        if (response.status !== 200) {
          return;
        }

        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSearchedProperties();
  }, [location, propertyType]);

  return { properties, isLoading };
}
