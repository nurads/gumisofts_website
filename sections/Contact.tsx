"use client";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend, FiArrowRight } from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";
import { createMessage } from "@/services/general";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { getCompanyInfo } from "@/services/company";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { mutate: createMessageMutation, isPending: isCreatingMessage } = useMutation({
    mutationFn: createMessage,
    onSuccess: () => {
      toast.success("Message sent successfully");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    createMessageMutation({
      full_name: formData.name,
      email: formData.email,
      content: formData.message,
    });

    setFormData({
      name: "",
      email: "",
      message: "",
    });

  };
  const { data: companyInfo, isLoading: isCompanyInfoLoading, isError: isCompanyInfoError } = useQuery({
    queryKey: ["companyInfo"],
    queryFn: getCompanyInfo,
  });

  const contactInfo = [
    {
      icon: FiMail,
      title: "Email Us",
      detail: companyInfo?.email || "",
      description: "Send us a message anytime",
    },
    {
      icon: FiPhone,
      title: "Call Us",
      detail: companyInfo?.phone || "",
      description: "Mon-Fri from 8am to 5pm",
    },
    {
      icon: FiMapPin,
      title: "Visit Us",
      detail: companyInfo?.address || "",
      description: "Come say hello at our office",
    },
  ];



  return (
    <section
      id="contact"
      className="relative py-24 bg-white text-gray-900 overflow-hidden"
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
            💬 Get In Touch
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#2b3991]">
            Let&apos;s Build Something{" "}
            <span className="text-gray-700">
              Amazing
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your ideas into reality? We&apos;d love to hear from you and discuss your next project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-3xl p-8 border border-gray-200"
          >
            <h3 className="text-2xl font-bold text-[#2b3991] mb-6">Send us a message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2b3991] focus:border-transparent transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2b3991] focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              {isCreatingMessage && <Loader variant="bars" />}

              {!isCreatingMessage && <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
              >
                {"Send Message"}
                <FiSend className="w-5 h-5" />
              </motion.button>}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-[#2b3991] mb-8">Get in touch</h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-[#2b3991] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-[#2b3991] mb-1">{info.title}</h4>
                      <p className="text-gray-700 font-medium mb-1">{info.detail}</p>
                      <p className="text-gray-600 text-sm">{info.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Additional CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-[#2b3991] rounded-3xl p-8 text-white"
            >
              <h4 className="text-xl font-bold mb-4">Ready to start your project?</h4>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Book a free consultation call with our team to discuss your vision and how we can bring it to life.
              </p>
              <button className="bg-white hover:bg-gray-100 text-[#2b3991] px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2">
                <Link href={companyInfo?.scheduleUrl || ""} target="_blank">
                  Schedule a Call
                </Link>
                <FiArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Office Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
            >
              <h4 className="text-lg font-semibold text-[#2b3991] mb-4">Office Hours</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="text-[#2b3991]">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="text-[#2b3991]">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="text-gray-600">Closed</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Map or Additional Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gray-50 rounded-3xl p-12 border border-gray-200">
            <h3 className="text-2xl font-bold text-[#2b3991] mb-4">
              Trusted by companies worldwide
            </h3>
            <p className="text-gray-600 mb-8">
              Join the growing list of businesses that have transformed their digital presence with us.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                `${companyInfo?.numberOfProjectsCompleted}+ Projects`,
                `${companyInfo?.numberOfHappyClients}+ Clients`,
                `${companyInfo?.yearsOfExprience}+ Years`,
                `${companyInfo?.clientSatisficationRate}% Success Rate`
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-[#2b3991]">{stat}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
