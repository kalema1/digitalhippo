import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function usePropertiesSearchResults() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();

  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");
}
