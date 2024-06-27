"use client";

import Loader from "@/ui/Loader";
import { useSavedProperties } from "./useSavedProperties";
import PropertyCard from "../propertyCard/PropertyCard";

export default function SavedProperties() {
  const { isLoading, properties } = useSavedProperties();

  if (isLoading) {
    return <Loader loading={isLoading} />;
  }

  return (
    <section className="px-4 py-6">
      <h1 className="text-2xl.mb-4">Save Properties</h1>
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.length === 0 && <div>No Saved Property found</div>}
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
