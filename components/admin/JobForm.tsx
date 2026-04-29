import Link from "next/link";
import { saveJob, deleteJob } from "@/lib/admin-actions";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";

type JobLike = {
    id?: string;
    title?: string;
    department?: string;
    location?: string;
    type?: string;
    experience?: string;
    description?: string;
    requirements?: string;
    responsibilities?: string;
    benefits?: string;
    salaryMin?: number | null;
    salaryMax?: number | null;
    salaryCurrency?: string | null;
    deadline?: Date;
    isActive?: boolean;
};

const parseLines = (val?: string) => {
    if (!val) return "";
    try {
        const arr = JSON.parse(val);
        if (Array.isArray(arr)) return arr.join("\n");
    } catch {
        /* noop */
    }
    return "";
};

export default function JobForm({ job }: { job?: JobLike }) {
    const isEdit = Boolean(job?.id);
    const action = saveJob.bind(null, job?.id ?? null);
    const del = job?.id ? deleteJob.bind(null, job.id) : null;

    return (
        <>
            <div className="border-b border-gray-200 bg-white">
                <div className="px-8 py-6 flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isEdit ? "Edit job" : "New job"}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {isEdit ? "Update this posting." : "Create a new job posting."}
                        </p>
                    </div>
                    <Link
                        href="/admin/jobs"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md border border-gray-200"
                    >
                        <FiArrowLeft className="w-4 h-4" /> Back
                    </Link>
                </div>
            </div>

            <form action={action} className="p-8 max-w-4xl space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
                    <Field label="Title" name="title" defaultValue={job?.title ?? ""} required />
                    <div className="grid md:grid-cols-2 gap-4">
                        <Field
                            label="Department"
                            name="department"
                            defaultValue={job?.department ?? ""}
                            required
                        />
                        <Field
                            label="Location"
                            name="location"
                            defaultValue={job?.location ?? ""}
                            required
                        />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        <SelectField
                            label="Type"
                            name="type"
                            defaultValue={job?.type ?? "full-time"}
                            options={["full-time", "part-time", "contract", "internship"]}
                        />
                        <Field
                            label="Experience"
                            name="experience"
                            defaultValue={job?.experience ?? ""}
                            placeholder="e.g. 3+ years"
                            required
                        />
                        <Field
                            label="Deadline"
                            name="deadline"
                            type="date"
                            defaultValue={
                                job?.deadline
                                    ? new Date(job.deadline).toISOString().slice(0, 10)
                                    : ""
                            }
                            required
                        />
                    </div>
                    <Textarea
                        label="Description"
                        name="description"
                        defaultValue={job?.description ?? ""}
                        rows={4}
                        required
                    />
                    <Textarea
                        label="Requirements (one per line)"
                        name="requirements"
                        defaultValue={parseLines(job?.requirements)}
                        rows={5}
                    />
                    <Textarea
                        label="Responsibilities (one per line)"
                        name="responsibilities"
                        defaultValue={parseLines(job?.responsibilities)}
                        rows={5}
                    />
                    <Textarea
                        label="Benefits (one per line)"
                        name="benefits"
                        defaultValue={parseLines(job?.benefits)}
                        rows={4}
                    />

                    <div className="grid md:grid-cols-3 gap-4">
                        <Field
                            label="Salary min"
                            name="salaryMin"
                            type="number"
                            defaultValue={job?.salaryMin?.toString() ?? ""}
                        />
                        <Field
                            label="Salary max"
                            name="salaryMax"
                            type="number"
                            defaultValue={job?.salaryMax?.toString() ?? ""}
                        />
                        <Field
                            label="Currency"
                            name="salaryCurrency"
                            defaultValue={job?.salaryCurrency ?? "USD"}
                        />
                    </div>

                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            name="isActive"
                            defaultChecked={job?.isActive ?? true}
                            className="rounded border-gray-300 text-[#2b3991] focus:ring-[#2b3991]"
                        />
                        Active (visible on /careers)
                    </label>
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
                        <Link
                            href="/admin/jobs"
                            className="px-4 py-2 text-sm border border-gray-200 hover:border-gray-300 rounded-md"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white text-sm font-semibold px-5 py-2 rounded-md transition-colors"
                        >
                            {isEdit ? "Save changes" : "Create job"}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

function Field({
    label,
    name,
    type = "text",
    defaultValue,
    placeholder,
    required,
}: {
    label: string;
    name: string;
    type?: string;
    defaultValue?: string;
    placeholder?: string;
    required?: boolean;
}) {
    return (
        <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}</label>
            <input
                type={type}
                name={name}
                defaultValue={defaultValue}
                placeholder={placeholder}
                required={required}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2b3991]"
            />
        </div>
    );
}

function Textarea({
    label,
    name,
    defaultValue,
    rows = 3,
    required,
}: {
    label: string;
    name: string;
    defaultValue?: string;
    rows?: number;
    required?: boolean;
}) {
    return (
        <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}</label>
            <textarea
                name={name}
                rows={rows}
                defaultValue={defaultValue}
                required={required}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2b3991] resize-y"
            />
        </div>
    );
}

function SelectField({
    label,
    name,
    defaultValue,
    options,
}: {
    label: string;
    name: string;
    defaultValue?: string;
    options: string[];
}) {
    return (
        <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}</label>
            <select
                name={name}
                defaultValue={defaultValue}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2b3991]"
            >
                {options.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
        </div>
    );
}
