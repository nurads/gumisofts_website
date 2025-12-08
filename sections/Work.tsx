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
      className="relative py-24 bg-gray-50 text-gray-900 overflow-hidden"
    >
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
            className="inline-block bg-gray-100 text-gray-900 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-sm"
          >
            🚀 Our Recent Work
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#2b3991]">
            Success{" "}
            <span className="text-gray-700">
              Stories
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
                <div className="text-3xl md:text-4xl font-bold text-[#2b3991] mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
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
          <div className="bg-white rounded-3xl p-12 border border-gray-200 shadow-lg">
            <h3 className="text-3xl font-bold text-[#2b3991] mb-6">
              Ready to Create Your Success Story?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
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
                className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                Start Your Project
                <FiArrowRight className="w-5 h-5" />
              </button>
              <Link
                href="/services"
                className="border-2 border-gray-300 hover:border-[#2b3991] text-[#2b3991] hover:bg-gray-50 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2"
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
