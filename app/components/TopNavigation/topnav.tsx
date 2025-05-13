"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Renamed for clarity
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Effect for hiding/showing navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsNavHidden(true);
        if (isMenuOpen) closeMenu(); // Close mobile menu if scrolling down
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsNavHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMenuOpen]); // Added isMenuOpen to dependencies

  // Effect for closing mobile menu on screen resize (to desktop)
  useEffect(() => {
    const handleResize = () => {
      // Tailwind's 'md' breakpoint is typically 768px
      if (window.innerWidth >= 768 && isMenuOpen) {
        closeMenu();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]); // Depend on isMenuOpen

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset"; // Cleanup on component unmount
    };
  }, [isMenuOpen]);

  const linkClass = (path: string) =>
    pathname === path
      ? "text-green-600 font-semibold" // Active link color (more vibrant)
      : "text-gray-700 hover:text-green-600"; // Default and hover for links

  const mobileLinkClass = (path: string) =>
    pathname === path
      ? "text-green-500 font-bold text-2xl py-3" // Active mobile link
      : "text-gray-800 hover:text-green-500 text-2xl py-3"; // Default mobile link

  return (
    <>
      {/* Main Navigation Bar */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] 
                    ${
                      isNavHidden && !isMenuOpen
                        ? "-translate-y-full"
                        : "translate-y-0"
                    }`}
      >
        <nav className="w-full flex justify-center items-start pt-10 pb-6 md:pt-8 md:pb-4">
          {" "}
          {/* Adjusted padding */}
          <div className="w-[90%] max-w-6xl bg-white backdrop-blur-md rounded-full shadow-lg flex justify-between items-center px-6 py-3 md:px-8 md:py-3.5">
            {" "}
            {/* Slightly reduced max-width & padding for a sleeker look */}
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-bold italic"
              onClick={closeMenu}
            >
              <h1 className="text-3xl font-black text-green-700 gothic-font group-hover:text-green-800 transition-colors">
                Shipra Seeds
              </h1>
            </Link>
            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8 text-base font-medium items-center">
              <Link href="/" className={linkClass("/")}>
                मुख पृष्ठ
              </Link>
              <Link href="/about" className={linkClass("/about")}>
                हमारे बारे में
              </Link>
              <Link href="/products" className={linkClass("/products")}>
                उत्पाद
              </Link>
              <Link href="/registration" className={linkClass("/registration")}>
                किसान पंजीकरण
              </Link>
              <Link href="/retailers" className={linkClass("/retailers")}>
                रिटेलर कॉर्नर
              </Link>
            </div>
            {/* Mobile Menu Button (Hamburger) */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                aria-label="Open menu"
                className="text-gray-700 hover:text-green-700 p-2"
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Full-screen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white p-6 pt-8 
                    transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] z-[60] 
                    flex flex-col items-center justify-center
                    ${
                      isMenuOpen
                        ? "opacity-100 translate-y-0 visible"
                        : "opacity-0 -translate-y-full invisible pointer-events-none"
                    }`}
      >
        {/* Close Button for Full-screen Menu */}
        <button
          onClick={toggleMenu}
          aria-label="Close menu"
          className="absolute top-8 right-6 text-gray-600 hover:text-green-600 p-2"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Navigation Links in Full-screen Menu */}
        <nav className="flex flex-col items-center space-y-6 text-center mt-8">
          <Link href="/" onClick={closeMenu} className={mobileLinkClass("/")}>
            मुख पृष्ठ
          </Link>
          <Link
            href="/about"
            onClick={closeMenu}
            className={mobileLinkClass("/about")}
          >
            हमारे बारे में
          </Link>
          <Link
            href="/products"
            onClick={closeMenu}
            className={mobileLinkClass("/products")}
          >
            उत्पाद
          </Link>
          <Link
            href="/registration"
            onClick={closeMenu}
            className={mobileLinkClass("/registration")}
          >
            किसान पंजीकरण
          </Link>
          <Link
            href="/retailers"
            onClick={closeMenu}
            className={mobileLinkClass("/retailers")}
          >
            रिटेलर कॉर्नर
          </Link>
        </nav>

        {/* Optional: Add logo or other elements at the bottom */}
        <div className="absolute bottom-10">
          <Link href="/" onClick={closeMenu}>
            <h2 className="text-2xl font-black text-green-700/70 gothic-font">
              Shipra Seeds
            </h2>
          </Link>
        </div>
      </div>
    </>
  );
}
