import { useState } from "react";

export function usePropertyEditForm() {
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
  };
}
