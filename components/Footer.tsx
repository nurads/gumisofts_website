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
    { icon: FaInstagram, href: companyInfo?.instagramUrl || "", color: "hover:text-pink-400" },
    { icon: FaTelegramPlane, href: companyInfo?.telegramUrl || "", color: "hover:text-blue-400" },
    { icon: FaLinkedin, href: companyInfo?.linkedinUrl || "", color: "hover:text-blue-500" },
    { icon: FaWhatsapp, href: companyInfo?.whatsappUrl || "", color: "hover:text-green-400" },
    { icon: FaFacebook, href: companyInfo?.facebookUrl || "", color: "hover:text-sky-400" },
  ];

  const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Work", href: "#work" },
    { name: "Blog", href: "/blog" },
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
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
      </div>

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
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center font-bold text-white text-xl">
                G
              </div>
              <h1 className="text-2xl font-bold text-white">GUMISOFTS</h1>
            </div>

            <p className="text-gray-300 leading-relaxed">
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
                    className={`w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white transition-all duration-300 ${social.color}`}
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
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
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
            <h3 className="text-xl font-bold text-white mb-6">Contact Info</h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-4 h-4 text-white" />
                  </div>
                  {info.href && info.href !== '#' ? (
                    <Link
                      href={info.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      {info.text}
                    </Link>
                  ) : (
                    <span className="text-gray-300">{info.text}</span>
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
            <h3 className="text-xl font-bold text-white mb-6">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for the latest updates and insights.
            </p>

            <form className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
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
          className="border-t border-white/10 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-300 text-sm">
              © {new Date().getFullYear()} GUMISOFTS. All rights reserved.
            </div>

            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-300 hover:text-white transition-colors duration-300">
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
