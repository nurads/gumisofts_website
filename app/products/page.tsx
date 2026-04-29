"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    FiUsers,
    FiPackage,
    FiBarChart,
    FiShield,
    FiZap,
    FiArrowRight,
    FiCheck,
    FiStar,
    FiGlobe,
    FiSmartphone,
} from 'react-icons/fi';
import Link from 'next/link';

const ProductsPage = () => {
    const products = [
        {
            id: 'bita-business',
            name: 'Bita Business',
            tagline: 'Inventory & Sales Management Made Simple',
            description:
                'An all-in-one inventory and sales management platform built for retailers, wholesalers, and growing businesses. Track stock in real time, sell from any device, manage purchases and suppliers, and see exactly where your money is going — across one or many stores.',
            icon: FiPackage,
            features: [
                'Real-time Inventory Tracking',
                'Multi-store & Multi-warehouse',
                'Point-of-Sale (POS) & Invoicing',
                'Purchases & Supplier Management',
                'Customer & Supplier Ledgers',
                'Sales, Profit & Stock Reports',
                'Barcode & SKU Support',
                'Role-based Team Access',
            ],
            benefits: [
                'Eliminate stock-outs and over-ordering',
                'Speed up checkout with a built-in POS',
                'Know your true profit, per product',
                'Run multiple branches from one dashboard',
            ],
            pricing: {
                starter: { price: '0 ETB', users: 3, features: 'Single store, core inventory & POS' },
                professional: { price: '500 ETB', users: 15, features: 'Multi-store, full reports & ledgers' },
                enterprise: { price: '1,200 ETB', users: 'Unlimited', features: 'API access, custom integrations & SLA' },
            },
            demoUrl: 'https://bita-demo.gumisofts.com',
        },
    ];

    const stats = [
        { icon: FiUsers, value: '500+', label: 'Active Users' },
        { icon: FiGlobe, value: '15+', label: 'Countries' },
        { icon: FiBarChart, value: '99.9%', label: 'Uptime' },
        { icon: FiShield, value: '100%', label: 'Secure' },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden bg-gray-50 border-b border-gray-200">
                <div className="relative container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block bg-white text-[#2b3991] border border-gray-200 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-sm"
                        >
                            Our Products
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-5xl md:text-7xl font-bold mb-6 text-[#2b3991]"
                        >
                            Built for <span className="text-gray-700">Success</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-xl md:text-2xl mb-12 text-gray-600 leading-relaxed"
                        >
                            Discover our in-house developed products designed to streamline your business operations and boost productivity.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
                        >
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 bg-[#2b3991] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                                        <stat.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="text-3xl md:text-4xl font-bold text-[#2b3991] mb-2">{stat.value}</div>
                                    <div className="text-gray-600 text-sm">{stat.label}</div>
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
                                className="mb-32"
                            >
                                <div
                                    className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                        }`}
                                >
                                    {/* Product Info */}
                                    <div className="flex-1 space-y-8">
                                        <div>
                                            <div className="w-20 h-20 bg-[#2b3991] rounded-2xl flex items-center justify-center mb-6 shadow-md">
                                                <product.icon className="w-10 h-10 text-white" />
                                            </div>
                                            <h2 className="text-4xl md:text-5xl font-bold text-[#2b3991] mb-4">
                                                {product.name}
                                            </h2>
                                            <p className="text-xl font-medium mb-6 text-gray-700">
                                                {product.tagline}
                                            </p>
                                            <p className="text-lg text-gray-600 leading-relaxed">
                                                {product.description}
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-bold text-[#2b3991] mb-6">Key Features</h3>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {product.features.map((feature, featureIndex) => (
                                                    <div key={featureIndex} className="flex items-center gap-3">
                                                        <div className="w-6 h-6 bg-[#2b3991] rounded-full flex items-center justify-center flex-shrink-0">
                                                            <FiCheck className="w-3 h-3 text-white" />
                                                        </div>
                                                        <span className="text-gray-700">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-bold text-[#2b3991] mb-6">Benefits</h3>
                                            <div className="space-y-3">
                                                {product.benefits.map((benefit, benefitIndex) => (
                                                    <div key={benefitIndex} className="flex items-center gap-3">
                                                        <FiStar className="w-5 h-5 text-[#2b3991] flex-shrink-0" />
                                                        <span className="text-gray-700">{benefit}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Link
                                                href={product.demoUrl}
                                                target="_blank"
                                                className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-300 shadow-md flex items-center justify-center gap-2"
                                            >
                                                Try Demo
                                                <FiArrowRight className="w-5 h-5" />
                                            </Link>
                                            <button className="border-2 border-gray-300 hover:border-[#2b3991] text-[#2b3991] hover:bg-gray-50 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300">
                                                Learn More
                                            </button>
                                        </div>
                                    </div>

                                    {/* Pricing Showcase */}
                                    <div className="flex-1 w-full">
                                        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md">
                                            <div className="space-y-6">
                                                <h3 className="text-2xl font-bold text-[#2b3991] mb-6 text-center">
                                                    Pricing Plans
                                                </h3>

                                                {Object.entries(product.pricing).map(([plan, details]) => (
                                                    <div
                                                        key={plan}
                                                        className={`bg-gray-50 rounded-2xl p-6 border ${plan === 'professional'
                                                            ? 'border-[#2b3991] ring-2 ring-[#2b3991]/30'
                                                            : 'border-gray-200'
                                                            }`}
                                                    >
                                                        {plan === 'professional' && (
                                                            <div className="bg-[#2b3991] text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                                                                Most Popular
                                                            </div>
                                                        )}
                                                        <div className="flex items-center justify-between mb-4">
                                                            <h4 className="text-lg font-bold text-[#2b3991] capitalize">
                                                                {plan}
                                                            </h4>
                                                            <div className="text-right">
                                                                <span className="text-3xl font-bold text-[#2b3991]">
                                                                    {details.price}
                                                                </span>
                                                                <span className="text-gray-600">/month</span>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2 mb-6">
                                                            <div className="flex items-center gap-2 text-gray-600">
                                                                <FiUsers className="w-4 h-4" />
                                                                <span>Up to {details.users} users</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-gray-600">
                                                                <FiCheck className="w-4 h-4" />
                                                                <span>{details.features}</span>
                                                            </div>
                                                        </div>
                                                        <button
                                                            className={`w-full py-3 rounded-lg font-semibold transition-colors duration-300 ${plan === 'professional'
                                                                ? 'bg-[#2b3991] text-white hover:bg-[#1f2a6b]'
                                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                                }`}
                                                        >
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
            <section className="relative py-24 bg-gray-50 border-t border-gray-200">
                <div className="relative container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-[#2b3991] mb-6">
                                Why Choose <span className="text-gray-700">Our Products?</span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                Built with a modern technology stack and designed for scalability, security, and user experience.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: FiShield,
                                    title: 'Enterprise Security',
                                    description:
                                        'Bank-level security with end-to-end encryption and compliance standards',
                                    features: ['SSL Encryption', 'Data Backup', 'GDPR Compliant', 'SOC 2 Certified'],
                                },
                                {
                                    icon: FiZap,
                                    title: 'High Performance',
                                    description: 'Lightning-fast performance with 99.9% uptime guarantee',
                                    features: ['Cloud Infrastructure', 'Auto Scaling', 'CDN Integration', 'Real-time Sync'],
                                },
                                {
                                    icon: FiSmartphone,
                                    title: 'Multi-Platform',
                                    description: 'Access from anywhere with web, mobile, and desktop applications',
                                    features: ['Web Application', 'Mobile Apps', 'Desktop Client', 'API Access'],
                                },
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-3xl p-8 border border-gray-200 text-center hover:border-[#2b3991] hover:shadow-md transition-all duration-300"
                                >
                                    <div className="w-16 h-16 bg-[#2b3991] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#2b3991] mb-4">{feature.title}</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                                    <div className="space-y-2">
                                        {feature.features.map((item, itemIndex) => (
                                            <div
                                                key={itemIndex}
                                                className="flex items-center justify-center gap-2 text-gray-600"
                                            >
                                                <FiCheck className="w-4 h-4 text-[#2b3991]" />
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
            <section className="relative py-24 bg-white">
                <div className="relative container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="bg-gray-50 rounded-3xl p-12 border border-gray-200 shadow-md">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl font-bold mb-6 text-[#2b3991]"
                            >
                                Ready to <span className="text-gray-700">Get Started?</span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-xl text-gray-600 mb-8 leading-relaxed"
                            >
                                Join thousands of businesses already using our products to streamline operations and boost productivity.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="flex flex-col sm:flex-row gap-4 justify-center"
                            >
                                <Link
                                    href="/#contact"
                                    className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-300 shadow-md flex items-center justify-center gap-2"
                                >
                                    Schedule Demo
                                    <FiArrowRight className="w-5 h-5" />
                                </Link>

                                <Link
                                    href="/#contact"
                                    className="border-2 border-gray-300 hover:border-[#2b3991] text-[#2b3991] hover:bg-gray-50 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 text-center"
                                >
                                    Contact Sales
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductsPage;
