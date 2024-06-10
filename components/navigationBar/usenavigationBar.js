import { useState } from "react";

export default function useNavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

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

  return {
    isMobileMenuOpen,
    toggleMobileMenu,
    isProfileMenuOpen,
    toggleProfileMenu,
  };
}
