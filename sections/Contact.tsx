"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify"; // Import toast for notifications
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateID || !userID) {
      toast.error("Email service is not configured correctly.");
      return;
    }

    try {
      const res = await emailjs.send(serviceID, templateID, formData, userID);
      if (res.status === 200) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", service: "", message: "" });
        setIsOpen(false);
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <section
      id="contact"
      className="py-16 px-4 sm:px-8 md:px-16 flex justify-center"
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full max-w-4xl flex flex-col items-center justify-center text-center px-8 py-12 rounded-lg shadow-lg"
        style={{
          background: "linear-gradient(to bottom right, #ADBBF9, #D1B5E5)",
        }}
      >
        <h2 className="text-[32px] sm:text-[28px] md:text-3xl font-bold text-[#000000] pb-6">
          Are you ready?
        </h2>
        <p className="text-4xl sm:text-3xl md:text-6xl text-white mt-2 tracking-[10%] leading-[45px] sm:leading-[40px] md:leading-[55px] pb-10 font-bold">
          Be A Part Of The <br /> Next Big Thing
        </p>

        <motion.button
          onClick={() => setIsOpen(true)}
          className="px-16 py-4 bg-[#000000] text-white font-semibold rounded-full shadow-md transition duration-300 text-lg sm:text-base md:text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Talk to us
        </motion.button>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-lg shadow-xl w-[90%] sm:w-[80%] md:w-[50%] lg:w-[40%]"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#575e7d]">Contact Us</h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  ✕
                </button>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="First Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-[#d6ddfc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C7B7EB]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-[#d6ddfc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C7B7EB]"
                />
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-[#d6ddfc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C7B7EB] text-black"
                >
                  <option value="" disabled hidden>
                    Select a Service
                  </option>
                  <option value="Web Development" className="text-black">
                    Web Development
                  </option>
                  <option value="Mobile App" className="text-black">
                    Mobile App
                  </option>
                  <option value="SEO Optimization" className="text-black">
                    Web Application
                  </option>
                  <option value="SEO Optimization" className="text-black">
                    Automation
                  </option>
                  <option value="SEO Optimization" className="text-black">
                    Command Line Application
                  </option>
                  <option value="SEO Optimization" className="text-black">
                    Desktop Application
                  </option>
                  <option value="SEO Optimization" className="text-black">
                    Api Development
                  </option>
                  <option value="SEO Optimization" className="text-black">
                    DevOps & CI/CD
                  </option>
                  <option value="SEO Optimization" className="text-black">
                    Seo Optimization
                  </option>
                </select>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-[#d6ddfc] focus:outline-none focus:ring-2 focus:ring-[#C7B7EB]"
                  rows={4}
                />
                <button
                  type="submit"
                  className="w-full bg-[#575e7d] text-white py-2 rounded-md font-semibold hover:bg-[#454b64] transition"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
