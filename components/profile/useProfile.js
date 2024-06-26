import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export function useProfile() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();

  const profileImage = session?.user?.image;
  const ProfileEmail = session?.user?.email;
  const ProfileName = session?.user?.name;

  useEffect(() => {
    const fetchUserProperties = async (userId) => {
      if (!userId) {
        return;
      }

      try {
        const response = await fetch(`/api/properties/user/${userId}`);

        if (response.status === 200) {
          const data = await response.json();
          setProperties(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchUserProperties(session?.user?.id);
    }
  }, [session]);

  /*
   * deletes property
   */
  function handleDeleteProperty(propertyId) {
    console.log(propertyId);
  }

  return {
    profileImage,
    ProfileEmail,
    ProfileName,
    isLoading,
    properties,
    handleDeleteProperty,
  };
}
