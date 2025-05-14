import React from "react";
import Image from "next/image";
import { section } from "framer-motion/client";
import { motion } from "framer-motion";
const careers = () => {
  return (
    <section>
      <div className="bg-[#F9F9FF] py-8 px-6">
        <div className="relative w-full max-w-2xl h-64   mx-auto mt-24 mb-24">
          <Image
            src="/assets/careerHomepageImage.png"
            alt="Card Image"
            layout="fill"
          />
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md text-sm">
            WITH GUMISOFTS
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center gap-16 items-center mt-24 ">
          <h1>G</h1>
          <div className="w-[2px] h-28 bg-gray-500 absolute top-auto left-1/2 transform -translate-x-1/2"></div>
          <div>
            <div>get</div>
            <div>go</div>
            <div>grow</div>
          </div>
        </div>
        <p className="text-center mt-16">
          At GumiSoft, you can get inspired by limitless possibilities, go
          beyond the ordinary, and grow into your full potential. When you join
          us, you get a chance to innovate, go further with a passionate team,
          and grow as a leader in software solutions.
        </p>
      </div>
    </section>
  );
};

export default careers;
