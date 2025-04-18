"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function TopNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); 

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const linkClass = (path: string) => 
    pathname === path 
      ? "text-black font-semibold" 
      : "hover:text-black/70";

  return (
    <nav className="w-full flex justify-center items-start pt-12 sticky top-0 z-50">
      <div className="w-[95%] max-w-7xl bg-white rounded-full shadow-md flex justify-between items-center px-8 py-4">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold italic">
          <h1 className="text-3xl font-black text-green-700 gothic-font">Shipra Seeds</h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-base font-medium">
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/about" className={linkClass("/about")}>About</Link>
          <Link href="/projects" className={linkClass("/projects")}>Products</Link>
          <Link href="/contact" className={linkClass("/contact")}>Contact</Link>
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
        <div className="absolute top-32 w-[95%] max-w-7xl bg-white rounded-xl shadow-lg p-6 animate-slide-down flex flex-col space-y-4 text-center font-medium">
          <Link href="/" onClick={closeMenu} className={linkClass("/")}>Home</Link>
          <Link href="/about" onClick={closeMenu} className={linkClass("/about")}>About</Link>
          <Link href="/projects" onClick={closeMenu} className={linkClass("/projects")}>Products</Link>
          <Link href="/contact" onClick={closeMenu} className={linkClass("/contact")}>Contact</Link>
        </div>
      )}
    </nav>
  );
}
