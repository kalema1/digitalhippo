"use client";

import Loader from "@/ui/Loader";
import { usePropertiesSearchResults } from "./usePropertiesSearchResults";
import PropertyCard from "../propertyCard/PropertyCard";
import BackButton from "@/ui/BackButton";

export default function PropertiesSearchResults() {
  const { properties, isLoading } = usePropertiesSearchResults();

  if (isLoading) {
    return <Loader loading={isLoading} />;
  }
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <BackButton />
        <h1 className="text-2xl mb-4">Search Results</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.length === 0 && <div>No Search Results Found</div>}
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
