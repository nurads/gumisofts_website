import Link from "next/link";
import { saveProduct, deleteProduct } from "@/lib/admin-actions";
import {
    Field,
    Textarea,
    Checkbox,
    jsonArrayToLines,
} from "@/components/admin/FormPrimitives";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";

type ProductLike = {
    id?: string;
    slug?: string;
    name?: string;
    tagline?: string;
    description?: string;
    icon?: string;
    features?: string;
    benefits?: string;
    demoUrl?: string;
    order?: number;
    isActive?: boolean;
};

export default function ProductForm({ product }: { product?: ProductLike }) {
    const isEdit = Boolean(product?.id);
    const action = saveProduct.bind(null, product?.id ?? null);
    const del = product?.id ? deleteProduct.bind(null, product.id) : null;

    return (
        <>
            <div className="border-b border-gray-200 bg-white">
                <div className="px-8 py-6 flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isEdit ? "Edit product" : "New product"}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {isEdit ? "Update product information." : "Create a new SaaS product."}
                        </p>
                    </div>
                    <Link
                        href="/admin/products"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md border border-gray-200"
                    >
                        <FiArrowLeft className="w-4 h-4" /> Back
                    </Link>
                </div>
            </div>

            <form action={action} className="p-8 max-w-4xl space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                        <Field label="Name" name="name" defaultValue={product?.name ?? ""} required />
                        <Field
                            label="Slug (URL-friendly)"
                            name="slug"
                            defaultValue={product?.slug ?? ""}
                            placeholder="bita-business"
                            required
                        />
                    </div>
                    <Field label="Tagline" name="tagline" defaultValue={product?.tagline ?? ""} required />
                    <Textarea label="Description" name="description" defaultValue={product?.description ?? ""} rows={4} required />
                    <div className="grid md:grid-cols-3 gap-4">
                        <Field label="Icon (react-icons/fi name)" name="icon" defaultValue={product?.icon ?? "FiBox"} placeholder="FiUsers" />
                        <Field label="Demo URL" name="demoUrl" defaultValue={product?.demoUrl ?? ""} type="url" />
                        <Field label="Order" name="order" type="number" defaultValue={product?.order?.toString() ?? "0"} />
                    </div>
                    <Textarea label="Features (one per line)" name="features" defaultValue={jsonArrayToLines(product?.features)} rows={6} />
                    <Textarea label="Benefits (one per line)" name="benefits" defaultValue={jsonArrayToLines(product?.benefits)} rows={4} />
                    <Checkbox label="Active (visible on /products)" name="isActive" defaultChecked={product?.isActive ?? true} />
                </div>

                <div className="flex items-center justify-between gap-3">
                    <div>
                        {del && (
                            <form action={del}>
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-2 text-sm text-red-700 hover:bg-red-50 px-3 py-2 rounded-md border border-red-200"
                                >
                                    <FiTrash2 className="w-4 h-4" /> Delete
                                </button>
                            </form>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <Link href="/admin/products" className="px-4 py-2 text-sm border border-gray-200 hover:border-gray-300 rounded-md">
                            Cancel
                        </Link>
                        <button type="submit" className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white text-sm font-semibold px-5 py-2 rounded-md transition-colors">
                            {isEdit ? "Save changes" : "Create product"}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
