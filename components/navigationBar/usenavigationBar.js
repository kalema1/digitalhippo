import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

export default function useNavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [providers, setProviders] = useState(null);

  const { data: session } = useSession();

  const pathname = usePathname();

  /*
   * toggles mobile menu
   */
  function toggleMobileMenu() {
    setIsMobileMenuOpen((isOpen) => !isOpen);
  }

  /*
   * toggles profile menu
   */
  function toggleProfileMenu() {
    setIsProfileMenuOpen((isOpen) => !isOpen);
  }

  useEffect(() => {
    async function setAuthProviders() {
      const response = await getProviders();

      setProviders(response);
    }
    setAuthProviders();
  }, []);

  return {
    isMobileMenuOpen,
    toggleMobileMenu,
    isProfileMenuOpen,
    toggleProfileMenu,
    pathname,
    session,
    providers,
    signIn,
  };
}
