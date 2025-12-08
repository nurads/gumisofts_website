"use client";
import { motion } from "framer-motion";
import { FiTarget, FiHeart, FiUsers, FiAward, FiTrendingUp, FiGlobe } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { getCompanyInfo } from "@/services/company";
import Link from "next/link";

const About = () => {
  const values = [
    {
      title: "Innovation",
      icon: FiTarget,
      description: "We embrace creativity and cutting-edge technology to push boundaries and deliver forward-thinking solutions.",
    },
    {
      title: "Quality",
      icon: FiAward,
      description: "We strive for excellence in every project, ensuring our software and services meet the highest standards.",
    },
    {
      title: "Collaboration",
      icon: FiUsers,
      description: "We believe in partnering closely with our clients and team to turn visions into reality through teamwork and trust.",
    },
  ];

  const { data: companyInfo } = useQuery({
    queryKey: ["companyInfo"],
    queryFn: getCompanyInfo,
  });

  const stats = [
    { icon: FiUsers, value: `${companyInfo?.numberOfEmployees}+`, label: "Team Members" },
    { icon: FiGlobe, value: `${companyInfo?.numberOfHappyClients}+`, label: "Happy Clients" },
    { icon: FiAward, value: `${companyInfo?.numberOfProjectsCompleted}+`, label: "Projects Delivered" },
    { icon: FiTrendingUp, value: `${companyInfo?.clientSatisficationRate}%`, label: "Client Satisfaction" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gray-50">
        <div className="relative container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-gray-100 text-gray-900 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-gray-200 shadow-sm"
            >
              🚀 Our Story
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 text-[#2b3991]"
            >
              About{" "}
              <span className="text-gray-700">
                Gumisofts
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl mb-12 text-gray-600 leading-relaxed"
            >
              Your partner in innovation, specializing in custom software, mobile app development, website creation, and next-level tech solutions for a connected world.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#2b3991] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-[#2b3991] mb-2">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="relative py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-3xl p-12 border border-gray-200 shadow-lg"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#2b3991] mb-8 text-center">
                Who{" "}
                <span className="text-gray-700">
                  We Are
                </span>
              </h2>

              <p className="text-xl text-gray-600 leading-relaxed text-center mb-8">
                At <span className="text-[#2b3991] font-semibold">Gumisofts</span>, we&apos;re a dedicated team of creators, developers, and tech enthusiasts united by a passion for building exceptional digital experiences that matter.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed text-center">
                We specialize in crafting custom software, intuitive mobile apps, dynamic websites, robust APIs, and cutting-edge tech solutions, all tailored to our clients&apos; unique needs. From startups to established businesses, we collaborate with visionaries to transform their ideas into powerful, user-friendly realities. Our commitment to{" "}
                <span className="text-[#2b3991] font-medium">quality, innovation, and teamwork</span>{" "}
                drives us, and we take pride in shaping the future of technology with every project we undertake.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="relative py-24 bg-gray-50">
        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#2b3991] mb-6">
              Our{" "}
              <span className="text-gray-700">
                Values
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The principles that guide everything we do and define who we are as a company.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-[#2b3991] hover:shadow-xl transition-all duration-500"
              >
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-[#2b3991] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#2b3991] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FiHeart className="w-3 h-3 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#2b3991] mb-4 group-hover:text-[#1f2a6b] transition-all duration-300">
                  {value.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-lg"
              >
                <div className="w-16 h-16 bg-[#2b3991] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <FiTarget className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-3xl font-bold text-[#2b3991] mb-6">Our Mission</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To develop software that solves real-world problems. We believe technology should be functional, intuitive, and impactful—ensuring our solutions enhance efficiency and drive success for businesses of all sizes.
                </p>
              </motion.div>

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-lg"
              >
                <div className="w-16 h-16 bg-[#2b3991] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <FiGlobe className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-3xl font-bold text-[#2b3991] mb-6">Our Vision</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To be the leading force in digital transformation, empowering businesses worldwide with innovative technology solutions that shape the future and create lasting positive impact in the digital landscape.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gray-50">
        <div className="relative container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-3xl p-12 border border-gray-200 shadow-xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-6 text-[#2b3991]"
              >
                Ready to{" "}
                <span className="text-gray-700">
                  Collaborate?
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Let&apos;s work together to turn your vision into reality and create something amazing.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link
                  href="/#contact"
                  className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Start Your Project
                </Link>

                <Link href="/services" className="border-2 border-gray-300 hover:border-[#2b3991] text-[#2b3991] hover:bg-gray-50 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300">
                  Learn More
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
