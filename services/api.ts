import {
    Project,
    Service,
    FAQ,
    Job,
    JobApplication,
    BlogPost,
    Testimonial,
    ApiResponse
} from '@/types/api';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const mockProjects: Project[] = [
    {
        id: '1',
        title: 'E-Commerce Platform',
        description: 'A full-featured e-commerce platform with modern UI/UX, payment integration, and admin dashboard.',
        image: '/assets/projects/ecommerce.jpg',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        demoUrl: 'https://demo.example.com',
        githubUrl: 'https://github.com/example',
        category: 'Web Development',
        createdAt: '2024-01-15'
    },
    {
        id: '2',
        title: 'Mobile Banking App',
        description: 'Secure mobile banking application with biometric authentication and real-time transactions.',
        image: '/assets/projects/banking.jpg',
        technologies: ['React Native', 'Express.js', 'PostgreSQL', 'JWT'],
        demoUrl: 'https://demo.example.com',
        category: 'Mobile Development',
        createdAt: '2024-02-10'
    },
    {
        id: '3',
        title: 'AI-Powered Analytics Dashboard',
        description: 'Advanced analytics dashboard with machine learning insights and real-time data visualization.',
        image: '/assets/projects/analytics.jpg',
        technologies: ['Next.js', 'Python', 'TensorFlow', 'D3.js'],
        demoUrl: 'https://demo.example.com',
        category: 'AI/ML',
        createdAt: '2024-03-05'
    }
];

const mockServices: Service[] = [
    {
        id: '1',
        title: 'Custom Software Development',
        description: 'End-to-end custom software solutions tailored to your business needs. From concept to deployment, we create scalable and maintainable applications.',
        shortDescription: 'Tailored software solutions for your business',
        icon: 'FiCode',
        features: [
            'Full-stack web development',
            'Mobile app development',
            'API development and integration',
            'Database design and optimization',
            'Cloud deployment and scaling'
        ],
        pricing: {
            basic: 5000,
            premium: 15000,
            enterprise: 50000
        },
        category: 'Development'
    },
    {
        id: '2',
        title: 'UI/UX Design',
        description: 'Beautiful, intuitive, and user-centered design solutions that enhance user experience and drive engagement.',
        shortDescription: 'Beautiful and intuitive user interfaces',
        icon: 'FiEdit',
        features: [
            'User interface design',
            'User experience optimization',
            'Wireframing and prototyping',
            'Design systems',
            'Usability testing'
        ],
        pricing: {
            basic: 2000,
            premium: 8000,
            enterprise: 20000
        },
        category: 'Design'
    },
    {
        id: '3',
        title: 'Cloud Solutions',
        description: 'Comprehensive cloud infrastructure and migration services to scale your business efficiently.',
        shortDescription: 'Scalable cloud infrastructure solutions',
        icon: 'FiCloud',
        features: [
            'Cloud migration',
            'Infrastructure as code',
            'Auto-scaling solutions',
            'Security implementation',
            '24/7 monitoring and support'
        ],
        pricing: {
            basic: 3000,
            premium: 10000,
            enterprise: 30000
        },
        category: 'Infrastructure'
    }
];

const mockJobs: Job[] = [
    {
        id: '1',
        title: 'Senior Full-Stack Developer',
        department: 'Engineering',
        location: 'Remote',
        type: 'full-time',
        experience: '5+ years',
        description: 'We are looking for a passionate Senior Full-Stack Developer to join our growing team and help build innovative software solutions.',
        requirements: [
            '5+ years of experience in full-stack development',
            'Proficiency in React, Node.js, and TypeScript',
            'Experience with cloud platforms (AWS, GCP, or Azure)',
            'Strong understanding of database design and optimization',
            'Experience with microservices architecture'
        ],
        responsibilities: [
            'Design and develop scalable web applications',
            'Collaborate with cross-functional teams',
            'Mentor junior developers',
            'Participate in code reviews and technical discussions',
            'Contribute to technical decision-making'
        ],
        benefits: [
            'Competitive salary and equity',
            'Flexible working hours',
            'Health and dental insurance',
            'Professional development budget',
            'Latest tech equipment'
        ],
        salary: {
            min: 80000,
            max: 120000,
            currency: 'USD'
        },
        postedAt: '2024-01-15',
        deadline: '2024-02-15',
        isActive: true
    },
    {
        id: '2',
        title: 'UI/UX Designer',
        department: 'Design',
        location: 'Hybrid',
        type: 'full-time',
        experience: '3+ years',
        description: 'Join our design team to create beautiful and intuitive user experiences for our clients.',
        requirements: [
            '3+ years of UI/UX design experience',
            'Proficiency in Figma, Sketch, or Adobe Creative Suite',
            'Strong portfolio showcasing design process',
            'Understanding of user-centered design principles',
            'Experience with design systems'
        ],
        responsibilities: [
            'Create wireframes, mockups, and prototypes',
            'Conduct user research and usability testing',
            'Collaborate with developers and product managers',
            'Maintain and evolve design systems',
            'Present design concepts to stakeholders'
        ],
        benefits: [
            'Competitive salary',
            'Creative freedom',
            'Design conference budget',
            'Latest design software licenses',
            'Collaborative work environment'
        ],
        salary: {
            min: 60000,
            max: 90000,
            currency: 'USD'
        },
        postedAt: '2024-01-20',
        deadline: '2024-02-20',
        isActive: true
    }
];

