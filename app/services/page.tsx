"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Service } from '@/types/api';
import { apiService } from '@/services/api';
import { FiArrowRight, FiCheck, FiCode, FiEdit, FiCloud, FiSmartphone, FiDatabase, FiShield, FiStar } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { getCompanyInfo } from '@/services/company';
import { useQuery } from '@tanstack/react-query';

const ServicesPage = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const { data: companyInfo } = useQuery({
        queryKey: ["companyInfo"],
        queryFn: getCompanyInfo,
    });

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await apiService.getServices();
                if (response.success) {
                    setServices(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch services:', error);
                toast.error('Failed to load services');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const filteredServices = selectedCategory === 'all'
        ? services
        : services.filter(service => service.category.toLowerCase() === selectedCategory);

    const categories = ['all', ...new Set(services.map(service => service.category.toLowerCase()))];

    const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
        '💻': FiCode,
        '🎨': FiEdit,
        '☁️': FiCloud,
        '📱': FiSmartphone,
        '🗄️': FiDatabase,
        '🔒': FiShield
    };

    const getIconComponent = (iconKey: string) => {
        const IconComponent = iconMap[iconKey] || FiCode;
        return IconComponent;
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                    <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
                    <div className="absolute top-3/4 right-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
                </div>

                <div className="relative container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block bg-blue-600/30 text-blue-200 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-blue-400/30"
                        >
                            🚀 Professional Services
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-5xl md:text-7xl font-bold mb-6 text-white"
                        >
                            Our{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                                Services
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-xl md:text-2xl mb-12 text-gray-200 leading-relaxed"
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
                                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                                    <div className="text-gray-400 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Service Categories Filter */}
            <section className="relative py-8 bg-white/10 backdrop-blur-lg border-y border-white/20 sticky top-20 z-10">
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
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl'
                                        : 'bg-white/20 text-gray-200 hover:bg-white/30 hover:text-white'
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
            <section className="relative py-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-7xl mx-auto">
                        {loading ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[...Array(6)].map((_, index) => (
                                    <div key={index} className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 animate-pulse border border-white/30">
                                        <div className="w-16 h-16 bg-gray-500 rounded-2xl mb-6"></div>
                                        <div className="h-6 bg-gray-500 rounded mb-4"></div>
                                        <div className="h-4 bg-gray-500 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-500 rounded mb-6"></div>
                                        <div className="h-10 bg-gray-500 rounded"></div>
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
                                            className="group relative bg-white/15 backdrop-blur-lg rounded-3xl p-8 border border-white/30 hover:border-purple-400/50 transition-all duration-500"
                                        >
                                            {/* Service Icon */}
                                            <div className="relative mb-6">
                                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                    <IconComponent className="w-8 h-8 text-white" />
                                                </div>
                                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <FiStar className="w-3 h-3 text-yellow-900" />
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                                                {service.title}
                                            </h3>

                                            <p className="text-gray-200 mb-6 leading-relaxed">{service.shortDescription}</p>

                                            <div className="space-y-3 mb-6">
                                                {service.features.slice(0, 3).map((feature, featureIndex) => (
                                                    <div key={featureIndex} className="flex items-center gap-3">
                                                        <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                                            <FiCheck className="w-3 h-3 text-green-400" />
                                                        </div>
                                                        <span className="text-sm text-gray-200">{feature}</span>
                                                    </div>
                                                ))}
                                                {service.features.length > 3 && (
                                                    <div className="text-sm text-blue-400 font-medium ml-8">
                                                        +{service.features.length - 3} more features
                                                    </div>
                                                )}
                                            </div>



                                            <div className="flex gap-3">
                                                <a href={`/services/${service.id}`} className="cursor-pointer flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                                                    Learn More
                                                    <FiArrowRight className="w-4 h-4" />
                                                </a>
                                                {/* <button className="cursor-pointer px-4 py-3 border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 rounded-lg font-semibold transition-all duration-300">
                                                    Learn More
                                                </button> */}
                                            </div>

                                            {/* Hover Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
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
                                className="text-4xl md:text-5xl font-bold mb-6 text-white"
                            >
                                Ready to Transform Your{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                    Business?
                                </span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-xl text-gray-200 mb-8 leading-relaxed"
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
                                <button
                                    onClick={() => {
                                        const section = document.getElementById("contact");
                                        if (section) {
                                            section.scrollIntoView({ behavior: "smooth" });
                                        }
                                    }}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
                                >
                                    Start Your Project
                                    <FiArrowRight className="w-5 h-5" />
                                </button>

                                <button className="border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300">
                                    Schedule Consultation
                                </button>
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