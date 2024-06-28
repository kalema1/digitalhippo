import { useState } from "react";

export function usePropertyContantForm() {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [message, SetMessage] = useState("");
  const [phone, SetPhone] = useState("");
  const [wasSubmitted, SetWasSubmitted] = useState(false);

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
  };
}
