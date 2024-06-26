import PropertyCard from "@/components/propertyCard/PropertyCard";
import { fetchProperties } from "@/services/apiProperties";
import SearchFormSection from "@/ui/SearchFormSection";

export default async function Properties() {
  const properties = await fetchProperties();

  return (
    <>
      <SearchFormSection />
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.length === 0 && <div>No Property found</div>}
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
