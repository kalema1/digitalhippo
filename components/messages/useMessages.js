import { useEffect, useState } from "react";

export function useMessages() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getMessages() {
      try {
        const response = await fetch("/api/messages");

        if (response.status !== 200) {
          return;
        }

        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getMessages();
  });

  return { isLoading, messages };
}
