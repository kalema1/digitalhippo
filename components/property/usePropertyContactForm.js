import { useState } from "react";

export function usePropertyContantForm(property) {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [message, SetMessage] = useState("");
  const [phone, SetPhone] = useState("");
  const [wasSubmitted, SetWasSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      name,
      email,
      message,
      phone,
      recipient: property.owner,
      property: property._id,
    };
    console.log(data);
  }

  return {
    name,
    email,
    message,
    phone,
    wasSubmitted,
    SetName,
    SetEmail,
    SetMessage,
    SetPhone,
    SetWasSubmitted,
    handleSubmit,
  };
}
