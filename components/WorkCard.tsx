import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink, FiArrowRight } from "react-icons/fi";
import { Project } from "@/types/api";

type WorkProps = {
    project: Project;
    index: number;
};

const WorkCard: React.FC<WorkProps> = ({ project, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
            className="group relative bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#2b3991] hover:shadow-md transition-all duration-500"
        >
            <div
                className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    } gap-0`}
            >
                {/* Image Section */}
                <div className="relative lg:w-1/2 h-64 lg:h-96 overflow-hidden bg-gray-100">
                    <Image
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 z-20">
                        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 shadow-sm">
                            <span className="text-[#2b3991] font-semibold text-sm">
                                Case Study #{index + 1}
                            </span>
                        </div>
                    </div>
                    <div className="absolute bottom-4 right-4 z-20">
                        <Link
                            href={project.demoUrl || project.githubUrl || ""}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white p-3 rounded-full transition-colors duration-300 shadow-md flex items-center justify-center"
                        >
                            <FiExternalLink className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between">
                    <div>
                        <motion.h3
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-2xl lg:text-3xl font-bold text-[#2b3991] mb-4 group-hover:text-[#1f2a6b] transition-colors duration-300"
                        >
                            {project.title}
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-gray-600 text-lg leading-relaxed mb-6"
                        >
                            {project.description}
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link
                            href={project.demoUrl || project.githubUrl || ""}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-sm flex items-center justify-center gap-2"
                        >
                            View Live Project
                            <FiExternalLink className="w-4 h-4" />
                        </Link>
                        <Link
                            href={project.demoUrl || project.githubUrl || ""}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-2 border-gray-300 hover:border-[#2b3991] text-[#2b3991] hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            Case Study
                            <FiArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default WorkCard;
