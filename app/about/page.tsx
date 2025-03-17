"use client";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="bg-[#F9F9FF] py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-gray-600 text-lg"
        >
          Who We Are
        </motion.h2>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-bold text-2xl md:text-3xl text-gray-900 mb-6"
        >
          About Gumisoft
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-700 leading-relaxed text-base md:text-lg max-w-3xl mx-auto"
        >
          At <span className="font-semibold text-gray-900">Gumisoft</span>, we
          are a team of passionate developers, designers, and technology
          enthusiasts committed to delivering excellence. With years of
          experience in the tech industry, we specialize in crafting innovative
          solutions that empower businesses and individuals.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-700 leading-relaxed text-base md:text-lg max-w-3xl mx-auto mt-4"
        >
          Our mission is simple:{" "}
          <span className="font-semibold text-gray-900">
            to develop software that solves real-world problems.
          </span>
          We believe technology should be functional, intuitive, and
          impactful—ensuring our solutions enhance efficiency and drive success.
        </motion.p>
      </div>
    </section>
  );
};

export default About;
