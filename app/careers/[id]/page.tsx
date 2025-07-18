"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Job } from '@/types/api';
import { FiArrowLeft, FiMapPin, FiClock, FiBriefcase, FiCalendar, FiDollarSign, FiCheck, FiGift, FiArrowRight } from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import JobApplicationModal from '@/components/JobApplicationModal';
import "react-toastify/dist/ReactToastify.css";
import { getJob } from '@/services/careers';
import { useQuery } from '@tanstack/react-query';

const JobDetailPage = () => {
    const params = useParams();
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: job, isLoading } = useQuery({
        queryKey: ["job", params.id],
        queryFn: () => getJob(params.id as string),
    });


    const formatSalary = (salary: Job['salary']) => {
        if (!salary) return '';
        return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()} ${salary.currency}`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
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

    const handleApply = (job: Job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-white text-xl">Loading job details...</p>
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Job Not Found</h1>
                    <p className="text-gray-300 mb-8">The job you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                    <Link
                        href="/careers"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                    >
                        Back to Careers
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                    <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
                    <div className="absolute top-3/4 right-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
                </div>

                <div className="relative container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Back Button */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-8"
                        >
                            <Link
                                href="/careers"
                                className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300"
                            >
                                <FiArrowLeft className="w-5 h-5" />
                                Back to Careers
                            </Link>
                        </motion.div>

                        {/* Job Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-8"
                        >
                            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">{job.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-200 mb-6">
                                <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                                    <FiBriefcase className="w-4 h-4" />
                                    {job.department}
                                </span>
                                <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                                    <FiMapPin className="w-4 h-4" />
                                    {job.location}
                                </span>
                                <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                                    <FiClock className="w-4 h-4" />
                                    {job.experience}
                                </span>
                                <span className={`px-4 py-2 rounded-full text-sm font-medium capitalize border ${getJobTypeColor(job.type)}`}>
                                    {job.type.replace('-', ' ')}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Job Details Content */}
            <section className="relative py-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl"
                        >
                            {/* Job Info Cards */}
                            <div className="grid md:grid-cols-2 gap-6 mb-12">
                                {job.salary && (
                                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                                        <div className="flex items-center gap-3 mb-3">
                                            <FiDollarSign className="w-5 h-5 text-green-400" />
                                            <span className="text-gray-200 font-medium">Salary Range</span>
                                        </div>
                                        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                                            {formatSalary(job.salary)}
                                        </div>
                                    </div>
                                )}

                                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                                    <div className="flex items-center justify-between text-sm text-gray-200">
                                        <div className="flex items-center gap-2">
                                            <FiCalendar className="w-4 h-4" />
                                            <span>Posted: {formatDate(job.postedAt)}</span>
                                        </div>
                                        <div className="text-red-400 font-medium">
                                            Deadline: {formatDate(job.deadline)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Job Description */}
                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-white mb-6">Job Description</h2>
                                <p className="text-gray-200 leading-relaxed text-lg">{job.description}</p>
                            </div>

                            {/* Job Details Grid */}
                            <div className="grid lg:grid-cols-3 gap-8 mb-12">
                                {/* Requirements */}
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                                            <FiCheck className="w-4 h-4 text-red-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">Requirements</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {job.requirements.map((requirement, index) => (
                                            <li key={index} className="flex items-start gap-3 text-gray-200">
                                                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                                <span className="text-sm leading-relaxed">{requirement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Responsibilities */}
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                            <FiBriefcase className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">Responsibilities</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {job.responsibilities.map((responsibility, index) => (
                                            <li key={index} className="flex items-start gap-3 text-gray-200">
                                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                                <span className="text-sm leading-relaxed">{responsibility}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Benefits */}
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                                            <FiGift className="w-4 h-4 text-green-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">Benefits</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {job.benefits.map((benefit, index) => (
                                            <li key={index} className="flex items-start gap-3 text-gray-200">
                                                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                                <span className="text-sm leading-relaxed">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-6 pt-8 border-t border-white/20">
                                <button
                                    onClick={() => handleApply(job)}
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                                >
                                    Apply for this Position
                                    <FiArrowRight className="w-5 h-5" />
                                </button>
                                <Link
                                    href="/careers"
                                    className="px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 rounded-lg font-semibold text-lg transition-all duration-300 text-center"
                                >
                                    Browse Other Jobs
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Job Application Modal */}
            <JobApplicationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                job={selectedJob}
            />

            <ToastContainer />
        </div>
    );
};

export default JobDetailPage; 