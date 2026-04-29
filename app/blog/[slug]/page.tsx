"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types/api';
import { apiService } from '@/services/api';
import {
    FiClock,
    FiEye,
    FiHeart,
    FiShare2,
    FiArrowLeft,
    FiCalendar,
    FiUser,
    FiBookmark,
} from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';

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
                    apiService.getBlogs(),
                ]);

                if (blogResponse.success) {
                    setBlog(blogResponse.data);
                }

                if (relatedResponse.success) {
                    const related = relatedResponse.data
                        .filter(
                            (b: BlogPost) =>
                                b.id !== blogResponse.data?.id &&
                                b.category === blogResponse.data?.category
                        )
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
            year: 'numeric',
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
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-[#2b3991] rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-700 text-xl">Loading article...</p>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-[#2b3991] mb-4">Article Not Found</h1>
                    <p className="text-gray-600 mb-8">The article you&apos;re looking for doesn&apos;t exist.</p>
                    <Link
                        href="/blog"
                        className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                    >
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-24 bg-gray-50 border-b border-gray-200">
                <div className="relative container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-8"
                        >
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-[#2b3991] hover:text-[#1f2a6b] transition-colors duration-300 font-medium"
                            >
                                <FiArrowLeft className="w-5 h-5" />
                                Back to Blog
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-8"
                        >
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                                <span className="bg-white text-[#2b3991] px-3 py-1.5 rounded-full border border-gray-200 font-medium">
                                    {blog.category}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <FiCalendar className="w-4 h-4" />
                                    {formatDate(blog.publishedAt)}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <FiClock className="w-4 h-4" />
                                    {blog.readTime} min read
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <FiEye className="w-4 h-4" />
                                    {blog.views} views
                                </span>
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-4xl md:text-6xl font-bold mb-8 text-[#2b3991] leading-tight"
                        >
                            {blog.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="text-xl text-gray-700 mb-8 leading-relaxed"
                        >
                            {blog.excerpt}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="flex items-center justify-between flex-wrap gap-4"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#2b3991] rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {blog.author.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-semibold text-[#2b3991]">{blog.author.name}</div>
                                    <div className="text-sm text-gray-600">{blog.author.bio}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleLike}
                                    className={`p-3 rounded-lg transition-all duration-300 ${liked
                                        ? 'bg-[#2b3991] text-white border border-[#2b3991]'
                                        : 'bg-white text-gray-700 hover:text-[#2b3991] border border-gray-200 hover:border-[#2b3991]'
                                        }`}
                                    aria-label="Like"
                                >
                                    <FiHeart className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleBookmark}
                                    className={`p-3 rounded-lg transition-all duration-300 ${bookmarked
                                        ? 'bg-[#2b3991] text-white border border-[#2b3991]'
                                        : 'bg-white text-gray-700 hover:text-[#2b3991] border border-gray-200 hover:border-[#2b3991]'
                                        }`}
                                    aria-label="Bookmark"
                                >
                                    <FiBookmark className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="p-3 bg-white text-gray-700 hover:text-[#2b3991] rounded-lg transition-all duration-300 border border-gray-200 hover:border-[#2b3991]"
                                    aria-label="Share"
                                >
                                    <FiShare2 className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="relative py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-md"
                        >
                            {/* Article Image */}
                            <div className="mb-12">
                                <div className="relative h-64 md:h-96 bg-[#2b3991] rounded-2xl overflow-hidden flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <FiUser className="w-16 h-16 mx-auto mb-4 opacity-60" />
                                        <p className="text-lg">{blog.title}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-lg max-w-none">
                                <div className="text-gray-700 leading-relaxed space-y-6">
                                    <p className="text-xl leading-relaxed">
                                        {blog.content ||
                                            'This is where the full article content would be displayed. The content would include detailed information about the topic, code examples, images, and other relevant media.'}
                                    </p>

                                    <p className="leading-relaxed">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>

                                    <p className="leading-relaxed">
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>

                                    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                                        <pre className="text-green-400 text-sm overflow-x-auto">
                                            <code>{`function greetUser(name) {
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

                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-[#2b3991] mb-4">Tags</h3>
                                <div className="flex flex-wrap gap-3">
                                    {blog.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm border border-gray-200 hover:bg-gray-200 transition-colors duration-300"
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
                <section className="relative py-16 bg-gray-50 border-t border-gray-200">
                    <div className="container mx-auto px-6">
                        <div className="max-w-6xl mx-auto">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-4xl font-bold text-[#2b3991] mb-12 text-center"
                            >
                                Related <span className="text-gray-700">Articles</span>
                            </motion.h2>

                            <div className="grid md:grid-cols-3 gap-8">
                                {relatedBlogs.map((relatedBlog, index) => (
                                    <motion.article
                                        key={relatedBlog.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -6 }}
                                        className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#2b3991] hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="relative h-48 bg-[#2b3991] flex items-center justify-center">
                                            <FiUser className="text-white text-4xl opacity-50" />
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                                <span className="flex items-center gap-1.5">
                                                    <FiCalendar className="w-4 h-4" />
                                                    {formatDate(relatedBlog.publishedAt)}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <FiClock className="w-4 h-4" />
                                                    {relatedBlog.readTime} min
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-[#2b3991] mb-4 line-clamp-2 group-hover:text-[#1f2a6b] transition-colors duration-300">
                                                {relatedBlog.title}
                                            </h3>

                                            <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                                                {relatedBlog.excerpt}
                                            </p>

                                            <Link
                                                href={`/blog/${relatedBlog.slug}`}
                                                className="inline-flex items-center gap-2 text-[#2b3991] hover:text-[#1f2a6b] font-medium transition-colors duration-300"
                                            >
                                                Read More
                                                <FiArrowLeft className="w-4 h-4 rotate-180" />
                                            </Link>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Newsletter CTA */}
            <section className="relative py-24 bg-white border-t border-gray-200">
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

export default BlogDetailPage;
