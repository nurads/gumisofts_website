"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Job } from '@/types/api';
import {
    FiArrowLeft,
    FiMapPin,
    FiClock,
    FiBriefcase,
    FiCalendar,
    FiDollarSign,
    FiCheck,
    FiGift,
    FiArrowRight,
} from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import JobApplicationModal from '@/components/JobApplicationModal';
import 'react-toastify/dist/ReactToastify.css';
import { getJob } from '@/services/careers';
import { useQuery } from '@tanstack/react-query';

const JobDetailPage = () => {
    const params = useParams();
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: job, isLoading } = useQuery({
        queryKey: ['job', params.id],
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
            year: 'numeric',
        });
    };

    const getJobTypeBadge = () => {
        return 'bg-gray-100 text-[#2b3991] border-gray-200';
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
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-[#2b3991] rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-700 text-lg">Loading job details...</p>
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-[#2b3991] mb-4">Job Not Found</h1>
                    <p className="text-gray-600 mb-8">
                        The job you&apos;re looking for doesn&apos;t exist or has been removed.
                    </p>
                    <Link
                        href="/careers"
                        className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                    >
                        Back to Careers
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-32 bg-gray-50 border-b border-gray-200">
                <div className="relative container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-8"
                        >
                            <Link
                                href="/careers"
                                className="inline-flex items-center gap-2 text-[#2b3991] hover:text-[#1f2a6b] transition-colors duration-300 font-medium"
                            >
                                <FiArrowLeft className="w-5 h-5" />
                                Back to Careers
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-4"
                        >
                            <h1 className="text-4xl lg:text-5xl font-bold text-[#2b3991] mb-6 leading-tight">
                                {job.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700 mb-4">
                                <span className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full">
                                    <FiBriefcase className="w-4 h-4" />
                                    {job.department}
                                </span>
                                <span className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full">
                                    <FiMapPin className="w-4 h-4" />
                                    {job.location}
                                </span>
                                <span className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full">
                                    <FiClock className="w-4 h-4" />
                                    {job.experience}
                                </span>
                                <span
                                    className={`px-4 py-2 rounded-full text-sm font-medium capitalize border ${getJobTypeBadge()}`}
                                >
                                    {job.type.replace('-', ' ')}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Job Details Content */}
            <section className="relative py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-md"
                        >
                            {/* Job Info Cards */}
                            <div className="grid md:grid-cols-2 gap-6 mb-12">
                                {job.salary && (
                                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                        <div className="flex items-center gap-3 mb-3">
                                            <FiDollarSign className="w-5 h-5 text-[#2b3991]" />
                                            <span className="text-gray-700 font-medium">Salary Range</span>
                                        </div>
                                        <div className="text-2xl font-bold text-[#2b3991]">
                                            {formatSalary(job.salary)}
                                        </div>
                                    </div>
                                )}

                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                    <div className="flex flex-col gap-2 text-sm text-gray-700">
                                        <div className="flex items-center gap-2">
                                            <FiCalendar className="w-4 h-4 text-[#2b3991]" />
                                            <span>Posted: {formatDate(job.postedAt)}</span>
                                        </div>
                                        <div className="text-red-600 font-medium">
                                            Deadline: {formatDate(job.deadline)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Job Description */}
                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-[#2b3991] mb-4">Job Description</h2>
                                <p className="text-gray-700 leading-relaxed text-lg">{job.description}</p>
                            </div>

                            {/* Job Details Grid */}
                            <div className="grid lg:grid-cols-3 gap-8 mb-12">
                                {/* Requirements */}
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-9 h-9 bg-[#2b3991] rounded-lg flex items-center justify-center">
                                            <FiCheck className="w-4 h-4 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#2b3991]">Requirements</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {job.requirements.map((requirement, index) => (
                                            <li key={index} className="flex items-start gap-3 text-gray-700">
                                                <div className="w-2 h-2 bg-[#2b3991] rounded-full mt-2 flex-shrink-0"></div>
                                                <span className="text-sm leading-relaxed">{requirement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Responsibilities */}
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-9 h-9 bg-[#2b3991] rounded-lg flex items-center justify-center">
                                            <FiBriefcase className="w-4 h-4 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#2b3991]">Responsibilities</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {job.responsibilities.map((responsibility, index) => (
                                            <li key={index} className="flex items-start gap-3 text-gray-700">
                                                <div className="w-2 h-2 bg-[#2b3991] rounded-full mt-2 flex-shrink-0"></div>
                                                <span className="text-sm leading-relaxed">{responsibility}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Benefits */}
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-9 h-9 bg-[#2b3991] rounded-lg flex items-center justify-center">
                                            <FiGift className="w-4 h-4 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#2b3991]">Benefits</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {job.benefits.map((benefit, index) => (
                                            <li key={index} className="flex items-start gap-3 text-gray-700">
                                                <div className="w-2 h-2 bg-[#2b3991] rounded-full mt-2 flex-shrink-0"></div>
                                                <span className="text-sm leading-relaxed">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-6 pt-8 border-t border-gray-200">
                                <button
                                    onClick={() => handleApply(job)}
                                    className="flex-1 bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 shadow-md flex items-center justify-center gap-2"
                                >
                                    Apply for this Position
                                    <FiArrowRight className="w-5 h-5" />
                                </button>
                                <Link
                                    href="/careers"
                                    className="px-8 py-4 border-2 border-gray-300 hover:border-[#2b3991] text-[#2b3991] hover:bg-gray-50 rounded-lg font-semibold text-lg transition-all duration-300 text-center"
                                >
                                    Browse Other Jobs
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <JobApplicationModal isOpen={isModalOpen} onClose={closeModal} job={selectedJob} />

            <ToastContainer />
        </div>
    );
};

export default JobDetailPage;
