"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { services } from "../constants";

const Service = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: ["0%", "-100%"],
      transition: {
        repeat: Infinity,
        duration: 12,
        ease: "linear",
      },
    });
  }, [controls]);

  const handleHoverStart = async () => {
    await controls.stop(); // Pause animation
  };

  const handleHoverEnd = async () => {
    await controls.start({
      x: ["0%", "-100%"],
      transition: {
        repeat: Infinity,
        duration: 12,
        ease: "linear",
      },
    });
  };

  return (
    <section
      id="services"
      className="bg-[#F9F9FF] py-16 px-4 sm:px-6 w-full text-center overflow-hidden"
    >
      <h1 className="text-[28px] sm:text-[32px] md:text-[40px] font-bold text-[#1A202C] pb-10">
        Services we offer
      </h1>

      <div className="relative w-full overflow-hidden">
        <motion.div className="flex gap-6" animate={controls}>
          {[...services, ...services].map((service, index) => (
            <motion.div
              key={index}
              className="shadow-lg rounded-lg px-5 py-6 bg-white min-w-[280px] sm:min-w-[300px] md:min-w-[320px] max-w-[340px] mx-2 cursor-pointer"
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
            >
              <div className="w-14 h-14 border border-[#bc99ca] flex items-center justify-center rounded-full mx-auto">
                <img
                  width={28}
                  height={28}
                  src={service.imgSrc}
                  alt={service.title}
                />
              </div>
              <h1 className="font-bold text-[18px] sm:text-[20px] text-[#2D3748] mt-3">
                {service.title}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#1A202C] leading-[1.5]">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Service;
