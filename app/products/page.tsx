"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiClock, FiBarChart, FiShield, FiZap, FiArrowRight, FiCheck, FiStar, FiGlobe, FiSmartphone } from 'react-icons/fi';
import Link from 'next/link';

const ProductsPage = () => {
    const products = [
        {
            id: 'bita-crm',
            name: 'Bita CRM',
            tagline: 'Streamline Your Customer Relationships',
            description: 'A comprehensive Customer Relationship Management system designed for medium to large businesses to manage leads, customers, sales pipeline, and team collaboration effectively.',
            icon: FiUsers,
            color: 'from-blue-500 to-indigo-600',
            features: [
                'Lead Management & Tracking',
                'Sales Pipeline Automation',
                'Customer Communication History',
                'Advanced Analytics & Reporting',
                'Team Collaboration Tools',
                'Email Marketing Integration',
                'Mobile App Support',
                'Custom Field Configuration'
            ],
            benefits: [
                'Increase sales conversion by 40%',
                'Reduce customer response time by 60%',
                'Improve team productivity',
                'Better customer insights'
            ],
            pricing: {
                starter: { price: "0 ETB", users: 5, features: 'Basic CRM features' },
                professional: { price: "200 ETB", users: 25, features: 'Advanced features + Analytics' },
                enterprise: { price: "400 ETB", users: 'Unlimited', features: 'Full features + Custom integration' }
            },
            demoUrl: 'https://bita-demo.gumisofts.com',
            screenshots: [
                '/api/placeholder/600/400',
                '/api/placeholder/600/400',
                '/api/placeholder/600/400'
            ]
        },
        {
            id: 'simple-time-tracker',
            name: 'Simple Time Tracker',
            tagline: 'Effortless Time Management for Modern Teams',
            description: 'A powerful yet simple time tracking solution for companies to monitor employee working hours, whether they are working remotely or in the office, with detailed reporting and productivity insights.',
            icon: FiClock,
            color: 'from-purple-500 to-pink-600',
            features: [
                'Real-time Time Tracking',
                'Remote & Office Work Support',
                'Project & Task Management',
                'Automated Break Detection',
                'GPS Location Tracking',
                'Detailed Time Reports',
                'Payroll Integration',
                'Team Performance Analytics'
            ],
            benefits: [
                'Increase productivity by 35%',
                'Accurate payroll calculations',
                'Remote work transparency',
                'Project cost optimization'
            ],
            pricing: {
                starter: { price: "$3", users: 10, features: 'Basic time tracking' },
                professional: { price: "$10", users: 50, features: 'Advanced features + Reports' },
                enterprise: { price: "$25", users: 'Unlimited', features: 'Full features + API access' }
            },
            demoUrl: 'https://timetracker-demo.gumisofts.com',
            screenshots: [
                '/api/placeholder/600/400',
                '/api/placeholder/600/400',
                '/api/placeholder/600/400'
            ]
        }
    ];

    const stats = [
        { icon: FiUsers, value: "500+", label: "Active Users" },
        { icon: FiGlobe, value: "15+", label: "Countries" },
        { icon: FiBarChart, value: "99.9%", label: "Uptime" },
        { icon: FiShield, value: "100%", label: "Secure" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                    <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
                    <div className="absolute top-3/4 right-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
                </div>

                <div className="relative container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block bg-blue-600/30 text-blue-200 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-blue-400/30"
                        >
                            🚀 Our Products
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-5xl md:text-7xl font-bold mb-6 text-white"
                        >
                            Built for{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                                Success
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-xl md:text-2xl mb-12 text-gray-200 leading-relaxed"
                        >
                            Discover our in-house developed products designed to streamline your business operations and boost productivity.
                        </motion.p>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
                        >
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <stat.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                                    <div className="text-gray-300 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="relative py-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-7xl mx-auto">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className={`mb-32 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                    {/* Product Info */}
                                    <div className="flex-1 space-y-8">
                                        <div>
                                            <div className={`w-20 h-20 bg-gradient-to-r ${product.color} rounded-3xl flex items-center justify-center mb-6 shadow-xl`}>
                                                <product.icon className="w-10 h-10 text-white" />
                                            </div>
                                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                                {product.name}
                                            </h2>
                                            <p className={`text-xl font-medium mb-6 text-transparent bg-clip-text bg-gradient-to-r ${product.color}`}>
                                                {product.tagline}
                                            </p>
                                            <p className="text-lg text-gray-200 leading-relaxed">
                                                {product.description}
                                            </p>
                                        </div>

                                        {/* Key Features */}
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-6">Key Features</h3>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {product.features.map((feature, featureIndex) => (
                                                    <div key={featureIndex} className="flex items-center gap-3">
                                                        <div className={`w-6 h-6 bg-gradient-to-r ${product.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                                                            <FiCheck className="w-3 h-3 text-white" />
                                                        </div>
                                                        <span className="text-gray-200">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Benefits */}
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-6">Benefits</h3>
                                            <div className="space-y-3">
                                                {product.benefits.map((benefit, benefitIndex) => (
                                                    <div key={benefitIndex} className="flex items-center gap-3">
                                                        <FiStar className={`w-5 h-5 text-yellow-400 flex-shrink-0`} />
                                                        <span className="text-gray-200">{benefit}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* CTA Buttons */}
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Link
                                                href={product.demoUrl}
                                                target="_blank"
                                                className={`bg-gradient-to-r ${product.color} hover:shadow-xl text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2`}
                                            >
                                                Try Demo
                                                <FiArrowRight className="w-5 h-5" />
                                            </Link>
                                            <button className="border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300">
                                                Learn More
                                            </button>
                                        </div>
                                    </div>

                                    {/* Product Showcase */}
                                    <div className="flex-1">
                                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                                            {/* Pricing Cards */}
                                            <div className="space-y-6">
                                                <h3 className="text-2xl font-bold text-white mb-6 text-center">Pricing Plans</h3>

                                                {Object.entries(product.pricing).map(([plan, details]) => (
                                                    <div key={plan} className={`bg-white/10 rounded-2xl p-6 border border-white/20 ${plan === 'professional' ? 'ring-2 ring-blue-400/50' : ''}`}>
                                                        {plan === 'professional' && (
                                                            <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                                                                Most Popular
                                                            </div>
                                                        )}
                                                        <div className="flex items-center justify-between mb-4">
                                                            <h4 className="text-lg font-bold text-white capitalize">{plan}</h4>
                                                            <div className="text-right">
                                                                <span className="text-3xl font-bold text-white">{details.price}</span>
                                                                <span className="text-gray-300">/month</span>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2 mb-6">
                                                            <div className="flex items-center gap-2 text-gray-200">
                                                                <FiUsers className="w-4 h-4" />
                                                                <span>Up to {details.users} users</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-gray-200">
                                                                <FiCheck className="w-4 h-4" />
                                                                <span>{details.features}</span>
                                                            </div>
                                                        </div>
                                                        <button className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${plan === 'professional'
                                                            ? `bg-gradient-to-r ${product.color} text-white hover:shadow-lg transform hover:scale-105`
                                                            : 'bg-white/20 text-white hover:bg-white/30'
                                                            }`}>
                                                            Get Started
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Comparison */}
            <section className="relative py-24">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                <div className="relative container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Why Choose{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                                    Our Products?
                                </span>
                            </h2>
                            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                                Built with modern technology stack and designed for scalability, security, and user experience.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: FiShield,
                                    title: "Enterprise Security",
                                    description: "Bank-level security with end-to-end encryption and compliance standards",
                                    features: ["SSL Encryption", "Data Backup", "GDPR Compliant", "SOC 2 Certified"]
                                },
                                {
                                    icon: FiZap,
                                    title: "High Performance",
                                    description: "Lightning-fast performance with 99.9% uptime guarantee",
                                    features: ["Cloud Infrastructure", "Auto Scaling", "CDN Integration", "Real-time Sync"]
                                },
                                {
                                    icon: FiSmartphone,
                                    title: "Multi-Platform",
                                    description: "Access from anywhere with web, mobile, and desktop applications",
                                    features: ["Web Application", "Mobile Apps", "Desktop Client", "API Access"]
                                }
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center hover:border-purple-400/50 transition-all duration-500"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                                    <p className="text-gray-200 mb-6 leading-relaxed">{feature.description}</p>
                                    <div className="space-y-2">
                                        {feature.features.map((item, itemIndex) => (
                                            <div key={itemIndex} className="flex items-center justify-center gap-2 text-gray-300">
                                                <FiCheck className="w-4 h-4 text-green-400" />
                                                <span className="text-sm">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-24">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse transform -translate-x-1/2 -translate-y-1/2"></div>
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
                                Ready to{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                                    Get Started?
                                </span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-xl text-gray-200 mb-8 leading-relaxed"
                            >
                                Join thousands of businesses already using our products to streamline their operations and boost productivity.
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
                                    Schedule Demo
                                    <FiArrowRight className="w-5 h-5" />
                                </button>

                                <button className="border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300">
                                    Contact Sales
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductsPage;