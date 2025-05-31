"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { FaLanguage } from "react-icons/fa6";
import { useLanguage } from "../context/LanguageContext";

export default function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false); // This state will now primarily control desktop dropdown
  const [selectedLanguage, setSelectedLanguage] = useState("Hindi"); // Default language
  const pathname = usePathname();

  // Translations object
  // const translations: { [key: string]: { [key: string]: string } } = {
  //   Hindi: {
  //     home: "मुख पृष्ठ",
  //     about: "हमारे बारे में",
  //     products: "उत्पाद",
  //     registration: "किसान पंजीकरण",
  //     retailers: "रिटेलर कॉर्नर",
  //     changeLanguage: "भाषा बदलें",
  //     selectLanguage: "भाषा चुनें:",
  //     hindiShort: "हिं",
  //     englishShort: "En",
  //     punjabiShort: "पं",
  //     shipraSeeds: "Shipra Seeds",
  //   },
  //   English: {
  //     home: "Home",
  //     about: "About Us",
  //     products: "Products",
  //     registration: "Farmer Registration",
  //     retailers: "Retailer Corner",
  //     changeLanguage: "Change Language",
  //     selectLanguage: "Select Language:",
  //     hindiShort: "Hin",
  //     englishShort: "En",
  //     punjabiShort: "Pun",
  //     shipraSeeds: "Shipra Seeds",
  //   },
  //   Punjabi: {
  //     home: "ਮੁੱਖ ਪੰਨਾ",
  //     about: "ਸਾਡੇ ਬਾਰੇ",
  //     products: "ਉਤਪਾਦ",
  //     registration: "ਕਿਸਾਨ ਰਜਿਸਟ੍ਰੇਸ਼ਨ",
  //     retailers: "ਪ੍ਰਚੂਨ ਵਿਕਰੇਤਾ ਕਾਰਨਰ",
  //     changeLanguage: "ਭਾਸ਼ਾ ਬਦਲੋ",
  //     selectLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ:",
  //     hindiShort: "ਹਿੰ",
  //     englishShort: "En",
  //     punjabiShort: "ਪੰ",
  //     shipraSeeds: "Shipra Seeds",
  //   },
  // };

  // const t = (key: string) =>
  //   translations[selectedLanguage]?.[key] || key; // Fallback to key if translation not found

  const { t, setLang } = useLanguage();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const toggleLanguageDropdown = () =>
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  const closeLanguageDropdown = () => setIsLanguageDropdownOpen(false);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    // In a real application, you'd trigger your i18n library here
    // e.g., router.push(pathname, { locale: newLocale });
    closeLanguageDropdown(); // Close desktop dropdown
    closeMenu(); // Close mobile menu if open (important for mobile language change)
  };

  // Effect for hiding/showing navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavHidden(true);
        if (isMenuOpen) closeMenu();
        if (isLanguageDropdownOpen) closeLanguageDropdown(); // Close desktop dropdown on scroll down
      } else if (currentScrollY < lastScrollY) {
        setIsNavHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMenuOpen, isLanguageDropdownOpen]);

  // Effect for closing mobile menu & desktop dropdown on screen resize (to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        if (isMenuOpen) closeMenu();
        if (isLanguageDropdownOpen) closeLanguageDropdown();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, isLanguageDropdownOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const linkClass = (path: string) =>
    pathname === path
      ? "text-green-600 font-semibold"
      : "text-gray-700 hover:text-green-600";

  const mobileLinkClass = (path: string) =>
    pathname === path
      ? "text-green-500 font-bold text-2xl py-3"
      : "text-gray-800 hover:text-green-500 text-2xl py-3";

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
          <div className="w-[90%] max-w-6xl bg-white backdrop-blur-md rounded-full shadow-lg flex justify-between items-center px-6 py-3 md:px-8 md:py-3.5">
            {/* Logo (Desktop) */}
            <Link
              href="/"
              className="text-2xl font-bold italic"
              onClick={closeMenu}
            >
              <h1 className="text-3xl font-black text-green-700 gothic-font group-hover:text-green-800 transition-colors">
                {t("shipraSeeds")}
              </h1>
            </Link>
            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8 text-base font-medium items-center">
              <Link href="/" className={linkClass("/")}>
                {t("home")}
              </Link>
              <Link href="/about" className={linkClass("/about")}>
                {t("about")}
              </Link>
              <Link href="/products" className={linkClass("/products")}>
                {t("products")}
              </Link>
              <Link href="/registration" className={linkClass("/registration")}>
                {t("registration")}
              </Link>
              <Link href="/retailers" className={linkClass("/retailers")}>
                {t("retailers")}
              </Link>

              {/* Language Switcher for Desktop (only visible on md and larger) */}
              <div className="relative group">
                <button
                  onClick={toggleLanguageDropdown}
                  className="flex items-center bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800 font-semibold px-4 py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <FaLanguage className="h-5 w-5 mr-2" />
                  <span className="text-sm">{selectedLanguage}</span>{" "}
                  <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                {/* Tooltip for desktop */}
                {/* <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                  {t("changeLanguage")}
                </div> */}
                {isLanguageDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl py-2 overflow-hidden border border-gray-100 z-50 animate-fade-in-down"
                    onMouseLeave={closeLanguageDropdown}
                  >
                    <button
                      onClick={() => {setLang("hi");handleLanguageChange("Hindi")}}
                      className="block w-full text-left px-5 py-2 text-base text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                    >
                      हिन्दी
                    </button>
                    <button
                      onClick={() => {setLang("en");handleLanguageChange("English")}}
                      className="block w-full text-left px-5 py-2 text-base text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                    >
                      English
                    </button>
                    <button
                      onClick={() => {setLang("pa");handleLanguageChange("Punjabi")}}
                      className="block w-full text-left px-5 py-2 text-base text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                    >
                      ਪੰਜਾਬੀ
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Mobile Menu Button (Hamburger) - now the only element in this mobile section */}
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
            {t("home")}
          </Link>
          <Link
            href="/about"
            onClick={closeMenu}
            className={mobileLinkClass("/about")}
          >
            {t("about")}
          </Link>
          <Link
            href="/products"
            onClick={closeMenu}
            className={mobileLinkClass("/products")}
          >
            {t("products")}
          </Link>
          <Link
            href="/registration"
            onClick={closeMenu}
            className={mobileLinkClass("/registration")}
          >
            {t("registration")}
          </Link>
          <Link
            href="/retailers"
            onClick={closeMenu}
            className={mobileLinkClass("/retailers")}
          >
            {t("retailers")}
          </Link>

          {/* Shipra Seeds Logo within the mobile menu, above language selector */}
          <div className="mt-8 mb-6 pt-6 border-t border-gray-200 w-full text-center">
            <Link href="/" onClick={closeMenu}>
              <h2 className="text-3xl font-black text-green-700 gothic-font">
                {t("shipraSeeds")}
              </h2>
            </Link>
          </div>

          {/* Language Switcher for Mobile Menu - Compacted design */}
          <div className="relative mb-6 w-full flex flex-col items-center">
            {" "}
            {/* Adjusted margins */}
            {/* Reduced size and style for "भाषा चुनें" */}
            <p className="text-gray-600 text-base font-semibold mb-2">
              {t("selectLanguage")}
            </p>
            <div className="flex space-x-2">
              {" "}
              {/* Reduced space between buttons */}
              <button
                onClick={() => {setLang("hi");handleLanguageChange("Hindi")}}
                className={`flex items-center justify-center w-12 h-12 rounded-full text-base font-semibold transition-all duration-300
                  ${
                    selectedLanguage === "Hindi"
                      ? "bg-green-600 text-white shadow-lg transform hover:scale-110"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-md"
                  }`}
              >
                {t("hindiShort")}
              </button>
              <button
                onClick={() => {setLang("en");handleLanguageChange("English")}}
                className={`flex items-center justify-center w-12 h-12 rounded-full text-base font-semibold transition-all duration-300
                  ${
                    selectedLanguage === "English"
                      ? "bg-green-600 text-white shadow-lg transform hover:scale-110"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-md"
                  }`}
              >
                {t("englishShort")}
              </button>
              <button
                onClick={() =>{setLang("pa");handleLanguageChange("Punjabi")}}
                className={`flex items-center justify-center w-12 h-12 rounded-full text-base font-semibold transition-all duration-300
                  ${
                    selectedLanguage === "Punjabi"
                      ? "bg-green-600 text-white shadow-lg transform hover:scale-110"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-md"
                  }`}
              >
                {t("punjabiShort")}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}