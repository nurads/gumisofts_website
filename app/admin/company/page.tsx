import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { saveCompany } from "@/lib/admin-actions";
import { Field } from "@/components/admin/FormPrimitives";

export const dynamic = "force-dynamic";

export default async function CompanyInfoPage() {
    const company = await prisma.companyInfo.findFirst({ where: { isDefault: true } });

    return (
        <>
            <AdminPageHeader
                title="Company Info"
                description="Company-wide details displayed across the public site (footer, contact, stats)"
            />
            <form action={saveCompany} className="p-8 max-w-4xl space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
                    <h2 className="font-semibold text-gray-900">Identity</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Field label="Company name" name="companyName" defaultValue={company?.companyName ?? ""} required />
                        <Field label="Email" name="email" type="email" defaultValue={company?.email ?? ""} required />
                        <Field label="Phone" name="phone" defaultValue={company?.phone ?? ""} />
                        <Field label="Address / Location" name="address" defaultValue={company?.address ?? ""} />
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
                    <h2 className="font-semibold text-gray-900">Stats (shown on public site)</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <Field label="Years of experience" name="yearsOfExprience" type="number" defaultValue={(company?.yearsOfExprience ?? 0).toString()} />
                        <Field label="Client satisfaction (%)" name="clientSatisficationRate" type="number" defaultValue={(company?.clientSatisficationRate ?? 95).toString()} />
                        <Field label="Projects completed" name="numberOfProjectsCompleted" type="number" defaultValue={(company?.numberOfProjectsCompleted ?? 0).toString()} />
                        <Field label="Happy clients" name="numberOfHappyClients" type="number" defaultValue={(company?.numberOfHappyClients ?? 0).toString()} />
                        <Field label="Years in business" name="numberOfYearsInBusiness" type="number" defaultValue={(company?.numberOfYearsInBusiness ?? 0).toString()} />
                        <Field label="Employees" name="numberOfEmployees" type="number" defaultValue={(company?.numberOfEmployees ?? 0).toString()} />
                        <Field label="Services offered" name="numberOfServices" type="number" defaultValue={(company?.numberOfServices ?? 0).toString()} />
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
                    <h2 className="font-semibold text-gray-900">Links</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Field label="Schedule call URL (Calendly etc.)" name="scheduleUrl" defaultValue={company?.scheduleUrl ?? ""} />
                        <Field label="LinkedIn URL" name="linkedinUrl" defaultValue={company?.linkedinUrl ?? ""} />
                        <Field label="GitHub URL" name="githubUrl" defaultValue={company?.githubUrl ?? ""} />
                        <Field label="Telegram URL" name="telegramUrl" defaultValue={company?.telegramUrl ?? ""} />
                        <Field label="Facebook URL" name="facebookUrl" defaultValue={company?.facebookUrl ?? ""} />
                        <Field label="Instagram URL" name="instagramUrl" defaultValue={company?.instagramUrl ?? ""} />
                        <Field label="WhatsApp URL" name="whatsappUrl" defaultValue={company?.whatsappUrl ?? ""} />
                        <Field label="YouTube URL" name="youtubeUrl" defaultValue={company?.youtubeUrl ?? ""} />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white text-sm font-semibold px-5 py-2 rounded-md transition-colors"
                    >
                        Save company info
                    </button>
                </div>
            </form>
        </>
    );
}
