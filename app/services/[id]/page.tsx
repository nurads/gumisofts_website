"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    FiArrowLeft,
    FiCheck,
    FiCloud,
    FiStar,
    FiZap,
    FiMail,
    FiPhone,
} from 'react-icons/fi';
import * as Icons from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getService } from '@/services/company';
import { useQuery } from '@tanstack/react-query';

const ServiceDetailPage = () => {
    const params = useParams();
    const serviceId = params.id as string;

    const { data: service, isLoading: serviceLoading } = useQuery({
        queryKey: ['service', serviceId],
        queryFn: () => getService(serviceId),
    });

    const getIconComponent = (iconKey: string) => {
        return Icons[iconKey as keyof typeof Icons] || FiCloud;
    };

    const scrollToContact = () => {
        const section = document.getElementById('contact');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (serviceLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-[#2b3991] rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-700 text-lg">Loading service details...</p>
                </div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-[#2b3991] mb-4">Service Not Found</h1>
                    <p className="text-gray-600 mb-8">
                        The service you&apos;re looking for doesn&apos;t exist.
                    </p>
                    <Link
                        href="/services"
                        className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                    >
                        Back to Services
                    </Link>
                </div>
            </div>
        );
    }

    const IconComponent = getIconComponent(service.icon);

    return (
        <div className="min-h-screen bg-white">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

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
                                href="/services"
                                className="inline-flex items-center gap-2 text-[#2b3991] hover:text-[#1f2a6b] transition-colors duration-300 font-medium"
                            >
                                <FiArrowLeft className="w-5 h-5" />
                                Back to Services
                            </Link>
                        </motion.div>

                        <div className="flex flex-col items-center text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                className="relative mb-8"
                            >
                                <div className="w-28 h-28 bg-[#2b3991] rounded-3xl flex items-center justify-center shadow-md mx-auto">
                                    <IconComponent className="w-14 h-14 text-white" />
                                </div>
                                <div className="absolute -top-3 -right-3 w-10 h-10 bg-[#2b3991] rounded-full flex items-center justify-center shadow-md">
                                    <FiStar className="w-5 h-5 text-white" />
                                </div>
                            </motion.div>

                            <div className="max-w-3xl">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="inline-block bg-white text-[#2b3991] border border-gray-200 px-4 py-2 rounded-full text-sm font-medium mb-6"
                                >
                                    {service.category}
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="text-4xl md:text-6xl font-bold mb-6 text-[#2b3991]"
                                >
                                    {service.title}
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="text-xl text-gray-600 leading-relaxed mb-8"
                                >
                                    {service.description}
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="flex flex-col sm:flex-row gap-4 justify-center"
                                >
                                    <button
                                        onClick={scrollToContact}
                                        className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-300 shadow-md flex items-center justify-center gap-2"
                                    >
                                        Get Started
                                        <FiZap className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={scrollToContact}
                                        className="border-2 border-gray-300 hover:border-[#2b3991] text-[#2b3991] hover:bg-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        Contact Us
                                        <FiMail className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#2b3991]">
                                What You <span className="text-gray-700">Get</span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Comprehensive features and benefits designed to deliver exceptional results
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {service.features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#2b3991] hover:shadow-md transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-9 h-9 bg-[#2b3991] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <FiCheck className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-[#2b3991]">{feature}</h3>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Request Quote Section */}
            <section className="relative py-24 bg-gray-50 border-t border-gray-200">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#2b3991]">
                                Get Your <span className="text-gray-700">Custom Quote</span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Every project is unique. Contact us for a personalized quote tailored to your specific requirements and budget.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: 'Project Scope',
                                    description: 'Tell us about your project requirements, timeline, and goals.',
                                },
                                {
                                    title: 'Custom Solution',
                                    description: "We'll design a tailored solution that fits your specific needs.",
                                },
                                {
                                    title: 'Transparent Pricing',
                                    description: 'Receive a detailed quote with no hidden costs or surprises.',
                                },
                            ].map((step, index) => (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-[#2b3991] hover:shadow-md transition-all duration-300 text-center"
                                >
                                    <div className="w-12 h-12 bg-[#2b3991] text-white font-bold rounded-full flex items-center justify-center mx-auto mb-6 text-lg">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#2b3991] mb-4">{step.title}</h3>
                                    <p className="text-gray-600 leading-relaxed mb-6">{step.description}</p>

                                    {index === 1 && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                            <div className="bg-[#2b3991] text-white px-4 py-1.5 rounded-full text-xs font-semibold">
                                                Recommended
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="text-center mt-12"
                        >
                            <button
                                onClick={scrollToContact}
                                className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-12 py-4 rounded-lg font-bold text-xl transition-colors duration-300 shadow-md flex items-center justify-center gap-3 mx-auto"
                            >
                                Request Your Quote
                                <FiMail className="w-5 h-5" />
                            </button>
                            <p className="text-gray-500 mt-4 text-sm">
                                Free consultation · No obligation · Quick response
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-24 bg-white">
                <div className="relative container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="bg-gray-50 rounded-3xl p-12 border border-gray-200 shadow-md">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-5xl font-bold text-[#2b3991] mb-6"
                            >
                                Ready to Get Started?
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
                            >
                                Let&apos;s discuss your project and transform your ideas into reality with our {service.title.toLowerCase()} expertise.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="flex flex-col sm:flex-row gap-4 justify-center"
                            >
                                <button
                                    onClick={scrollToContact}
                                    className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-300 shadow-md flex items-center justify-center gap-2"
                                >
                                    Start Your Project
                                    <FiZap className="w-5 h-5" />
                                </button>

                                <button
                                    onClick={scrollToContact}
                                    className="border-2 border-gray-300 hover:border-[#2b3991] text-[#2b3991] hover:bg-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    Contact Sales
                                    <FiPhone className="w-5 h-5" />
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetailPage;
