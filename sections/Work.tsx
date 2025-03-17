"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { workProjects } from "../constants"; // Import the data
import Link from "next/link";
type WorkProps = {
  title: string;
  image: string;
  description: string;
  checkoutLink: string;
};

const WorkCard: React.FC<WorkProps> = ({
  image,
  title,
  description,
  checkoutLink,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-[90%] sm:w-[95%] md:w-[95%] mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row"
    >
      <Image
        src={image}
        alt={title}
        width={300}
        height={200}
        className="w-full md:w-1/3 object-cover"
      />
      <div className="p-4 md:p-6 bg-[#D3CBE280] flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm md:text-base text-gray-700">{description}</p>
        </div>
        <div className="flex justify-end mt-4">
          <Link
            href={checkoutLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-[#8080D7] hover:bg-[#646699] px-4 py-2 rounded-full text-sm font-semibold transition"
          >
            Check Out →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Work = () => {
  return (
    <section id="work" className="bg-[#F9F9FF] py-16">
      <div className="flex flex-col items-center pb-10 text-center">
        <h2 className="text-gray-600 text-lg">Our recent</h2>
        <h1 className="font-bold text-2xl md:text-3xl">Case Studies</h1>
      </div>
      <div className="container mx-auto px-4 flex flex-col gap-8">
        {workProjects.map((project, index) => (
          <WorkCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Work;
