"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  const cards = [
    {
      title: "Innovation",
      image: "/assets/Innovation.png",
      description:
        "We embrace creativity and cutting-edge technology to push boundaries and deliver forward-thinking solutions.",
      bgColor: "#5AE4A8", // Green
    },
    {
      title: "Quality",
      image: "/assets/integrity.png",
      description:
        "We strive for excellence in every project, ensuring our software and services meet the highest standards.",
      bgColor: "#E3A6E0", // Purple
    },
    {
      title: "Collaboration",
      image: "/assets/colab.png",
      description:
        "We believe in partnering closely with our clients and team to turn visions into reality through teamwork and trust.",
      bgColor: "#BAE4F4", // Blue
    },
  ];

  return (
    <section className="bg-[#F9F9FF] py-40 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-bold text-2xl md:text-3xl text-gray-900 mb-6 flex flex-col gap-2.5"
        >
          About Us
          <hr className="w-36 mx-auto " />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-700 leading-relaxed text-base md:text-lg max-w-3xl mx-auto"
        >
          Gumisoft is Your Partner in Innovation, Specializing in Custom
          Software, Mobile App Development, Website Creation, API Integration,
          and Next-Level Tech Solutions for a Connected World
        </motion.p>
        {/* <motion.p
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
        </motion.p> */}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        viewport={{ once: true }}
        className="bg-[#455A64] shadow-lg rounded-lg border border-gray-200 p-6 md:p-8 w-full max-w-5xl mx-auto mt-16"
      >
        <h2 className="text-2xl md:text-4xl font-semibold text-center text-white">
          Who We Are
        </h2>
        <p className="mt-4 text-white leading-relaxed text-center">
          At <span className="text-blue-600 font-semibold">Gumisoft</span>,
          we’re a dedicated team of creators, developers, and tech enthusiasts
          united by a passion for building exceptional digital experiences that
          matter. We specialize in crafting custom software, intuitive mobile
          apps, dynamic websites, robust APIs, and cutting-edge tech solutions,
          all tailored to our clients’ unique needs. From startups to
          established businesses, we collaborate with visionaries to transform
          their ideas into powerful, user-friendly realities. Our commitment to{" "}
          <span className="font-medium">quality, innovation, and teamwork</span>{" "}
          drives us, and we take pride in shaping the future of technology with
          every project we undertake.
        </p>
      </motion.div>
      <div className="mt-32 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Our Values</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-28 p-6 mt-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative shadow-lg rounded-lg p-6 max-w-sm w-full mx-auto text-center"
              style={{ backgroundColor: card.bgColor }}
            >
              <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2">
                <Image
                  src={card.image}
                  alt="Card Image"
                  width={150}
                  height={150}
                  className="rounded-lg"
                />
              </div>
              <div className="mt-28">
                <h2 className="text-xl font-semibold text-[#263238]">
                  {card.title}
                </h2>
                <p className="text-black mt-2">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
