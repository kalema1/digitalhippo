import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchProperty } from "@/services/apiProperties";

export function usePropertyEditForm() {
  const { propertyId } = useParams();
  const router = useRouter;
  const [isLoading, setIsLoading] = useState(true);
  const [fields, setFields] = useState({
    type: "",
    name: "",
    description: "",
    location: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
    },
    beds: "",
    baths: "",
    square_feet: "",
    amenities: [],
    rates: {
      weekly: "",
      monthly: "",
      nightly: "",
    },
    seller_info: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    // fetch property data for the form
    const fetchPropertyData = async () => {
      try {
        const propertyData = await fetchProperty(propertyId);

        // check rates fields for null then make them empty strings
        if (propertyData && propertyData.rates) {
          const defaultRates = { ...propertyData.rates };

          for (const rate in defaultRates) {
            if (defaultRates[rate] == null) {
              defaultRates[rate] = "";
            }
          }

          propertyData.rates = defaultRates;
        }

        setFields(propertyData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPropertyData();
  }, [propertyId]);

  function handleChange(event) {
    const { name, value } = event.target;

    // check if nested property
    if (name.includes(".")) {
      const [outerKey, innerKey] = name.split(".");

      setFields((previousFields) => ({
        ...previousFields,
        [outerKey]: {
          ...previousFields[outerKey],
          [innerKey]: value,
        },
      }));
    } else {
      setFields((previousfields) => ({
        ...previousfields,
        [name]: value,
      }));
    }
  }

  function handleAmenitiesChange(event) {
    const { value, checked } = event.target;

    //clone the current array
    const updatedAmenities = [...fields.amenities];

    //check if the field is checked
    if (checked) {
      //add value to the array
      updatedAmenities.push(value);
    } else {
      //remove the value from array
      const index = updatedAmenities.indexOf(value);

      if (index !== -1) {
        updatedAmenities.splice(index, 1);
      }
    }

    //update state with udated array
    setFields((previousFields) => ({
      ...previousFields,
      amenities: updatedAmenities,
    }));
  }

  return {
    handleAmenitiesChange,
    handleChange,
    fields,
    isLoading,
  };
}
