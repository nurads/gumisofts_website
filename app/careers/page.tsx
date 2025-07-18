"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Job } from '@/types/api';
import JobCard from '@/components/JobCard';
import JobApplicationModal from '@/components/JobApplicationModal';

import { FiUsers, FiGlobe, FiTrendingUp, FiSearch } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { getCompanyInfo } from "@/services/company";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "@/services/careers";

const Careers = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const { data: jobsData, isLoading: isJobsLoading, isError: isJobsError } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,

  })

  const { data: companyInfo } = useQuery({
    queryKey: ["companyInfo"],
    queryFn: getCompanyInfo,
  });


  useEffect(() => {
    const fetchJobs = async () => {

      if (isJobsLoading) {
        setLoading(true);
        return;
      }

      if (isJobsError) {
        toast.error('Failed to fetch jobs');
        setLoading(false);
        return;
      }

      setJobs(jobsData || []);
      setLoading(false);

    };

    fetchJobs();
  }, [jobsData]);

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !filterDepartment || job.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  // const departments = [...new Set(jobs.map(job => job.department))];


  const companyStats = [
    { icon: FiUsers, value: `${companyInfo?.numberOfEmployees}+`, label: "Team Members" },
    { icon: FiGlobe, value: `${companyInfo?.numberOfProjectsCompleted}+`, label: "Projects Delivered" },
    { icon: FiTrendingUp, value: `${companyInfo?.clientSatisficationRate}%`, label: "Client Satisfaction" }

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
              🚀 Join Our Team
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 text-white"
            >
              Shape the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Future
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl mb-12 text-gray-200 leading-relaxed"
            >
              Join Gumisofts and be part of an innovative team that&apos;s transforming the digital landscape with cutting-edge solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">G</span>
                </div>
                <div className="text-lg text-white font-semibold">Get Inspired</div>
                <div className="text-sm text-gray-300">Innovation drives us</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">G</span>
                </div>
                <div className="text-lg text-white font-semibold">Go Beyond</div>
                <div className="text-sm text-gray-300">Exceed expectations</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">G</span>
                </div>
                <div className="text-lg text-white font-semibold">Grow Together</div>
                <div className="text-sm text-gray-300">Success is shared</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="relative py-16">
        <div className="container mx-auto px-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {companyStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Job Search and Filter */}
      <section className="relative py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-xl">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search jobs by title, skills, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
                {/* <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                >
                  <option value="" className="text-gray-900">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept} className="text-gray-900">{dept}</option>
                  ))}
                </select> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="relative py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Open{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                  Positions
                </span>
              </h2>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                Discover exciting opportunities to grow your career with us. We&apos;re always looking for passionate individuals to join our team.
              </p>
            </motion.div>

            {loading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 animate-pulse border border-white/30">
                    <div className="h-4 bg-gray-500 rounded mb-4"></div>
                    <div className="h-3 bg-gray-500 rounded mb-2"></div>
                    <div className="h-3 bg-gray-500 rounded mb-4"></div>
                    <div className="h-10 bg-gray-500 rounded"></div>
                  </div>
                ))}
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={handleApply}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-4">No positions found</h3>
                  <p className="text-gray-200 mb-6">
                    {searchTerm || filterDepartment
                      ? "Try adjusting your search criteria."
                      : "We don&apos;t have any open positions at the moment, but we&apos;re always interested in hearing from talented individuals."
                    }
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilterDepartment('');
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Clear Filters
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
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
                Why Join{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                  Gumisofts?
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl text-gray-200 mb-12 leading-relaxed"
              >
                Experience a workplace where innovation thrives, careers flourish, and every team member makes a meaningful impact.
              </motion.p>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {[
                  { title: "Growth Opportunities", description: "Continuous learning and career advancement" },
                  { title: "Innovative Projects", description: "Work on cutting-edge technologies" },
                  { title: "Work-Life Balance", description: "Flexible schedules and remote work options" }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <h4 className="text-lg font-semibold text-white mb-3">{benefit.title}</h4>
                    <p className="text-gray-300">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        job={selectedJob}
      />

      <ToastContainer />
    </div>
  );
};

export default Careers;
