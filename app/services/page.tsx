"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Service } from '@/types/api';
import { FiArrowRight, FiCheck, FiCloud, FiStar } from 'react-icons/fi';
import * as Icons from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { getCompanyInfo, getServices } from '@/services/company';
import { useQuery } from '@tanstack/react-query';

const ServicesPage = () => {
    const [services, setServices] = useState<Service[]>([]);
    // const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const { data: servicesData, isLoading: servicesLoading, isError: servicesError } = useQuery({
        queryKey: ["services"],
        queryFn: getServices,
    });
    const { data: companyInfo } = useQuery({
        queryKey: ["companyInfo"],
        queryFn: getCompanyInfo,
    });

    useEffect(() => {
        if (servicesData) {
            setServices(servicesData);
        }
    }, [servicesData]);

    useEffect(() => {
        if (servicesError) {
            toast.error('Failed to load services');
        }
    }, [servicesError]);



    const filteredServices = selectedCategory === 'all'
        ? services
        : services.filter(service => service.category.toLowerCase() === selectedCategory);

    const categories = ['all', ...new Set(services.map(service => service.category.toLowerCase()))];


    const getIconComponent = (iconKey: string) => {
        return Icons[iconKey as keyof typeof Icons] || FiCloud;
    };


    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden bg-gray-50">
                <div className="relative container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block bg-gray-100 text-gray-900 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-sm"
                        >
                            🚀 Professional Services
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-5xl md:text-7xl font-bold mb-6 text-[#2b3991]"
                        >
                            Our{" "}
                            <span className="text-gray-700">
                                Services
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-xl md:text-2xl mb-12 text-gray-600 leading-relaxed"
                        >
                            Comprehensive technology solutions tailored to accelerate your business growth and digital transformation
                        </motion.p>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
                        >
                            {[
                                { number: `${companyInfo?.numberOfServices}+`, label: "Services Offered" },
                                { number: `${companyInfo?.numberOfProjectsCompleted}+`, label: "Projects Completed" },
                                { number: `${companyInfo?.numberOfHappyClients}+`, label: "Happy Clients" },
                                { number: `${companyInfo?.clientSatisficationRate}%`, label: "Success Rate" }
                            ].map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-[#2b3991] mb-2">{stat.number}</div>
                                    <div className="text-gray-600 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Service Categories Filter */}
            <section className="relative py-8 bg-white border-y border-gray-200 sticky top-20 z-10 shadow-sm">
                <div className="container mx-auto px-6">
                    <div className="flex justify-center">
                        <div className="flex flex-wrap gap-3">
                            {categories.map((category) => (
                                <motion.button
                                    key={category}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                                        ? 'bg-[#2b3991] text-white shadow-xl'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                                        }`}
                                >
                                    {category === 'all' ? 'All Services' : category.charAt(0).toUpperCase() + category.slice(1)}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="relative py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-7xl mx-auto">
                        {servicesLoading ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[...Array(6)].map((_, index) => (
                                    <div key={index} className="bg-gray-50 rounded-3xl p-8 animate-pulse border border-gray-200">
                                        <div className="w-16 h-16 bg-gray-300 rounded-2xl mb-6"></div>
                                        <div className="h-6 bg-gray-300 rounded mb-4"></div>
                                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-300 rounded mb-6"></div>
                                        <div className="h-10 bg-gray-300 rounded"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredServices.map((service, index) => {
                                    const IconComponent = getIconComponent(service.icon);

                                    return (
                                        <motion.div
                                            key={service.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            whileHover={{ y: -10, scale: 1.02 }}
                                            className="group relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-[#2b3991] hover:shadow-xl transition-all duration-500"
                                        >
                                            {/* Service Icon */}
                                            <div className="relative mb-6">
                                                <div className="w-16 h-16 bg-[#2b3991] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                    <IconComponent className="w-8 h-8 text-white" />
                                                </div>
                                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <FiStar className="w-3 h-3 text-yellow-900" />
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-bold text-[#2b3991] mb-4 group-hover:text-[#1f2a6b] transition-all duration-300">
                                                {service.title}
                                            </h3>

                                            <p className="text-gray-600 mb-6 leading-relaxed">{service.shortDescription}</p>

                                            <div className="space-y-3 mb-6">
                                                {service.features.slice(0, 3).map((feature, featureIndex) => (
                                                    <div key={featureIndex} className="flex items-center gap-3">
                                                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                            <FiCheck className="w-3 h-3 text-green-600" />
                                                        </div>
                                                        <span className="text-sm text-gray-600">{feature}</span>
                                                    </div>
                                                ))}
                                                {service.features.length > 3 && (
                                                    <div className="text-sm text-[#2b3991] font-medium ml-8">
                                                        +{service.features.length - 3} more features
                                                    </div>
                                                )}
                                            </div>



                                            <div className="flex gap-3">
                                                <a href={`/services/${service.id}`} className="cursor-pointer flex-1 bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                                                    Learn More
                                                    <FiArrowRight className="w-4 h-4" />
                                                </a>
                                            </div>

                                            {/* Hover Effect */}
                                            <div className="absolute inset-0 bg-gray-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-24 bg-gray-50">
                <div className="relative container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="bg-white rounded-3xl p-12 border border-gray-200 shadow-xl">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl font-bold mb-6 text-[#2b3991]"
                            >
                                Ready to Transform Your{" "}
                                <span className="text-gray-700">
                                    Business?
                                </span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-xl text-gray-600 mb-8 leading-relaxed"
                            >
                                Let&apos;s discuss your project and create a custom solution that drives results for your business.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="flex flex-col sm:flex-row gap-4 justify-center"
                            >
                                <a
                                    href={`/#contact`}
                                    className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
                                >
                                    Start Your Project
                                    <FiArrowRight className="w-5 h-5" />
                                </a>

                                <a href={companyInfo?.scheduleUrl || ''} target="_blank" className="border-2 border-gray-300 hover:border-[#2b3991] text-[#2b3991] hover:bg-gray-50 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300">
                                    Schedule Consultation
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <ToastContainer />
        </div>
    );
};

export default ServicesPage; 