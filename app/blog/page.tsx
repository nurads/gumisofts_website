"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types/api';
import { apiService } from '@/services/api';
import {
    FiClock,
    FiEye,
    FiHeart,
    FiArrowRight,
    FiCalendar,
    FiBookOpen,
} from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';

const BlogPage = () => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [featuredBlogs, setFeaturedBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const [allBlogsResponse, featuredBlogsResponse] = await Promise.all([
                    apiService.getBlogs(),
                    apiService.getBlogs(true),
                ]);

                if (allBlogsResponse.success) {
                    setBlogs(allBlogsResponse.data);
                }
                if (featuredBlogsResponse.success) {
                    setFeaturedBlogs(featuredBlogsResponse.data);
                }
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
                toast.error('Failed to load blog posts');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const filteredBlogs =
        selectedCategory === 'all'
            ? blogs
            : blogs.filter((blog) => blog.category.toLowerCase() === selectedCategory);

    const categories = ['all', ...new Set(blogs.map((blog) => blog.category.toLowerCase()))];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const BlogCard = ({ blog, featured = false }: { blog: BlogPost; featured?: boolean }) => (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className={`group relative bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#2b3991] hover:shadow-md transition-all duration-300 ${featured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
        >
            <div
                className={`relative ${featured ? 'h-64 md:h-80' : 'h-48'} bg-[#2b3991] flex items-center justify-center`}
            >
                <FiBookOpen className="text-white text-6xl opacity-40" />
                <div className="absolute top-4 left-4">
                    <span className="bg-white text-[#2b3991] border border-gray-200 px-3 py-1.5 rounded-full text-sm font-medium">
                        {blog.category}
                    </span>
                </div>
                {blog.featured && (
                    <div className="absolute top-4 right-4">
                        <span className="bg-white text-[#2b3991] border border-gray-200 px-3 py-1.5 rounded-full text-sm font-medium">
                            Featured
                        </span>
                    </div>
                )}
            </div>

            <div className={`p-6 ${featured ? 'md:p-8' : ''}`}>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5">
                        <FiCalendar className="w-4 h-4" />
                        {formatDate(blog.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <FiClock className="w-4 h-4" />
                        {blog.readTime} min
                    </span>
                    <span className="flex items-center gap-1.5">
                        <FiEye className="w-4 h-4" />
                        {blog.views}
                    </span>
                </div>

                <h2
                    className={`font-bold text-[#2b3991] mb-4 line-clamp-2 group-hover:text-[#1f2a6b] transition-colors duration-300 ${featured ? 'text-2xl md:text-3xl' : 'text-xl'
                        }`}
                >
                    {blog.title}
                </h2>

                <p className={`text-gray-600 mb-6 line-clamp-3 leading-relaxed ${featured ? 'text-lg' : ''}`}>
                    {blog.excerpt}
                </p>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#2b3991] rounded-full flex items-center justify-center text-white font-bold">
                            {blog.author.name.charAt(0)}
                        </div>
                        <div>
                            <div className="font-medium text-[#2b3991]">{blog.author.name}</div>
                            <div className="text-sm text-gray-500">{blog.author.bio}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-gray-500">
                            <FiHeart className="w-4 h-4" />
                            <span className="text-sm">{blog.likes}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {blog.tags.slice(0, 3).map((tag, index) => (
                        <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm border border-gray-200"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <Link
                    href={`/blog/${blog.slug}`}
                    className="w-full bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-sm flex items-center justify-center gap-2"
                >
                    Read Full Article
                    <FiArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.article>
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-32 bg-gray-50 border-b border-gray-200">
                <div className="relative container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block bg-white text-[#2b3991] border border-gray-200 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-sm"
                        >
                            Tech Insights
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-5xl md:text-7xl font-bold mb-6 text-[#2b3991]"
                        >
                            Our <span className="text-gray-700">Blog</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-xl md:text-2xl mb-12 text-gray-600 leading-relaxed"
                        >
                            Insights, tutorials, and trends from the world of software development and technology innovation
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Categories Filter */}
            <section className="relative py-6 bg-white border-b border-gray-200 sticky top-20 z-10 shadow-sm">
                <div className="container mx-auto px-6">
                    <div className="flex justify-center">
                        <div className="flex flex-wrap gap-3">
                            {categories.map((category) => (
                                <motion.button
                                    key={category}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-6 py-3 rounded-full font-medium transition-colors duration-300 ${selectedCategory === category
                                        ? 'bg-[#2b3991] text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {category === 'all'
                                        ? 'All Posts'
                                        : category.charAt(0).toUpperCase() + category.slice(1)}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Posts Section */}
            {featuredBlogs.length > 0 && (
                <section className="relative py-16">
                    <div className="container mx-auto px-6">
                        <div className="max-w-7xl mx-auto">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-4xl font-bold text-[#2b3991] mb-12 text-center"
                            >
                                Featured <span className="text-gray-700">Articles</span>
                            </motion.h2>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {featuredBlogs.map((blog) => (
                                    <BlogCard key={blog.id} blog={blog} featured />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* All Posts Section */}
            <section className="relative py-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold text-[#2b3991] mb-12 text-center"
                        >
                            Latest <span className="text-gray-700">Articles</span>
                        </motion.h2>

                        {loading ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[...Array(6)].map((_, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-3xl p-6 animate-pulse border border-gray-200"
                                    >
                                        <div className="h-48 bg-gray-200 rounded-2xl mb-6"></div>
                                        <div className="h-4 bg-gray-200 rounded mb-4"></div>
                                        <div className="h-3 bg-gray-200 rounded mb-2"></div>
                                        <div className="h-3 bg-gray-200 rounded mb-6"></div>
                                        <div className="h-10 bg-gray-200 rounded"></div>
                                    </div>
                                ))}
                            </div>
                        ) : filteredBlogs.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredBlogs.map((blog) => (
                                    <BlogCard key={blog.id} blog={blog} />
                                ))}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-12"
                            >
                                <div className="bg-gray-50 rounded-3xl p-12 border border-gray-200 shadow-md">
                                    <h3 className="text-2xl font-bold text-[#2b3991] mb-4">No articles found</h3>
                                    <p className="text-gray-600 mb-6">
                                        No articles found in the selected category. Try choosing a different category.
                                    </p>
                                    <button
                                        onClick={() => setSelectedCategory('all')}
                                        className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                                    >
                                        View All Articles
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="relative py-24 bg-gray-50 border-t border-gray-200">
                <div className="relative container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="bg-white rounded-3xl p-12 border border-gray-200 shadow-md">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl font-bold mb-6 text-[#2b3991]"
                            >
                                Stay <span className="text-gray-700">Updated</span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-xl text-gray-600 mb-8 leading-relaxed"
                            >
                                Subscribe to our newsletter and get the latest tech insights delivered to your inbox.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
                            >
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2b3991] focus:border-transparent transition-all duration-300"
                                />
                                <button className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-sm">
                                    Subscribe
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

export default BlogPage;
