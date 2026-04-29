"use client";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiUsers,
  FiPackage,
  FiCode,
  FiAward,
  FiTrendingUp,
  FiCheck,
} from "react-icons/fi";
import Link from "next/link";
import { CompanyStats } from "@/types/api";
import { getCompanyStats } from "@/services/company";
import { useQuery } from "@tanstack/react-query";

export default function Hero() {
  const smoothScroll = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { data: companyStats } = useQuery<CompanyStats>({
    queryKey: ["company-stats"],
    queryFn: getCompanyStats,
  });

  const stats = [
    { icon: FiUsers, value: companyStats?.numberOfHappyClients, label: "Happy Clients" },
    { icon: FiCode, value: companyStats?.numberOfProjectsCompleted, label: "Projects Delivered" },
    { icon: FiAward, value: companyStats?.numberOfYearsInBusiness, label: "Years Experience" },
    { icon: FiTrendingUp, value: companyStats?.clientSatisficationRate, label: "Success Rate" },
  ];

  const featuredProducts = [
    {
      id: "bita-business",
      name: "Bita Business",
      tagline: "Inventory & sales management for growing businesses",
      icon: FiPackage,
      points: [
        "Real-time inventory tracking",
        "Sales & invoicing",
        "Purchases & suppliers",
        "Multi-store support",
        "Reports & insights",
        "Role-based team access",
      ],
      href: "/products#bita-business",
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-white text-gray-900 overflow-hidden pt-24 pb-12"
    >
      <div className="relative container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Headline & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-gray-100 text-[#2b3991] border border-gray-200 px-4 py-2 rounded-full text-sm font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-[#2b3991]" />
              Software products built for growing teams
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-[#2b3991]"
            >
              Products that <span className="text-gray-800">grow</span> your business
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl"
            >
              We build and ship Bita Business — an all-in-one inventory and sales management platform used by retailers and wholesalers to run their operations end to end. We also build custom software for ambitious companies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/products"
                className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-7 py-4 rounded-lg font-semibold text-base md:text-lg transition-colors duration-300 shadow-md flex items-center justify-center gap-2"
              >
                Explore Products
                <FiArrowRight className="w-5 h-5" />
              </Link>

              <button
                onClick={() => smoothScroll("services")}
                className="border-2 border-gray-300 hover:border-[#2b3991] text-[#2b3991] hover:bg-gray-50 px-7 py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-300"
              >
                Or Build Custom Software
              </button>
            </motion.div>

            {/* Stats */}
            {companyStats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-200"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <stat.icon className="w-4 h-4 text-[#2b3991]" />
                      <div className="text-2xl font-bold text-[#2b3991]">{stat.value}</div>
                    </div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Right: Featured product cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-5"
          >
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Our Flagship Product
            </div>

            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="group bg-white border border-gray-200 hover:border-[#2b3991] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-[#2b3991] rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <product.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-xl font-bold text-[#2b3991]">{product.name}</h3>
                      <Link
                        href={product.href}
                        className="text-[#2b3991] hover:text-[#1f2a6b] transition-colors"
                      >
                        <FiArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{product.tagline}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {product.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <FiCheck className="w-4 h-4 text-[#2b3991] flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-center pt-2"
            >
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#2b3991] hover:text-[#1f2a6b] transition-colors"
              >
                See all product details and pricing
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
