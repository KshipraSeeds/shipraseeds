"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function TopNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname(); 

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const linkClass = (path: string) => 
    pathname === path 
      ? "text-black font-semibold" 
      : "text-black/70 hover:text-black";

  return (
    <div className={`absolute top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <nav className="w-full flex justify-center items-start pt-12">
        <div className="w-[95%] max-w-7xl bg-white rounded-full shadow-md flex justify-between items-center px-8 py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold italic">
            <h1 className="text-3xl font-black text-green-700 gothic-font">Shipra Seeds</h1>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 text-base font-medium">
            <Link href="/" className={linkClass("/")}>मुख पृष्ठ</Link>
            <Link href="/about" className={linkClass("/about")}> हमारे बारे में</Link>
            <Link href="/products" className={linkClass("/products")}>उत्पाद</Link>
            <Link href="/contact" className={linkClass("/contact")}>संपर्क</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="absolute top-32 w-[95%] max-w-7xl bg-white rounded-xl shadow-lg p-6 flex flex-col space-y-4 text-center font-medium">
            <Link href="/" onClick={closeMenu} className={linkClass("/")}>मुख पृष्ठ</Link>
            <Link href="/about" onClick={closeMenu} className={linkClass("/about")}>हमारे बारे में</Link>
            <Link href="/products" onClick={closeMenu} className={linkClass("/products")}>उत्पाद</Link>
            <Link href="/contact" onClick={closeMenu} className={linkClass("/contact")}>संपर्क</Link>
          </div>
        )}
      </nav>
    </div>
  );
} 