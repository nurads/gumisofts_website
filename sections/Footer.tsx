"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaInstagram,
  FaTelegramPlane,
  FaLinkedin,
  FaWhatsapp,
  FaTwitter,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="shadow-2xl text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* GumiSofts Logo and Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h1 className="text-2xl font-bold text-[#000000]">GUMISOFTS</h1>
          <div className="flex space-x-4 mt-6">
            <Link href="https://instagram.com" target="_blank">
              <FaInstagram className="text-[#000000] text-2xl hover:opacity-80 transition" />
            </Link>
            <Link href="https://t.me" target="_blank">
              <FaTelegramPlane className="text-[#000000] text-2xl hover:opacity-80 transition" />
            </Link>
            <Link href="https://linkedin.com" target="_blank">
              <FaLinkedin className="text-[#000000] text-2xl hover:opacity-80 transition" />
            </Link>
            <Link href="https://wa.me" target="_blank">
              <FaWhatsapp className="text-[#000000] text-2xl hover:opacity-80 transition" />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <FaTwitter className="text-[#000000] text-2xl hover:opacity-80 transition" />
            </Link>
          </div>
        </motion.div>

        {/* Navigation Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-semibold mb-4 text-[#000000]">
            Useful Links
          </h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="#hero"
                className="text-[#416374] cursor-pointer"
                onClick={(e) => handleScroll(e, "#hero")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-[#416374]">
                About
              </Link>
            </li>
            <li>
              <a
                href="#work"
                className="text-[#416374] cursor-pointer"
                onClick={(e) => handleScroll(e, "#work")}
              >
                Work
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="text-[#416374] cursor-pointer"
                onClick={(e) => handleScroll(e, "#services")}
              >
                Services
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-semibold mb-4 text-[#000000]">Contact</h2>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <MdEmail className="text-[#023047] text-lg" />
              <Link
                href="mailto:contact@gumisofts.com"
                className="text-[#416374]"
              >
                contact@gumisofts.com
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <FaPhone className="text-[#023047] text-lg" />
              <Link href="tel:+251933162443" className="text-[#416374]">
                +251933162443
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-[#023047] text-lg" />
              <span className="text-[#416374]">Adama, Ethiopia</span>
            </li>
          </ul>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-semibold mb-4 text-[#000000]">
            Join our Newsletter
          </h2>
          <div className="relative w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full text-white px-4 py-2 rounded-full border border-[#C7B7EB] focus:outline-none"
            />
            <button className="text-[14px] absolute right-1 top-1 bottom-1 bg-[#ADBBF9] text-[#000000] px-4 rounded-full hover:bg-[#8a96c7] transition">
              Submit
            </button>
          </div>
        </motion.div>
      </div>
      <hr className="text-[#EEEEEE] mt-6" />
      {/* Copyright Section */}
      <div className="text-center text-[#416374] mt-8 text-sm font-semibold">
        © {new Date().getFullYear()} GUMISOFTS. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
