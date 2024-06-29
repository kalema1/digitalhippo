import { useState } from "react";
import { toast } from "react-toastify";

export function usePropertyContantForm(property) {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [message, SetMessage] = useState("");
  const [phone, SetPhone] = useState("");
  const [wasSubmitted, SetWasSubmitted] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      name,
      email,
      message,
      phone,
      recipient: property.owner,
      property: property._id,
    };

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 400) {
        toast.error("You can not send to a message to yourself");
        return;
      }

      if (response.status === 401) {
        toast.error("You must be logged in to send a message");
        return;
      }

      if (response.status !== 200) {
        toast.error("Error sending form");
        return;
      }

      toast.success("Message Sent Successfully");
      SetWasSubmitted(true);
    } catch (error) {
      console.log(error);
      toast.error("Error sending form");
    } finally {
      SetName("");
      SetEmail("");
      SetPhone("");
      SetMessage("");
    }
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
