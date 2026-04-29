import Link from "next/link";
import { saveTestimonial, deleteTestimonial } from "@/lib/admin-actions";
import { Field, Textarea, Checkbox } from "@/components/admin/FormPrimitives";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";

type TestimonialLike = {
    id?: string;
    name?: string;
    position?: string;
    company?: string;
    avatar?: string;
    comment?: string;
    rating?: number;
    isApproved?: boolean;
    order?: number;
};

export default function TestimonialForm({ testimonial }: { testimonial?: TestimonialLike }) {
    const isEdit = Boolean(testimonial?.id);
    const action = saveTestimonial.bind(null, testimonial?.id ?? null);
    const del = testimonial?.id ? deleteTestimonial.bind(null, testimonial.id) : null;

    return (
        <>
            <div className="border-b border-gray-200 bg-white">
                <div className="px-8 py-6 flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{isEdit ? "Edit testimonial" : "New testimonial"}</h1>
                    </div>
                    <Link href="/admin/testimonials" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md border border-gray-200">
                        <FiArrowLeft className="w-4 h-4" /> Back
                    </Link>
                </div>
            </div>

            <form action={action} className="p-8 max-w-4xl space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                        <Field label="Name" name="name" defaultValue={testimonial?.name ?? ""} required />
                        <Field label="Position" name="position" defaultValue={testimonial?.position ?? ""} required />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Field label="Company" name="company" defaultValue={testimonial?.company ?? ""} />
                        <Field label="Avatar URL" name="avatar" defaultValue={testimonial?.avatar ?? ""} />
                    </div>
                    <Textarea label="Comment" name="comment" defaultValue={testimonial?.comment ?? ""} rows={5} required />
                    <div className="grid md:grid-cols-3 gap-4">
                        <Field label="Rating (1–5)" name="rating" type="number" defaultValue={(testimonial?.rating ?? 5).toString()} />
                        <Field label="Order" name="order" type="number" defaultValue={(testimonial?.order ?? 0).toString()} />
                        <div className="flex items-end">
                            <Checkbox label="Approved (visible)" name="isApproved" defaultChecked={testimonial?.isApproved ?? true} />
                        </div>
                    </div>
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
                        <Link href="/admin/testimonials" className="px-4 py-2 text-sm border border-gray-200 hover:border-gray-300 rounded-md">Cancel</Link>
                        <button type="submit" className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white text-sm font-semibold px-5 py-2 rounded-md transition-colors">
                            {isEdit ? "Save changes" : "Create"}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
