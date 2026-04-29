"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { navLinks } from "../constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    <ul className="flex flex-col lg:flex-row items-center gap-2 lg:gap-8">
      {navLinks.map(({ id, name, href }) => (
        <li key={id} className="relative group">
          <Link
            href={href}
            className="relative text-gray-700 hover:text-[#2b3991] font-medium text-lg lg:text-base px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 block"
            onClick={(e) => handleClick(e, href)}
          >
            {name}
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#2b3991] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
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
      setIsScrolled(window.scrollY > 50);
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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-white shadow-md border-b border-gray-200"
        : "bg-white/95 backdrop-blur-sm"
        }`}
    >
      <div className="container mx-auto px-6 py-2.5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image src="/assets/logo.png" alt="Gumisofts" width={44} height={44} />
              <span className="text-xl font-bold text-[#2b3991] group-hover:text-[#1f2a6b] transition-all duration-300">
                Gumisofts
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:flex"
          >
            <NavItems />
          </motion.nav>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="hidden lg:flex items-center gap-4"
          >
            <Link
              href="/#contact"
              className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#2b3991] text-2xl p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <motion.div
        ref={menuRef}
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl lg:hidden flex flex-col z-50 border-l border-gray-200"
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <Image src="/assets/logo.png" alt="Gumisofts" width={64} height={64} />
            <span className="text-xl font-bold text-[#2b3991]">
              Gumisofts
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-[#2b3991] p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <div className="flex-1 px-6 py-8 bg-gray-50">
          <NavItems closeMenu={() => setIsOpen(false)} />
        </div>

        {/* Mobile Menu Footer */}
        <div className="p-6 border-t border-gray-200 bg-white">
          <Link
            href="/#contact"
            className="w-full bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-center block"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              const section = document.getElementById("contact");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Get Started
          </Link>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;
