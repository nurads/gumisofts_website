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

const WorkCard: React.FC<WorkProps> = ({
    project,
    index,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
            className="group relative bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20 hover:border-purple-400/50 transition-all duration-500"
        >
            <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0`}>
                {/* Image Section */}
                <div className="relative lg:w-1/2 h-64 lg:h-96 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10"></div>
                    <Image
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 z-20">
                        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2">
                            <span className="text-white font-medium text-sm">Case Study #{index + 1}</span>
                        </div>
                    </div>
                    <div className="absolute bottom-4 right-4 z-20">
                        <Link
                            href={project.demoUrl || project.githubUrl || ""}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-xl flex items-center justify-center"
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
                            className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300"
                        >
                            {project.title}
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-gray-300 text-lg leading-relaxed mb-6"
                        >
                            {project.description}
                        </motion.p>

                        {/* Mock Statistics */}
                        {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-3 gap-4 mb-8"
              >
                <div className="text-center">
                  <FiTrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">150%</div>
                  <div className="text-xs text-gray-400">Growth</div>
                </div>
                <div className="text-center">
                  <FiUsers className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">10K+</div>
                  <div className="text-xs text-gray-400">Users</div>
                </div>
                <div className="text-center">
                  <FiAward className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">99%</div>
                  <div className="text-xs text-gray-400">Satisfaction</div>
                </div>
              </motion.div> */}
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
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                        >
                            View Live Project
                            <FiExternalLink className="w-4 h-4" />
                        </Link>
                        <Link
                            href={project.demoUrl || project.githubUrl || ""}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            Case Study
                            <FiArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-10 right-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-10 left-10 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            </div>
        </motion.div>
    );
};

export default WorkCard;