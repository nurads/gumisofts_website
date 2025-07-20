"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiCloud, FiStar, FiZap, FiMail, FiPhone } from 'react-icons/fi';
import * as Icons from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getService } from '@/services/company';
import { useQuery } from '@tanstack/react-query';

const ServiceDetailPage = () => {
    const params = useParams();
    const serviceId = params.id as string;

    const { data: service, isLoading: serviceLoading } = useQuery({
        queryKey: ["service", serviceId],
        queryFn: () => getService(serviceId),
    });

    const getIconComponent = (iconKey: string) => {
        return Icons[iconKey as keyof typeof Icons] || FiCloud;
    };



    const scrollToContact = () => {
        const section = document.getElementById("contact");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    if (serviceLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-lg">Loading service details...</p>
                </div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
                    <p className="text-gray-300 mb-8">The service you&apos;re looking for doesn&apos;t exist.</p>
                    <Link
                        href="/services"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                    >
                        Back to Services
                    </Link>
                </div>
            </div>
        );
    }

    const IconComponent = getIconComponent(service.icon);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
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
                theme="dark"
            />

            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                    <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
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
                                href="/services"
                                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
                            >
                                <FiArrowLeft className="w-5 h-5" />
                                <span className="font-medium">Back to Services</span>
                            </Link>
                        </motion.div>

                        <div className="flex flex-col lg:flex-row items-start gap-12">
                            {/* Service Icon */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                className="relative"
                            >
                                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl">
                                    <IconComponent className="w-16 h-16 text-white" />
                                </div>
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                                    <FiStar className="w-6 h-6 text-yellow-900" />
                                </div>
                            </motion.div>

                            {/* Service Info */}
                            <div className="flex-1">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="inline-block bg-blue-600/30 text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-400/30"
                                >
                                    {service.category}
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="text-4xl md:text-6xl font-bold mb-6 text-white"
                                >
                                    {service.title}
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="text-xl text-gray-200 leading-relaxed mb-8"
                                >
                                    {service.description}
                                </motion.p>

                                {/* CTA Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                    className="flex flex-col sm:flex-row gap-4"
                                >
                                    <button
                                        onClick={scrollToContact}
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
                                    >
                                        Get Started
                                        <FiZap className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={scrollToContact}
                                        className="border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2"
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
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                                What You{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                    Get
                                </span>
                            </h2>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
                                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <FiCheck className="w-4 h-4 text-green-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-2">{feature}</h3>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Request Quote Section */}
            <section className="relative py-24 bg-white/5">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                                Get Your{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                    Custom Quote
                                </span>
                            </h2>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                Every project is unique. Contact us for a personalized quote tailored to your specific requirements and budget.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: 'Project Scope',
                                    description: 'Tell us about your project requirements, timeline, and goals.',
                                    icon: '📋'
                                },
                                {
                                    title: 'Custom Solution',
                                    description: 'We&apos;ll design a tailored solution that fits your specific needs.',
                                    icon: '⚡'
                                },
                                {
                                    title: 'Transparent Pricing',
                                    description: 'Receive a detailed quote with no hidden costs or surprises.',
                                    icon: '💰'
                                }
                            ].map((step, index) => (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-purple-400/30 transition-all duration-300 text-center"
                                >
                                    <div className="text-4xl mb-6">{step.icon}</div>
                                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                                    <p className="text-gray-300 leading-relaxed mb-6">{step.description}</p>

                                    {index === 1 && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
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
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-3 mx-auto"
                            >
                                Request Your Quote
                                <FiMail className="w-6 h-6" />
                            </button>
                            <p className="text-gray-400 mt-4 text-sm">
                                Free consultation • No obligation • Quick response
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-24">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                <div className="relative container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-5xl font-bold text-white mb-6"
                            >
                                Ready to Get Started?
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
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
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
                                >
                                    Start Your Project
                                    <FiZap className="w-5 h-5" />
                                </button>

                                <button
                                    onClick={scrollToContact}
                                    className="border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2"
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