const mockBlogs: BlogPost[] = [
    {
        id: '1',
        title: 'The Future of Web Development: Trends to Watch in 2024',
        slug: 'future-web-development-trends-2024',
        excerpt: 'Explore the latest trends shaping the future of web development, from AI integration to advanced frameworks.',
        content: `# The Future of Web Development: Trends to Watch in 2024

Web development continues to evolve at a rapid pace, and 2024 promises to bring exciting new trends and technologies...

## 1. AI-Powered Development Tools

Artificial intelligence is revolutionizing how we write code. From GitHub Copilot to automated testing...

## 2. Edge Computing and Performance

With the rise of edge computing, applications are becoming faster and more responsive...

## 3. Web3 and Blockchain Integration

The integration of blockchain technology into web applications is opening new possibilities...`,
        author: {
            name: 'John Doe',
            avatar: '/assets/team/john-doe.jpg',
            bio: 'Senior Full-Stack Developer with 8+ years of experience'
        },
        publishedAt: '2024-01-10',
        updatedAt: '2024-01-10',
        tags: ['Web Development', 'Technology', 'Trends'],
        category: 'Technology',
        image: '/assets/blog/web-dev-trends.jpg',
        readTime: 8,
        featured: true,
        likes: 45,
        views: 1250
    },
    {
        id: '2',
        title: 'Building Scalable Microservices with Node.js',
        slug: 'building-scalable-microservices-nodejs',
        excerpt: 'Learn how to architect and build scalable microservices using Node.js and modern deployment strategies.',
        content: `# Building Scalable Microservices with Node.js

Microservices architecture has become the go-to approach for building scalable applications...`,
        author: {
            name: 'Jane Smith',
            avatar: '/assets/team/jane-smith.jpg',
            bio: 'Backend Engineer and Architecture Specialist'
        },
        publishedAt: '2024-01-05',
        updatedAt: '2024-01-05',
        tags: ['Node.js', 'Microservices', 'Backend'],
        category: 'Development',
        image: '/assets/blog/microservices.jpg',
        readTime: 12,
        featured: false,
        likes: 32,
        views: 890
    }
];

const mockFAQs: FAQ[] = [
    {
        id: '1',
        question: 'What services does Gumisofts provide?',
        answer: 'We provide comprehensive software development services including custom web applications, mobile apps, UI/UX design, cloud solutions, and digital transformation consulting.',
        category: 'Services',
        order: 1
    },
    {
        id: '2',
        question: 'How long does a typical project take?',
        answer: 'Project timelines vary depending on complexity and scope. Simple projects may take 4-8 weeks, while complex enterprise solutions can take 6-12 months. We provide detailed timelines during the planning phase.',
        category: 'Timeline',
        order: 2
    },
    {
        id: '3',
        question: 'Do you provide post-launch support?',
        answer: 'Yes, we offer comprehensive post-launch support including bug fixes, feature updates, performance monitoring, and maintenance services to ensure your application runs smoothly.',
        category: 'Support',
        order: 3
    }
];

// API Service Functions
export const apiService = {
    // Projects
    async getProjects(): Promise<ApiResponse<Project[]>> {
        await delay(1000);
        return {
            success: true,
            data: mockProjects
        };
    },

    async getProject(id: string): Promise<ApiResponse<Project | null>> {
        await delay(800);
        const project = mockProjects.find(p => p.id === id);
        return {
            success: true,
            data: project || null
        };
    },

    // Services
    async getServices(): Promise<ApiResponse<Service[]>> {
        await delay(1200);
        return {
            success: true,
            data: mockServices
        };
    },

    async getService(id: string): Promise<ApiResponse<Service | null>> {
        await delay(800);
        const service = mockServices.find(s => s.id === id);
        return {
            success: true,
            data: service || null
        };
    },

    // Jobs
    async getJobs(): Promise<ApiResponse<Job[]>> {
        await delay(1000);
        return {
            success: true,
            data: mockJobs.filter(job => job.isActive)
        };
    },

    async getJob(id: string): Promise<ApiResponse<Job | null>> {
        await delay(800);
        const job = mockJobs.find(j => j.id === id);
        return {
            success: true,
            data: job || null
        };
    },

    async applyForJob(application: Omit<JobApplication, 'id' | 'appliedAt' | 'status'>): Promise<ApiResponse<JobApplication>> {
        await delay(1500);
        const newApplication: JobApplication = {
            ...application,
            id: Math.random().toString(36).substr(2, 9),
            appliedAt: new Date().toISOString(),
            status: 'pending'
        };
        return {
            success: true,
            data: newApplication,
            message: 'Application submitted successfully!'
        };
    },

    // Blogs
    async getBlogs(featured?: boolean): Promise<ApiResponse<BlogPost[]>> {
        await delay(1000);
        let blogs = mockBlogs;
        if (featured !== undefined) {
            blogs = blogs.filter(blog => blog.featured === featured);
        }
        return {
            success: true,
            data: blogs
        };
    },

    async getBlog(slug: string): Promise<ApiResponse<BlogPost | null>> {
        await delay(800);
        const blog = mockBlogs.find(b => b.slug === slug);
        return {
            success: true,
            data: blog || null
        };
    },

    // FAQs
    async getFAQs(): Promise<ApiResponse<FAQ[]>> {
        await delay(800);
        return {
            success: true,
            data: mockFAQs.sort((a, b) => a.order - b.order)
        };
    },

    // Contact
    async submitContact(contactData: {
        name: string;
        email: string;
        message: string;
        company?: string;
    }): Promise<ApiResponse<{ id: string }>> {
        await delay(1500);
        return {
            success: true,
            data: { id: Math.random().toString(36).substr(2, 9) },
            message: 'Message sent successfully! We will get back to you soon.'
        };
    }
}; 