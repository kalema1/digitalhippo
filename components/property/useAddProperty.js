import { useState } from "react";

export function useAddProperty() {
  const [fields, setFields] = useState({
    type: "Apartment",
    name: "Test Property",
    description: "",
    location: {
      street: "",
      city: "Test City",
      state: "Test State",
      zipcode: "",
    },
    beds: 3,
    baths: 2,
    square_feet: 1800,
    amenities: [],
    rates: {
      weekly: "",
      monthly: 2000,
      nightly: "",
    },
    seller_info: {
      name: "",
      email: "teste@test.com",
      phone: "",
    },
    images: [],
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

  function handleImageChange(event) {
    const { files } = event.target;

    //clone the images array
    const updatedImages = [fields.images];

    //add new files to the array
    for (const file of files) {
      updatedImages.push(file);
    }

    //pudate state with array of images
    setFields((previousFields) => ({
      ...previousFields,
      images: updatedImages,
    }));
  }

  return {
    handleAmenitiesChange,
    handleChange,
    handleImageChange,
    fields,
  };
}
