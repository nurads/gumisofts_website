"use client";
import { motion } from "framer-motion";
import { FiArrowRight, FiPlay, FiCode, FiUsers, FiAward, FiTrendingUp } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CompanyStats } from "@/types/api";
import { getCompanyStats } from "@/services/company";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/Loader";

export default function Hero() {
  const queryClient = useQueryClient();
  const smoothScroll = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };
  const { data: companyStats, isLoading: isCompanyStatsLoading, isError: isCompanyStatsError } = useQuery({
    queryKey: ["company-stats"],
    queryFn: getCompanyStats,

  });


  const stats = [
    { icon: FiUsers, value: companyStats?.numberOfHappyClients, label: "Happy Clients" },
    { icon: FiCode, value: companyStats?.numberOfProjectsCompleted, label: "Projects Delivered" },
    { icon: FiAward, value: companyStats?.numberOfYearsInBusiness, label: "Years Experience" },
    { icon: FiTrendingUp, value: companyStats?.clientSatisficationRate, label: "Success Rate" }
  ];

  const technologies = [
    "React", "Next.js", "Node.js", "TypeScript", "Python", "AWS", "Docker", "MongoDB"
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-white text-gray-900 overflow-hidden"
    >
      <div className="relative container mx-auto px-6 py-16 md:py-24">
        <div className="flex items-center justify-center min-h-[80vh]">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-12 md:space-y-16 max-w-4xl w-full"
          >
            <div className="space-y-8 md:space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block bg-gray-100 text-gray-900 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
              >
                🚀 Leading Software Development Company
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold leading-tight text-[#2b3991] mb-4"
              >
                Beyond <span className="text-gray-700">Software</span>
                <br />
                We Build{" "}
                <span className="text-gray-800">Success</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto mt-6"
              >
                We build smart, scalable software solutions that transform ideas into powerful digital experiences and drive unprecedented business growth.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            >
              <button
                onClick={() => smoothScroll("contact")}
                className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
              >
                Get Started Today
                <FiArrowRight className="w-5 h-5" />
              </button>

              <Link
                href="/services"
                className="border-2 border-gray-300 hover:border-[#2b3991] text-[#2b3991] hover:bg-gray-50 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FiPlay className="w-5 h-5" />
                View Our Work
              </Link>
            </motion.div>

            {/* Stats */}
            {companyStats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-12 md:pt-16"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <stat.icon className="w-5 h-5 text-[#2b3991]" />
                      <div className="text-2xl font-bold text-[#2b3991]">{stat.value}</div>
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 3 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400 text-center cursor-pointer"
            onClick={() => smoothScroll("services")}
          >
            <div className="text-sm mb-2">Scroll to explore</div>
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full mx-auto flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-gray-400 rounded-full mt-2"
              ></motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
