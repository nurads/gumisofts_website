// Utility function to create URL-friendly slugs from service titles
export function createServiceSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

// Utility function to format service title for URL compatibility
export function formatServiceUrl(title: string): string {
    // Create a mapping for common service titles to ensure consistency
    const serviceMapping: { [key: string]: string } = {
        'Mobile App Development': 'mobile-app-development',
        'Web Development': 'web-development',
        'Web Application Development': 'web-application-development',
        'API Development': 'api-development',
        'Desktop Applications': 'desktop-applications',
        'Automations': 'automations',
        'SEO Services': 'seo-services',
        'Command-line Applications': 'command-line-applications',
        'DevOps & CI/CD': 'devops-ci-cd'
    };

    return serviceMapping[title] || createServiceSlug(title);
} 