"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    FiPackage,
    FiArrowRight,
    FiCheck,
    FiTrendingUp,
    FiZap,
} from "react-icons/fi";

const featuredProducts = [
    {
        id: "bita-business",
        name: "Bita Business",
        tagline: "Inventory & sales management",
        description:
            "Run your retail or wholesale business end to end — track stock in real time, sell from any device, manage purchases, and see exactly where your money is going.",
        icon: FiPackage,
        highlights: [
            "Real-time inventory across locations",
            "Point-of-sale & invoicing",
            "Purchases & supplier management",
            "Sales reports and profit insights",
            "Customer & supplier ledgers",
            "Role-based access for your team",
        ],
        startingAt: "Free to start",
        ctaLabel: "View Bita Business",
        href: "/products#bita-business",
        demoUrl: "https://bita-demo.gumisofts.com",
    },
];

const valueProps = [
    {
        icon: FiZap,
        title: "Built by people who run businesses",
        body: "We use these products ourselves, so they're shaped by real day-to-day workflows — not theory.",
    },
    {
        icon: FiTrendingUp,
        title: "Designed to grow with you",
        body: "Start free or small, scale up to enterprise without changing tools or losing your data.",
    },
];

const Products = () => {
    return (
        <section
            id="products"
            className="relative py-24 bg-white text-gray-900 overflow-hidden"
        >
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mb-14"
                >
                    <div className="inline-flex items-center gap-2 bg-gray-100 text-[#2b3991] border border-gray-200 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
                        <span className="w-2 h-2 rounded-full bg-[#2b3991]" />
                        Our Products
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-[#2b3991] mb-4">
                        Software products you can use{" "}
                        <span className="text-gray-700">today</span>
                    </h2>

                    <p className="text-lg text-gray-600 leading-relaxed">
                        Beyond custom development, we ship and maintain our own SaaS
                        products. Pick what fits your team and start running better
                        operations in minutes.
                    </p>
                </motion.div>

                {/* Product Cards */}
                <div className="max-w-3xl mx-auto mb-16">
                    {featuredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -6 }}
                            className="group bg-white border border-gray-200 hover:border-[#2b3991] rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 bg-[#2b3991] rounded-xl flex items-center justify-center shadow-sm">
                                    <product.icon className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-[#2b3991]">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">{product.tagline}</p>
                                </div>
                            </div>

                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {product.description}
                            </p>

                            <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2.5 mb-6">
                                {product.highlights.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-2.5 text-gray-700"
                                    >
                                        <span className="w-5 h-5 bg-[#2b3991] rounded-full flex items-center justify-center flex-shrink-0">
                                            <FiCheck className="w-3 h-3 text-white" />
                                        </span>
                                        <span className="text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto pt-6 border-t border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">
                                            Starts at
                                        </div>
                                        <div className="text-lg font-bold text-[#2b3991]">
                                            {product.startingAt}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link
                                        href={product.href}
                                        className="flex-1 bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-5 py-3 rounded-lg font-semibold text-center transition-colors duration-300 flex items-center justify-center gap-2"
                                    >
                                        {product.ctaLabel}
                                        <FiArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        href={product.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 border-2 border-gray-300 hover:border-[#2b3991] text-[#2b3991] hover:bg-gray-50 px-5 py-3 rounded-lg font-semibold text-center transition-all duration-300"
                                    >
                                        Try Demo
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Value Props */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-6 bg-gray-50 border border-gray-200 rounded-2xl p-8"
                >
                    {valueProps.map((vp) => (
                        <div key={vp.title} className="flex gap-4">
                            <div className="w-11 h-11 bg-[#2b3991] rounded-lg flex items-center justify-center flex-shrink-0">
                                <vp.icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-[#2b3991] mb-1">
                                    {vp.title}
                                </h4>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {vp.body}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Products;
