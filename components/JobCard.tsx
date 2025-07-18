"use client";
import React from 'react';
import { Job } from '@/types/api';
import { motion } from 'framer-motion';
import { FiMapPin, FiClock, FiBriefcase, FiCalendar, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

interface JobCardProps {
    job: Job;
    onApply: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onApply }) => {
    const formatSalary = (salary: Job['salary']) => {
        if (!salary) return '';
        return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()} ${salary.currency}`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getJobTypeColor = (type: Job['type']) => {
        const colors = {
            'full-time': 'bg-blue-500/20 text-blue-300 border-blue-400/30',
            'part-time': 'bg-green-500/20 text-green-300 border-green-400/30',
            'contract': 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30',
            'internship': 'bg-purple-500/20 text-purple-300 border-purple-400/30'
        };
        return colors[type] || 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 lg:p-8 border border-white/20 hover:border-purple-400/50 transition-all duration-500 shadow-xl"
        >
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

            <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                        {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-sm text-gray-200 mb-4">
                        <span className="flex items-center gap-2 bg-white/10 px-2 py-1 lg:px-3 lg:py-2 rounded-full border border-white/20">
                            <FiBriefcase className="w-3 h-3 lg:w-4 lg:h-4" />
                            <span className="text-xs lg:text-sm">{job.department}</span>
                        </span>
                        <span className="flex items-center gap-2 bg-white/10 px-2 py-1 lg:px-3 lg:py-2 rounded-full border border-white/20">
                            <FiMapPin className="w-3 h-3 lg:w-4 lg:h-4" />
                            <span className="text-xs lg:text-sm">{job.location}</span>
                        </span>
                        <span className="flex items-center gap-2 bg-white/10 px-2 py-1 lg:px-3 lg:py-2 rounded-full border border-white/20">
                            <FiClock className="w-3 h-3 lg:w-4 lg:h-4" />
                            <span className="text-xs lg:text-sm">{job.experience}</span>
                        </span>
                    </div>
                </div>
                <span className={`px-3 py-1 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium capitalize border ${getJobTypeColor(job.type)}`}>
                    {job.type.replace('-', ' ')}
                </span>
            </div>

            <p className="text-gray-100 text-sm lg:text-base mb-4 lg:mb-6 line-clamp-3 leading-relaxed">{job.description}</p>

            <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
                {job.salary && (
                    <div className="bg-white/10 rounded-2xl p-3 lg:p-4 border border-white/20">
                        <span className="text-xs lg:text-sm text-gray-200">Salary Range</span>
                        <div className="text-base lg:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                            {formatSalary(job.salary)}
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between text-xs lg:text-sm text-gray-200 bg-white/5 rounded-2xl p-3 lg:p-4 border border-white/10">
                    <span className="flex items-center gap-2">
                        <FiCalendar className="w-3 h-3 lg:w-4 lg:h-4" />
                        <span className="hidden sm:inline">Posted: </span>{formatDate(job.postedAt)}
                    </span>
                    <span className="text-red-400 font-medium">
                        <span className="hidden sm:inline">Deadline: </span>{formatDate(job.deadline)}
                    </span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                <button
                    onClick={() => onApply(job)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2.5 lg:px-6 lg:py-3 rounded-lg font-semibold text-sm lg:text-base transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                    Apply Now
                    <FiArrowRight className="w-3 h-3 lg:w-4 lg:h-4" />
                </button>
                <Link
                    href={`/careers/${job.id}`}
                    className="px-4 py-2.5 lg:px-6 lg:py-3 border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 rounded-lg font-semibold text-sm lg:text-base transition-all duration-300 text-center"
                >
                    Details
                </Link>
            </div>
        </motion.div>
    );
};

export default JobCard; 