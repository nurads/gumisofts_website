import Link from "next/link";
import { saveService, deleteService } from "@/lib/admin-actions";
import { Field, Textarea, Checkbox, jsonArrayToLines } from "@/components/admin/FormPrimitives";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";

type ServiceLike = {
    id?: string;
    title?: string;
    shortDescription?: string;
    description?: string;
    icon?: string;
    category?: string;
    features?: string;
    pricingBasic?: number | null;
    pricingPremium?: number | null;
    pricingEnterprise?: number | null;
    order?: number;
    isActive?: boolean;
};

export default function ServiceForm({ service }: { service?: ServiceLike }) {
    const isEdit = Boolean(service?.id);
    const action = saveService.bind(null, service?.id ?? null);
    const del = service?.id ? deleteService.bind(null, service.id) : null;

    return (
        <>
            <div className="border-b border-gray-200 bg-white">
                <div className="px-8 py-6 flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{isEdit ? "Edit service" : "New service"}</h1>
                        <p className="text-sm text-gray-500 mt-1">{isEdit ? "Update service details." : "Create a new service offering."}</p>
                    </div>
                    <Link href="/admin/services" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md border border-gray-200">
                        <FiArrowLeft className="w-4 h-4" /> Back
                    </Link>
                </div>
            </div>

            <form action={action} className="p-8 max-w-4xl space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
                    <Field label="Title" name="title" defaultValue={service?.title ?? ""} required />
                    <Field label="Short description" name="shortDescription" defaultValue={service?.shortDescription ?? ""} required />
                    <Textarea label="Description" name="description" defaultValue={service?.description ?? ""} rows={5} required />
                    <div className="grid md:grid-cols-3 gap-4">
                        <Field label="Icon (FiCloud, FiCode, etc.)" name="icon" defaultValue={service?.icon ?? "FiCloud"} />
                        <Field label="Category" name="category" defaultValue={service?.category ?? "Development"} />
                        <Field label="Order" name="order" type="number" defaultValue={service?.order?.toString() ?? "0"} />
                    </div>
                    <Textarea label="Features (one per line)" name="features" defaultValue={jsonArrayToLines(service?.features)} rows={6} />
                    <div className="grid md:grid-cols-3 gap-4">
                        <Field label="Pricing — basic" name="pricingBasic" type="number" defaultValue={service?.pricingBasic?.toString() ?? ""} />
                        <Field label="Pricing — premium" name="pricingPremium" type="number" defaultValue={service?.pricingPremium?.toString() ?? ""} />
                        <Field label="Pricing — enterprise" name="pricingEnterprise" type="number" defaultValue={service?.pricingEnterprise?.toString() ?? ""} />
                    </div>
                    <Checkbox label="Active (visible on /services)" name="isActive" defaultChecked={service?.isActive ?? true} />
                </div>

                <div className="flex items-center justify-between gap-3">
                    <div>
                        {del && (
                            <form action={del}>
                                <button type="submit" className="inline-flex items-center gap-2 text-sm text-red-700 hover:bg-red-50 px-3 py-2 rounded-md border border-red-200">
                                    <FiTrash2 className="w-4 h-4" /> Delete
                                </button>
                            </form>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <Link href="/admin/services" className="px-4 py-2 text-sm border border-gray-200 hover:border-gray-300 rounded-md">Cancel</Link>
                        <button type="submit" className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white text-sm font-semibold px-5 py-2 rounded-md transition-colors">
                            {isEdit ? "Save changes" : "Create service"}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
