"use client";
import React, { useState } from 'react';
import { Job, JobApplicationRequest } from '@/types/api';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUpload, FiUser, FiMail, FiLinkedin, FiFileText, FiArrowRight } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { applyJob } from '@/services/careers';

interface JobApplicationModalProps {
    job: Job | null;
    isOpen: boolean;
    onClose: () => void;
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ job, isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        linkedIn: '',
        coverLetter: ''
    });
    const [resume, setResume] = useState<File | null>(null);

    const { mutate: applyJobMutation, isPending } = useMutation({
        mutationFn: (data: JobApplicationRequest) => applyJob(job?.id || '', data),
        onSuccess: () => {
            toast.success('Application submitted successfully!');
            setFormData({ name: '', email: '', linkedIn: '', coverLetter: '' });
            setResume(null);
            onClose();
        },
        onError: () => {
            toast.error('Failed to submit application. Please try again.');
        }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file type
            const allowedTypes = ['.pdf', '.doc', '.docx'];
            const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

            if (!allowedTypes.includes(fileExtension)) {
                toast.error('Please upload a PDF or Word document');
                return;
            }

            // Check file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File size should be less than 5MB');
                return;
            }

            setResume(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!job) return;

        // Validation
        if (!formData.name.trim() || !formData.email.trim() || !formData.linkedIn.trim() || !resume) {
            toast.error('Please fill in all required fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        // LinkedIn URL validation
        if (!formData.linkedIn.includes('linkedin.com')) {
            toast.error('Please enter a valid LinkedIn URL');
            return;
        }



        const applicationRequest: JobApplicationRequest = {
            full_name: formData.name.trim(),
            email: formData.email.trim(),
            linkedIn: formData.linkedIn.trim(),
            resume: resume,
            cover_letter: formData.coverLetter.trim() || undefined
        };

        console.log(applicationRequest);

        applyJobMutation(applicationRequest);



    };

    if (!job) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="bg-gray-900/90 backdrop-blur-lg rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2">Apply for Position</h2>
                                <p className="text-gray-300 text-lg">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">
                                        {job.title}
                                    </span>
                                    {" "}at {job.department}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 hover:bg-white/10 rounded-2xl transition-all duration-300 border border-white/20"
                            >
                                <FiX className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-3">
                                        <FiUser className="inline w-5 h-5 mr-2" />
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-3">
                                        <FiMail className="inline w-5 h-5 mr-2" />
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-3">
                                    <FiLinkedin className="inline w-5 h-5 mr-2" />
                                    LinkedIn Profile *
                                </label>
                                <input
                                    type="url"
                                    name="linkedIn"
                                    value={formData.linkedIn}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                    placeholder="https://linkedin.com/in/yourprofile"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-3">
                                    <FiUpload className="inline w-5 h-5 mr-2" />
                                    Resume *
                                </label>
                                <div className="border-2 border-dashed border-white/30 rounded-2xl p-8 text-center hover:border-white/50 transition-all duration-300 bg-white/5">
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleResumeChange}
                                        className="hidden"
                                        id="resume-upload"
                                        required
                                    />
                                    <label htmlFor="resume-upload" className="cursor-pointer block">
                                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <FiUpload className="w-8 h-8 text-white" />
                                        </div>
                                        {resume ? (
                                            <div className="space-y-2">
                                                <p className="text-green-400 font-semibold text-lg">{resume.name}</p>
                                                <p className="text-gray-300 text-sm">File uploaded successfully</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <p className="text-white font-medium text-lg">Click to upload your resume</p>
                                                <p className="text-gray-400">PDF, DOC, DOCX (max 5MB)</p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-3">
                                    <FiFileText className="inline w-5 h-5 mr-2" />
                                    Cover Letter (Optional)
                                </label>
                                <textarea
                                    name="coverLetter"
                                    value={formData.coverLetter}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none"
                                    placeholder="Tell us why you're interested in this position..."
                                />
                            </div>

                            <div className="flex gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-6 py-3 border-2 border-white/30 text-white rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold shadow-lg flex items-center justify-center gap-2"
                                >
                                    {isPending ? 'Submitting...' : 'Submit Application'}
                                    {!isPending && <FiArrowRight className="w-4 h-4" />}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default JobApplicationModal; 