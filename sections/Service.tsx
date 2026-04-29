"use client";
import { motion } from "framer-motion";
import { services } from "../constants";
import { FiArrowRight, FiStar, FiCloud } from "react-icons/fi";
import * as Icons from "react-icons/fi";
import type { IconType } from "react-icons";
import Link from "next/link";
import { formatServiceUrl } from "../lib/utils";

const getIconComponent = (iconKey: string): IconType => {
  return (Icons[iconKey as keyof typeof Icons] as IconType) || FiCloud;
};

const Service = () => {
  return (
    <section
      id="services"
      className="relative py-24 bg-gray-50 text-gray-900 overflow-hidden"
    >
      <div className="relative container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block bg-gray-100 text-gray-900 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-sm"
          >
            ⚡ Our Expertise
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#2b3991]">
            Services We{" "}
            <span className="text-gray-700">
              Offer
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your ideas into powerful digital solutions with our comprehensive suite of cutting-edge services
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.slice(0, 6).map((service, index) => {
            const Icon = getIconComponent(service.icon);
            return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#2b3991] hover:shadow-xl transition-all duration-500 cursor-pointer"
            >
              {/* Service Icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-[#2b3991] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#2b3991] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FiStar className="w-3 h-3 text-white" />
                </div>
              </div>

              {/* Service Content */}
              <h3 className="text-xl font-bold text-[#2b3991] mb-4 group-hover:text-[#1f2a6b] transition-all duration-300">
                {service.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Learn More Button */}
              <Link
                href={`/services/${formatServiceUrl(service.title)}`}
                className="flex items-center text-[#2b3991] group-hover:text-[#1f2a6b] transition-colors duration-300 cursor-pointer"
              >
                <span className="font-medium">Learn More</span>
                <FiArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
              </Link>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gray-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </motion.div>
            );
          })}
        </div>

        {/* Floating Services Animation */}
        <div className="relative h-32 mb-16 overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
            className="flex gap-8 absolute top-1/2 transform -translate-y-1/2"
          >
            {[...services, ...services].map((service, index) => {
              const Icon = getIconComponent(service.icon);
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-6 py-3 whitespace-nowrap shadow-sm"
                >
                  <Icon className="w-5 h-5 text-[#2b3991]" />
                  <span className="text-[#2b3991] font-medium">{service.title}</span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white rounded-3xl p-12 border border-gray-200 shadow-lg">
            <h3 className="text-3xl font-bold text-[#2b3991] mb-6">
              Ready to Transform Your Business?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create something amazing together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services"
                className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                View All Services
                <FiArrowRight className="w-5 h-5" />
              </Link>
              <button
                onClick={() => {
                  const section = document.getElementById("contact");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="border-2 border-gray-300 hover:border-[#2b3991] text-[#2b3991] hover:bg-gray-50 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
              >
                Start Your Project
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Service;
