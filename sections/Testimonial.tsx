"use client";
import { motion } from "framer-motion";
import React from "react";
import { testimonial } from "../constants";
type ProfileProps = {
  name: string;
  image: string;
  index: number;
  description: string;
};

const TestiCard: React.FC<ProfileProps> = ({
  name,
  image,
  index,
  description,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
      viewport={{ once: true, amount: 0.2 }} // Triggers when 20% of the card is visible
      className="max-w-[250px] mx-auto rounded-2xl shadow-lg text-center overflow-hidden relative pt-4"
    >
      <div className="flex justify-center py-4">
        <img
          src={image}
          alt="Profile Picture"
          width={80}
          height={80}
          className="rounded-full absolute left-1/2 transform -translate-x-1/2 top-1"
        />
      </div>
      <div className="bg-[#F1F2F2] text-white pt-14 pb-6 px-6">
        <h2 className="text-xl font-semibold text-[#000000]">{name}</h2>
        <p className="text-sm mt-2 text-[#262262]">{description}</p>
      </div>
    </motion.div>
  );
};

const Testimonial = () => {
  return (
    <div className="my-16">
      <div className="flex flex-col items-center text-center">
        <h2 className="leading-[1] mb-3 text-[#8A8A8A]">TESTIMONIALS</h2>
        <h1 className="text-[40px] leading-[1] font-bold">
          Read What Others <br /> Have To Say
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-6 py-16">
        {testimonial.map((profile, index) => (
          <TestiCard
            key={index}
            name={profile.name}
            image={profile.image}
            description={profile.description}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
