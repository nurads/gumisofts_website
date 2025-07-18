"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { workProjects } from "../constants"; // Import the data
import Link from "next/link";
import { FiExternalLink, FiArrowRight, FiAward, FiUsers, FiTrendingUp } from "react-icons/fi";
import { getProjects } from "@/services/project";
import { useQuery } from "@tanstack/react-query";
import WorkCard from "@/components/WorkCard";
import { getCompanyInfo } from "@/services/company";


const Work = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const { data: projects, isLoading: isProjectsLoading, isError: isProjectsError } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const { data: companyInfo, isLoading: isCompanyInfoLoading, isError: isCompanyInfoError } = useQuery({
    queryKey: ["companyInfo"],
    queryFn: getCompanyInfo,
  });


  return (
    <section
      id="work"
      className="relative py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative container mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block bg-pink-600/20 text-pink-300 px-6 py-3 rounded-full text-sm font-medium mb-6"
          >
            🚀 Our Recent Work
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Success{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
              Stories
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover how we've transformed businesses and created digital experiences that drive real results
          </p>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
          >
            {[
              { number: `${companyInfo?.numberOfProjectsCompleted}+`, label: "Projects Completed" },
              { number: `${companyInfo?.numberOfHappyClients}+`, label: "Happy Clients" },
              { number: `${companyInfo?.yearsOfExprience}+`, label: "Years Experience" },
              { number: `${companyInfo?.clientSatisficationRate}%`, label: "Success Rate" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-16">
          {isProjectsLoading && <div>Loading...</div>}
          {isProjectsError && <div>Error loading projects</div>}
          {projects && projects.map((project, index) => (
            <WorkCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Create Your Success Story?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create something amazing together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const section = document.getElementById("contact");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
              >
                Start Your Project
                <FiArrowRight className="w-5 h-5" />
              </button>
              <Link
                href="/services"
                className="border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                View All Services
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Work;
