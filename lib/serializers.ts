// Helpers to convert Prisma rows to the camelCase shape the frontend expects.
// The axios interceptor camelcases keys already, so we mostly just need to:
//   - parse JSON-encoded array fields (features, requirements, etc.)
//   - shape nested objects (salary, author, pricing) for legacy compatibility

type AnyRecord = Record<string, unknown>;

const safeJsonArray = (val: unknown): unknown[] => {
    if (Array.isArray(val)) return val;
    if (typeof val !== "string") return [];
    try {
        const parsed = JSON.parse(val);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

export function serializeService(s: AnyRecord) {
    return {
        ...s,
        features: safeJsonArray(s.features),
        pricing:
            s.pricingBasic != null || s.pricingPremium != null || s.pricingEnterprise != null
                ? {
                    basic: s.pricingBasic ?? 0,
                    premium: s.pricingPremium ?? 0,
                    enterprise: s.pricingEnterprise ?? 0,
                }
                : undefined,
    };
}

export function serializeProduct(p: AnyRecord & { pricingTiers?: AnyRecord[] }) {
    return {
        ...p,
        features: safeJsonArray(p.features),
        benefits: safeJsonArray(p.benefits),
        pricingTiers: (p.pricingTiers ?? []).sort(
            (a, b) => (a.order as number) - (b.order as number)
        ),
    };
}

export function serializeProject(p: AnyRecord) {
    return {
        ...p,
        technologies: safeJsonArray(p.technologies),
    };
}

export function serializeJob(j: AnyRecord) {
    return {
        ...j,
        requirements: safeJsonArray(j.requirements),
        responsibilities: safeJsonArray(j.responsibilities),
        benefits: safeJsonArray(j.benefits),
        salary:
            j.salaryMin != null && j.salaryMax != null
                ? {
                    min: j.salaryMin,
                    max: j.salaryMax,
                    currency: j.salaryCurrency ?? "USD",
                }
                : undefined,
    };
}

export function serializeBlogPost(b: AnyRecord) {
    return {
        ...b,
        tags: safeJsonArray(b.tags),
        author: {
            name: b.authorName,
            bio: b.authorBio,
            avatar: b.authorAvatar,
        },
    };
}

export function serializeCompanyInfo(c: AnyRecord) {
    return c;
}

export function serializeCompanyStats(c: AnyRecord) {
    return {
        id: c.id,
        companyName: c.companyName,
        numberOfEmployees: c.numberOfEmployees,
        numberOfProjectsCompleted: c.numberOfProjectsCompleted,
        clientSatisficationRate: c.clientSatisficationRate,
        numberOfHappyClients: c.numberOfHappyClients,
        numberOfYearsInBusiness: c.numberOfYearsInBusiness,
        companyLocation: c.companyLocation,
    };
}
