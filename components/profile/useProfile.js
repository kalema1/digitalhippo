import { useSession } from "next-auth/react";

export function useProfile() {
  const { data: session } = useSession();

  const profileImage = session?.user?.image;
  const ProfileEmail = session?.user?.email;
  const ProfileName = session?.user?.name;

  return { profileImage, ProfileEmail, ProfileName };
}
