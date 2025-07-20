"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types/api';
import { apiService } from '@/services/api';
import { FiClock, FiEye, FiHeart, FiArrowRight, FiCalendar, FiBookOpen } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import Link from 'next/link';
import "react-toastify/dist/ReactToastify.css";

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
                    apiService.getBlogs(true)
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

    const filteredBlogs = selectedCategory === 'all'
        ? blogs
        : blogs.filter(blog => blog.category.toLowerCase() === selectedCategory);

    const categories = ['all', ...new Set(blogs.map(blog => blog.category.toLowerCase()))];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const BlogCard = ({ blog, featured = false }: { blog: BlogPost; featured?: boolean }) => (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className={`group relative bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20 hover:border-purple-400/50 transition-all duration-500 ${featured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
        >
            <div className="relative">
                <div className={`relative ${featured ? 'h-64 md:h-80' : 'h-48'} bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500`}>
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <FiBookOpen className="text-white text-6xl" />
                    </div>
                    <div className="absolute top-4 left-4">
                        <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-3 py-2 rounded-full text-sm font-medium">
                            {blog.category}
                        </span>
                    </div>
                    {blog.featured && (
                        <div className="absolute top-4 right-4">
                            <span className="bg-yellow-500/80 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm font-medium">
                                ⭐ Featured
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className={`p-6 ${featured ? 'md:p-8' : ''}`}>
                <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
                    <span className="flex items-center gap-2">
                        <FiCalendar className="w-4 h-4" />
                        {formatDate(blog.publishedAt)}
                    </span>
                    <span className="flex items-center gap-2">
                        <FiClock className="w-4 h-4" />
                        {blog.readTime} min
                    </span>
                    <span className="flex items-center gap-2">
                        <FiEye className="w-4 h-4" />
                        {blog.views}
                    </span>
                </div>

                <h2 className={`font-bold text-white mb-4 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300 ${featured ? 'text-2xl md:text-3xl' : 'text-xl'
                    }`}>
                    {blog.title}
                </h2>

                <p className={`text-gray-300 mb-6 line-clamp-3 leading-relaxed ${featured ? 'text-lg' : ''}`}>
                    {blog.excerpt}
                </p>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {blog.author.name.charAt(0)}
                        </div>
                        <div>
                            <div className="font-medium text-white">{blog.author.name}</div>
                            <div className="text-sm text-gray-400">{blog.author.bio}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-gray-300">
                            <FiHeart className="w-4 h-4" />
                            <span className="text-sm">{blog.likes}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {blog.tags.slice(0, 3).map((tag, index) => (
                        <span
                            key={index}
                            className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm border border-white/20"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <Link
                    href={`/blog/${blog.slug}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                    Read Full Article
                    <FiArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
        </motion.article>
    );

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
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block bg-purple-600/30 text-purple-200 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-purple-400/30"
                        >
                            📚 Tech Insights
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-5xl md:text-7xl font-bold mb-6 text-white"
                        >
                            Our{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                                Blog
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-xl md:text-2xl mb-12 text-gray-200 leading-relaxed"
                        >
                            Insights, tutorials, and trends from the world of software development and technology innovation
                        </motion.p>


                    </div>
                </div>
            </section>

            {/* Categories Filter */}
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
                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl'
                                        : 'bg-white/20 text-gray-200 hover:bg-white/30 hover:text-white'
                                        }`}
                                >
                                    {category === 'all' ? 'All Posts' : category.charAt(0).toUpperCase() + category.slice(1)}
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
                                className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
                            >
                                Featured{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                    Articles
                                </span>
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
                            className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
                        >
                            Latest{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Articles
                            </span>
                        </motion.h2>

                        {loading ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[...Array(6)].map((_, index) => (
                                    <div key={index} className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 animate-pulse border border-white/30">
                                        <div className="h-48 bg-gray-500 rounded-2xl mb-6"></div>
                                        <div className="h-4 bg-gray-500 rounded mb-4"></div>
                                        <div className="h-3 bg-gray-500 rounded mb-2"></div>
                                        <div className="h-3 bg-gray-500 rounded mb-6"></div>
                                        <div className="h-10 bg-gray-500 rounded"></div>
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
                                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
                                    <h3 className="text-2xl font-bold text-white mb-4">No articles found</h3>
                                    <p className="text-gray-200 mb-6">
                                        No articles found in the selected category. Try choosing a different category.
                                    </p>
                                    <button
                                        onClick={() => setSelectedCategory('all')}
                                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
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
            <section className="relative py-24">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse transform -translate-x-1/2 -translate-y-1/2"></div>
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
                                Stay{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                    Updated
                                </span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-xl text-gray-200 mb-8 leading-relaxed"
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
                                    className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                />
                                <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
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