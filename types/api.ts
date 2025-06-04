// API Types for Gumisofts Website

export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    demoUrl?: string;
    githubUrl?: string;
    category: string;
    createdAt: string;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    icon: string;
    features: string[];
    pricing?: {
        basic: number;
        premium: number;
        enterprise: number;
    };
    category: string;
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
    order: number;
}

export interface Job {
    id: string;
    title: string;
    department: string;
    location: string;
    type: 'full-time' | 'part-time' | 'contract' | 'internship';
    experience: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    benefits: string[];
    salary?: {
        min: number;
        max: number;
        currency: string;
    };
    postedAt: string;
    deadline: string;
    isActive: boolean;
}

export interface JobApplication {
    id: string;
    jobId: string;
    name: string;
    email: string;
    linkedIn: string;
    resume: File | string; // File for upload, string for stored URL
    coverLetter?: string;
    appliedAt: string;
    status: 'pending' | 'reviewed' | 'interview' | 'hired' | 'rejected';
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: {
        name: string;
        avatar: string;
        bio: string;
    };
    publishedAt: string;
    updatedAt: string;
    tags: string[];
    category: string;
    image: string;
    readTime: number; // in minutes
    featured: boolean;
    likes: number;
    views: number;
}

export interface Testimonial {
    id: string;
    name: string;
    position: string;
    company: string;
    image: string;
    content: string;
    rating: number;
    date: string;
}

// API Response Types
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface ApiError {
    success: false;
    error: string;
    message: string;
    statusCode: number;
} 