"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/services/apiProperties";
import PropertyImageHeader from "@/components/propertyImageHeader/PropertyImageHeader";
import Loader from "@/ui/Loader";

export default function PropertyDetails() {
  const { propertyId } = useParams();

  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPropertyData() {
      if (!propertyId) {
        return;
      }

      try {
        const propertyDetails = await fetchProperty(propertyId);

        setProperty(propertyDetails);
      } catch (error) {
        console.error("Error Fetching Property:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (property === null) {
      getPropertyData();
    }
  }, [propertyId, property]);

  if (!property && !isLoading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && property && (
        <>
          <PropertyImageHeader image={property.images[0]} />
        </>
      )}
    </>
  );
}
