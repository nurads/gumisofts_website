import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    // ---- Admin user ----
    const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@gumisofts.com";
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || "admin1234";
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    await prisma.user.upsert({
        where: { email: adminEmail },
        update: { password: passwordHash },
        create: {
            email: adminEmail,
            name: "Admin",
            password: passwordHash,
            role: "admin",
        },
    });
    console.log(`  ✓ Admin user: ${adminEmail} / ${adminPassword}`);

    // ---- Company info (default) ----
    const existing = await prisma.companyInfo.findFirst({ where: { isDefault: true } });
    if (!existing) {
        await prisma.companyInfo.create({
            data: {
                companyName: "Gumisofts",
                email: "contact@gumisofts.com",
                phone: "+251 953 541 616",
                address: "Addis Ababa, Ethiopia",
                yearsOfExprience: 5,
                clientSatisficationRate: 98,
                numberOfProjectsCompleted: 30,
                numberOfHappyClients: 25,
                numberOfYearsInBusiness: 5,
                numberOfEmployees: 12,
                numberOfServices: 9,
                scheduleUrl: "https://calendly.com/gumisofts",
                linkedinUrl: "https://linkedin.com/company/gumisofts",
                githubUrl: "https://github.com/gumisofts",
                telegramUrl: "https://t.me/gumisofts",
                facebookUrl: "https://facebook.com/gumisofts",
                instagramUrl: "https://instagram.com/gumisofts",
                whatsappUrl: "https://wa.me/251953541616",
                youtubeUrl: "",
                isDefault: true,
                companyLocation: "Addis Ababa, Ethiopia",
            },
        });
        console.log("  ✓ Default company info");
    }

    // ---- Services ----
    const services = [
        { title: "Mobile App Development", description: "We build high-performance iOS and Android apps that are scalable, user-friendly, and tailored to your business needs.", shortDescription: "iOS & Android apps that scale", icon: "FiSmartphone", category: "Development", features: ["iOS development", "Android development", "Cross-platform (React Native / Flutter)", "App store deployment"] },
        { title: "Web Development", description: "Our web development services ensure responsive, high-performance websites that provide an engaging user experience.", shortDescription: "Responsive, fast websites", icon: "FiGlobe", category: "Development", features: ["Marketing sites", "E-commerce", "CMS integration", "SEO-friendly"] },
        { title: "Web Application Development", description: "Our dynamic and interactive web applications are built with modern frameworks and technologies.", shortDescription: "Dynamic web applications", icon: "FiLayout", category: "Development", features: ["SaaS platforms", "Dashboards", "Admin panels", "Real-time features"] },
        { title: "API Development", description: "We develop robust and secure APIs (RESTful and GraphQL) for seamless integration into your systems.", shortDescription: "RESTful & GraphQL APIs", icon: "FiServer", category: "Backend", features: ["REST APIs", "GraphQL", "Authentication", "Documentation"] },
        { title: "Desktop Applications", description: "We create feature-rich desktop applications for Windows, macOS, and Linux.", shortDescription: "Cross-platform desktop apps", icon: "FiMonitor", category: "Development", features: ["Windows", "macOS", "Linux", "Auto-updates"] },
        { title: "Automations", description: "We streamline your business processes with workflow automation and custom scripts.", shortDescription: "Automate repetitive workflows", icon: "FiZap", category: "Operations", features: ["Workflow automation", "Custom scripts", "Integrations", "Schedulers"] },
        { title: "SEO Services", description: "We boost your online visibility with data-driven SEO strategies.", shortDescription: "Data-driven SEO", icon: "FiTrendingUp", category: "Marketing", features: ["Technical SEO", "Content strategy", "Link building", "Analytics"] },
        { title: "Command-line Applications", description: "We build efficient and powerful CLI tools for automation and productivity.", shortDescription: "Powerful CLI tools", icon: "FiTerminal", category: "Development", features: ["Cross-platform CLIs", "Plugin systems", "Auto-completion", "Distribution"] },
        { title: "DevOps & CI/CD", description: "We streamline development and deployment processes for faster delivery.", shortDescription: "Pipelines & infrastructure", icon: "FiCloud", category: "Infrastructure", features: ["CI/CD pipelines", "IaC (Terraform)", "Kubernetes", "Monitoring"] },
    ];

    for (const [i, s] of services.entries()) {
        await prisma.service.upsert({
            where: { id: `seed-svc-${i}` },
            update: {},
            create: {
                id: `seed-svc-${i}`,
                title: s.title,
                description: s.description,
                shortDescription: s.shortDescription,
                icon: s.icon,
                category: s.category,
                features: JSON.stringify(s.features),
                order: i,
            },
        });
    }
    console.log(`  ✓ ${services.length} services`);

    // ---- Products ----
    const products = [
        {
            slug: "bita-business",
            name: "Bita Business",
            tagline: "Inventory & Sales Management Made Simple",
            description: "An all-in-one inventory and sales management platform built for retailers, wholesalers, and growing businesses. Track stock in real time, sell from any device, manage purchases and suppliers, and see exactly where your money is going — across one or many stores.",
            icon: "FiPackage",
            features: ["Real-time Inventory Tracking", "Multi-store & Multi-warehouse", "Point-of-Sale (POS) & Invoicing", "Purchases & Supplier Management", "Customer & Supplier Ledgers", "Sales, Profit & Stock Reports", "Barcode & SKU Support", "Role-based Team Access"],
            benefits: ["Eliminate stock-outs and over-ordering", "Speed up checkout with a built-in POS", "Know your true profit, per product", "Run multiple branches from one dashboard"],
            demoUrl: "https://bita-demo.gumisofts.com",
            tiers: [
                { name: "starter", price: "0 ETB", users: "3", features: "Single store, core inventory & POS" },
                { name: "professional", price: "500 ETB", users: "15", features: "Multi-store, full reports & ledgers" },
                { name: "enterprise", price: "1,200 ETB", users: "Unlimited", features: "API access, custom integrations & SLA" },
            ],
        },
    ];

    // Remove products that are no longer in the seed list (cascades to pricing tiers)
    await prisma.product.deleteMany({
        where: { slug: { notIn: products.map((p) => p.slug) } },
    });

    for (const [i, p] of products.entries()) {
        const product = await prisma.product.upsert({
            where: { slug: p.slug },
            update: {
                name: p.name,
                tagline: p.tagline,
                description: p.description,
                icon: p.icon,
                features: JSON.stringify(p.features),
                benefits: JSON.stringify(p.benefits),
                demoUrl: p.demoUrl,
                order: i,
            },
            create: {
                slug: p.slug,
                name: p.name,
                tagline: p.tagline,
                description: p.description,
                icon: p.icon,
                features: JSON.stringify(p.features),
                benefits: JSON.stringify(p.benefits),
                demoUrl: p.demoUrl,
                order: i,
            },
        });

        // Replace tiers
        await prisma.productPricingTier.deleteMany({ where: { productId: product.id } });
        for (const [j, t] of p.tiers.entries()) {
            await prisma.productPricingTier.create({
                data: { ...t, productId: product.id, order: j },
            });
        }
    }
    console.log(`  ✓ ${products.length} products with pricing tiers`);

    // ---- Projects ----
    const projects = [
        { id: "seed-prj-1", title: "TemariCo – National Exam Prep", description: "We developed TemariCo, a collaborative platform designed to help high school students across Ethiopia succeed in their entrance exams.", image: "/assets/work/temari.svg", category: "Education", technologies: ["Flutter", "Firebase"], demoUrl: "https://play.google.com/store/apps/details?id=com.temarico.app" },
        { id: "seed-prj-2", title: "AderoTech – Digital Solutions", description: "We developed AderoTech's website to provide a seamless, modern platform that supports their mission of simplifying lives through digital solutions.", image: "/assets/work/adero.svg", category: "Web", technologies: ["Next.js", "Tailwind"], demoUrl: "https://www.adero.tech/" },
        { id: "seed-prj-3", title: "Dabbaal – Tour and Travels", description: "We developed a website for Dabbal Tour and Travel PLC, a leading tour service provider in Ethiopia.", image: "/assets/work/dabal.svg", category: "Web", technologies: ["React", "Node.js"], demoUrl: "https://dabbaaltourandtravel.com/" },
    ];

    for (const [i, p] of projects.entries()) {
        await prisma.project.upsert({
            where: { id: p.id },
            update: {},
            create: {
                ...p,
                technologies: JSON.stringify(p.technologies),
                order: i,
            },
        });
    }
    console.log(`  ✓ ${projects.length} portfolio projects`);

    // ---- Testimonials ----
    const testimonials = [
        { id: "seed-tst-1", name: "Yahya Abdala", position: "CEO", company: "TemariCo", comment: "Gumisofts shipped TemariCo on time and the platform has been rock-solid. Their team really cares about the outcome.", rating: 5 },
        { id: "seed-tst-2", name: "Sarah Bekele", position: "Operations Manager", company: "AderoTech", comment: "Great communication and quality of work. Bita Business gave us full visibility into our stock and sales for the first time.", rating: 5 },
        { id: "seed-tst-3", name: "Daniel Tesfaye", position: "Founder", company: "Dabbaal Travels", comment: "Our website now actually generates leads. The team understood our business and built around it.", rating: 5 },
    ];
    for (const [i, t] of testimonials.entries()) {
        await prisma.testimonial.upsert({
            where: { id: t.id },
            update: {},
            create: { ...t, order: i },
        });
    }
    console.log(`  ✓ ${testimonials.length} testimonials`);

    // ---- Sample job ----
    await prisma.job.upsert({
        where: { id: "seed-job-1" },
        update: {},
        create: {
            id: "seed-job-1",
            title: "Senior Full-Stack Engineer",
            department: "Engineering",
            location: "Remote / Addis Ababa",
            type: "full-time",
            experience: "3+ years",
            description: "Join our engineering team to build and scale Bita Business and bespoke client products.",
            requirements: JSON.stringify(["3+ years building production web apps", "Strong TypeScript/Node/React", "Experience with PostgreSQL and Prisma", "Comfort with cloud (AWS/GCP)"]),
            responsibilities: JSON.stringify(["Own features end-to-end", "Mentor junior engineers", "Improve code quality and DX"]),
            benefits: JSON.stringify(["Competitive salary", "Flexible remote work", "Annual learning budget", "Equipment provided"]),
            salaryMin: 50000,
            salaryMax: 90000,
            salaryCurrency: "USD",
            postedAt: new Date(),
            deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60),
            isActive: true,
        },
    });
    console.log("  ✓ Sample job posting");

    console.log("\nSeed complete.\n");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
