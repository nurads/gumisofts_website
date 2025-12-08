"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaInstagram,
  FaTelegramPlane,
  FaLinkedin,
  FaWhatsapp,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiArrowRight, FiSend } from "react-icons/fi";
import { subscribeToNewsletter } from "@/services/general";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import { getCompanyInfo } from "@/services/company";

const Footer = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { mutate: subscribeToNewsletterMutation, isPending: isSubscribingToNewsletter } = useMutation({
    mutationFn: subscribeToNewsletter,
    onSuccess: () => {
      toast.success("Subscribed to newsletter successfully");
    },
  });

  const { data: companyInfo } = useQuery({
    queryKey: ["companyInfo"],
    queryFn: getCompanyInfo,
  });

  const socialLinks = [
    { icon: FaInstagram, href: companyInfo?.instagramUrl || "", color: "hover:text-gray-700" },
    { icon: FaTelegramPlane, href: companyInfo?.telegramUrl || "", color: "hover:text-gray-700" },
    { icon: FaLinkedin, href: companyInfo?.linkedinUrl || "", color: "hover:text-gray-700" },
    { icon: FaWhatsapp, href: companyInfo?.whatsappUrl || "", color: "hover:text-gray-700" },
    { icon: FaFacebook, href: companyInfo?.facebookUrl || "", color: "hover:text-gray-700" },
  ];

  const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Work", href: "#work" },
    { name: "Careers", href: "/careers" },
  ];

  const [email, setEmail] = useState("");

  const handleSubscribeToNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    subscribeToNewsletterMutation(email);
    setEmail("");
  };

  const contactInfo = [
    { icon: MdEmail, text: companyInfo?.email || "", href: "mailto:contact@gumisofts.com" },
    { icon: FaPhone, text: companyInfo?.phone || "", href: "tel:+251953541616" },
    { icon: FaMapMarkerAlt, text: companyInfo?.address || "", href: "#" },
  ];

  return (
    <footer className="relative bg-gray-100 text-gray-900 overflow-hidden">
      <div className="relative container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#2b3991] rounded-lg flex items-center justify-center font-bold text-white text-xl">
                G
              </div>
              <h1 className="text-2xl font-bold text-[#2b3991]">GUMISOFTS</h1>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Building innovative software solutions that transform businesses and create exceptional digital experiences.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    className={`w-10 h-10 bg-gray-200 hover:bg-[#2b3991] hover:text-white rounded-lg flex items-center justify-center text-gray-700 transition-all duration-300 ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-[#2b3991] mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-[#2b3991] transition-colors duration-300 flex items-center gap-2 group"
                    onClick={link.href.startsWith('#') ? (e) => handleScroll(e, link.href) : undefined}
                  >
                    <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-[#2b3991] mb-6">Contact Info</h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-[#2b3991] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-4 h-4 text-white" />
                  </div>
                  {info.href && info.href !== '#' ? (
                    <Link
                      href={info.href}
                      className="text-gray-600 hover:text-[#2b3991] transition-colors duration-300"
                    >
                      {info.text}
                    </Link>
                  ) : (
                    <span className="text-gray-600">{info.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-[#2b3991] mb-6">Stay Updated</h3>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for the latest updates and insights.
            </p>

            <form className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2b3991] focus:border-transparent transition-all duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full cursor-pointer bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                onClick={handleSubscribeToNewsletter}
              >
                {isSubscribingToNewsletter ? "Subscribing..." : "Subscribe"}
                <FiSend className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-300 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-sm">
              © {new Date().getFullYear()} GUMISOFTS. All rights reserved.
            </div>

            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-600 hover:text-[#2b3991] transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-[#2b3991] transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-600 hover:text-[#2b3991] transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
