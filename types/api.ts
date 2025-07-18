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

export type Job = {
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

export type JobApplicationRequest = {
    full_name: string;
    email: string;
    linkedIn: string;
    resume: File | string;
    cover_letter?: string;
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

export type Testimonial = {
    id: string;
    name: string;
    position: string;
    company: string;
    avatar: string;
    comment: string;
    rating: number;
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

export type CompanyStats = {
    id: number,
    companyName: string,
    numberOfEmployees: number,
    numberOfProjectsCompleted: number,
    clientSatisficationRate: number,
    numberOfHappyClients: number,
    numberOfYearsInBusiness: number,
    companyLocation: string

}

export type Message = {
    full_name: string,
    email: string,
    content: string,
}



export type CompanyInfo = {
    id: string,
    companyName: string,
    email: string,
    phone: string,
    address: string,
    yearsOfExprience: number,
    clientSatisficationRate: number,
    numberOfProjectsCompleted: number,
    numberOfHappyClients: number,
    numberOfYearsInBusiness: number,
    scheduleUrl: string,
    linkedinUrl: string,
    githubUrl: string,
    telegramUrl: string,
    facebookUrl: string,
    instagramUrl: string,
    whatsappUrl: string,
    youtubeUrl: string,
    isDefault: boolean
    numberOfEmployees: number,
    numberOfServices: number

}
