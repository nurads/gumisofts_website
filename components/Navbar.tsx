"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { navLinks } from "../constants";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavItems = ({ closeMenu }: { closeMenu?: () => void }) => {
  const router = useRouter();

  const handleClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    href: string
  ) => {
    event.preventDefault();

    if (href.startsWith("#")) {
      const section = document.getElementById(href.substring(1));
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(href);
    }

    if (closeMenu) closeMenu();
  };

  return (
    <ul className="flex flex-col sm:flex-row items-center gap-6 md:gap-12 lg:gap-16">
      {navLinks.map(({ id, name, href }) => (
        <li
          key={id}
          className="text-gray-900 font-medium hover:text-blue-600 transition-colors duration-200"
        >
          <Link
            href={href}
            className="text-lg md:text-base px-3 py-2 cursor-pointer"
            onClick={(e) => handleClick(e, href)}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById("hero")?.offsetHeight || 0;
      setIsScrolled(window.scrollY > heroHeight);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`w-full transition-all duration-300 ${
        isScrolled
          ? "fixed top-0 left-0 right-0 bg-white shadow-md z-50"
          : "absolute top-0 left-0 right-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10 py-4 flex items-center justify-between md:justify-start">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-900">
          GUMISOFTS
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex ml-auto">
          <NavItems />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-gray-900 text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && <div className="fixed inset-0 bg-opacity-50 z-40"></div>}

      {/* Mobile Menu with Animation */}
      <motion.div
        ref={menuRef}
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg sm:hidden flex flex-col items-center pt-16 z-50"
      >
        <NavItems closeMenu={() => setIsOpen(false)} />
      </motion.div>
    </header>
  );
};

export default Navbar;
