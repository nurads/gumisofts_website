"use client";
import { motion } from "framer-motion";
import { FiStar, FiUser } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { getCompanyInfo, getTestimonials } from "@/services/company";

const Testimonial = () => {
  // const testimonials = [

  //   {
  //     id: 2,
  //     name: "Michael Chen",
  //     position: "CTO, InnovateLab",
  //     rating: 5,
  //     comment: "Outstanding work on our mobile application. The development process was smooth, and the final product was exactly what we envisioned. Highly recommended for any software development needs.",
  //     avatar: "/assets/avatar2.jpg"
  //   },
  //   {
  //     id: 3,
  //     name: "Emily Rodriguez",
  //     position: "Founder, DigitalFlow",
  //     rating: 5,
  //     comment: "Working with Gumisofts was a game-changer for our business. They not only built an amazing platform but also provided valuable insights that improved our overall business strategy.",
  //     avatar: "/assets/avatar3.jpg"
  //   }
  // ];

  const { data: companyInfo, isLoading: isCompanyInfoLoading } = useQuery({
    queryKey: ["companyInfo"],
    queryFn: getCompanyInfo,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false
  });

  const { data: testimonials, isLoading: isTestimonialsLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false
  });

  return (
    <section
      id="testimonials"
      className="relative py-24 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 right-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

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
            className="inline-block bg-purple-600/20 text-purple-300 px-6 py-3 rounded-full text-sm font-medium mb-6"
          >
            ⭐ Client Testimonials
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            What Our Clients{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Say
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied clients have to say about working with us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {isTestimonialsLoading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : (
            testimonials && testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-purple-400/50 transition-all duration-500"
              >
                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                {/* Comment */}
                <blockquote className="text-gray-300 text-lg leading-relaxed mb-8 italic">
                  &ldquo;{testimonial.comment}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <FiUser className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-purple-300 text-sm">{testimonial.position}</p>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </motion.div>
            )))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10">
            <h3 className="text-3xl font-bold text-white mb-8">
              Trusted by Industry Leaders
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {isCompanyInfoLoading ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                </div>
              ) : (
                [
                  { number: `${companyInfo?.clientSatisficationRate}%`, label: "Client Satisfaction" },
                  { number: `${companyInfo?.numberOfProjectsCompleted}+`, label: "Projects Delivered" },
                  { number: `${companyInfo?.numberOfHappyClients}+`, label: "Happy Clients" },
                  { number: `${companyInfo?.yearsOfExprience}+`, label: "Years Experience" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-400">{stat.label}</div>
                  </motion.div>
                )))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <button
                onClick={() => {
                  const section = document.getElementById("contact");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Join Our Success Stories
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;
