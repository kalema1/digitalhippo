import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

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
  async function handleDeleteProperty(propertyId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Property"
    );
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        //remove property from state/screen
        const updatedProperties = properties.filter(
          (property) => property._id !== propertyId
        );

        setProperties(updatedProperties);

        toast.success("Property SuccessFully Deleted");
      } else {
        toast.error("Failed to Delete Property");
      }
    } catch (error) {
      console.log(error);
    }
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
