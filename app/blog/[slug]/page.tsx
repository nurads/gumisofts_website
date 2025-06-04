"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types/api';
import { apiService } from '@/services/api';
import { FiClock, FiEye, FiHeart, FiShare2, FiArrowLeft, FiCalendar, FiUser, FiBookmark } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import "react-toastify/dist/ReactToastify.css";

const BlogDetailPage = () => {
    const params = useParams();
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                if (!params.slug) return;

                const [blogResponse, relatedResponse] = await Promise.all([
                    apiService.getBlog(params.slug as string),
                    apiService.getBlogs()
                ]);

                if (blogResponse.success) {
                    setBlog(blogResponse.data);
                }

                if (relatedResponse.success) {
                    // Get related blogs from the same category
                    const related = relatedResponse.data
                        .filter((b: BlogPost) => b.id !== blogResponse.data?.id && b.category === blogResponse.data?.category)
                        .slice(0, 3);
                    setRelatedBlogs(related);
                }
            } catch (error) {
                console.error('Failed to fetch blog details:', error);
                toast.error('Failed to load blog post');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogDetails();
    }, [params.slug]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleLike = () => {
        setLiked(!liked);
        toast.success(liked ? 'Removed from favorites' : 'Added to favorites');
    };

    const handleBookmark = () => {
        setBookmarked(!bookmarked);
        toast.success(bookmarked ? 'Bookmark removed' : 'Post bookmarked');
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: blog?.title,
                text: blog?.excerpt,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard!');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-white text-xl">Loading article...</p>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
                    <p className="text-gray-300 mb-8">The article you&apos;re looking for doesn&apos;t exist.</p>
                    <Link
                        href="/blog"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                    >
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

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
                    <div className="max-w-4xl mx-auto">
                        {/* Back Button */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-8"
                        >
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300"
                            >
                                <FiArrowLeft className="w-5 h-5" />
                                Back to Blog
                            </Link>
                        </motion.div>

                        {/* Article Meta */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-8"
                        >
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
                                <span className="bg-purple-600/30 text-purple-200 px-3 py-2 rounded-full border border-purple-400/30">
                                    {blog.category}
                                </span>
                                <span className="flex items-center gap-2">
                                    <FiCalendar className="w-4 h-4" />
                                    {formatDate(blog.publishedAt)}
                                </span>
                                <span className="flex items-center gap-2">
                                    <FiClock className="w-4 h-4" />
                                    {blog.readTime} min read
                                </span>
                                <span className="flex items-center gap-2">
                                    <FiEye className="w-4 h-4" />
                                    {blog.views} views
                                </span>
                            </div>
                        </motion.div>

                        {/* Article Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight"
                        >
                            {blog.title}
                        </motion.h1>

                        {/* Article Excerpt */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="text-xl text-gray-200 mb-8 leading-relaxed"
                        >
                            {blog.excerpt}
                        </motion.p>

                        {/* Author Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="flex items-center justify-between mb-8"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {blog.author.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-semibold text-white">{blog.author.name}</div>
                                    <div className="text-sm text-gray-300">{blog.author.bio}</div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleLike}
                                    className={`p-3 rounded-lg transition-all duration-300 ${liked
                                        ? 'bg-red-500/20 text-red-400 border border-red-400/30'
                                        : 'bg-white/10 text-gray-300 hover:text-white border border-white/20 hover:border-white/40'
                                        }`}
                                >
                                    <FiHeart className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleBookmark}
                                    className={`p-3 rounded-lg transition-all duration-300 ${bookmarked
                                        ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30'
                                        : 'bg-white/10 text-gray-300 hover:text-white border border-white/20 hover:border-white/40'
                                        }`}
                                >
                                    <FiBookmark className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="p-3 bg-white/10 text-gray-300 hover:text-white rounded-lg transition-all duration-300 border border-white/20 hover:border-white/40"
                                >
                                    <FiShare2 className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="relative py-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl"
                        >
                            {/* Article Image */}
                            <div className="mb-12">
                                <div className="relative h-64 md:h-96 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-2xl overflow-hidden">
                                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                        <div className="text-center text-white">
                                            <FiUser className="w-16 h-16 mx-auto mb-4" />
                                            <p className="text-lg">{blog.title}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Article Body */}
                            <div className="prose prose-lg prose-invert max-w-none">
                                <div className="text-gray-200 leading-relaxed space-y-6">
                                    <p className="text-xl leading-relaxed">
                                        {blog.content || "This is where the full article content would be displayed. The content would include detailed information about the topic, code examples, images, and other relevant media."}
                                    </p>

                                    <p className="leading-relaxed">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>

                                    <p className="leading-relaxed">
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>

                                    {/* Code Example */}
                                    <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-600">
                                        <pre className="text-green-400 text-sm overflow-x-auto">
                                            <code>{`// Example code snippet
function greetUser(name) {
    return \`Hello, \${name}! Welcome to our blog.\`;
}

console.log(greetUser("Developer"));`}</code>
                                        </pre>
                                    </div>

                                    <p className="leading-relaxed">
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                    </p>
                                </div>
                            </div>

                            {/* Article Tags */}
                            <div className="mt-12 pt-8 border-t border-white/20">
                                <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
                                <div className="flex flex-wrap gap-3">
                                    {blog.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-white/20 text-gray-200 px-4 py-2 rounded-full text-sm border border-white/30 hover:bg-white/30 transition-colors duration-300"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Related Articles */}
            {relatedBlogs.length > 0 && (
                <section className="relative py-16">
                    <div className="container mx-auto px-6">
                        <div className="max-w-6xl mx-auto">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
                            >
                                Related{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                                    Articles
                                </span>
                            </motion.h2>

                            <div className="grid md:grid-cols-3 gap-8">
                                {relatedBlogs.map((relatedBlog, index) => (
                                    <motion.article
                                        key={relatedBlog.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -10, scale: 1.02 }}
                                        className="group relative bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20 hover:border-purple-400/50 transition-all duration-500"
                                    >
                                        <div className="relative">
                                            <div className="relative h-48 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
                                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                                    <FiUser className="text-white text-4xl" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
                                                <span className="flex items-center gap-2">
                                                    <FiCalendar className="w-4 h-4" />
                                                    {formatDate(relatedBlog.publishedAt)}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <FiClock className="w-4 h-4" />
                                                    {relatedBlog.readTime} min
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                                                {relatedBlog.title}
                                            </h3>

                                            <p className="text-gray-200 mb-6 line-clamp-3 leading-relaxed">
                                                {relatedBlog.excerpt}
                                            </p>

                                            <Link
                                                href={`/blog/${relatedBlog.slug}`}
                                                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300"
                                            >
                                                Read More
                                                <FiArrowLeft className="w-4 h-4 rotate-180" />
                                            </Link>
                                        </div>

                                        {/* Hover Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                                    </motion.article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Newsletter CTA */}
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
                                Stay{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
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
                                    className="flex-1 px-6 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
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

export default BlogDetailPage; 