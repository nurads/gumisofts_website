import Link from "next/link";
import { saveProject, deleteProject } from "@/lib/admin-actions";
import { Field, Textarea, Checkbox, jsonArrayToLines } from "@/components/admin/FormPrimitives";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";

type ProjectLike = {
    id?: string;
    title?: string;
    description?: string;
    image?: string;
    category?: string;
    technologies?: string;
    demoUrl?: string | null;
    githubUrl?: string | null;
    isFeatured?: boolean;
    order?: number;
};

export default function ProjectForm({ project }: { project?: ProjectLike }) {
    const isEdit = Boolean(project?.id);
    const action = saveProject.bind(null, project?.id ?? null);
    const del = project?.id ? deleteProject.bind(null, project.id) : null;

    return (
        <>
            <div className="border-b border-gray-200 bg-white">
                <div className="px-8 py-6 flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{isEdit ? "Edit project" : "New project"}</h1>
                        <p className="text-sm text-gray-500 mt-1">{isEdit ? "Update portfolio entry." : "Add a new case study."}</p>
                    </div>
                    <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md border border-gray-200">
                        <FiArrowLeft className="w-4 h-4" /> Back
                    </Link>
                </div>
            </div>

            <form action={action} className="p-8 max-w-4xl space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
                    <Field label="Title" name="title" defaultValue={project?.title ?? ""} required />
                    <Textarea label="Description" name="description" defaultValue={project?.description ?? ""} rows={4} required />
                    <div className="grid md:grid-cols-2 gap-4">
                        <Field label="Image URL" name="image" defaultValue={project?.image ?? ""} placeholder="/assets/work/myproject.png" required />
                        <Field label="Category" name="category" defaultValue={project?.category ?? "Web"} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Field label="Demo URL" name="demoUrl" type="url" defaultValue={project?.demoUrl ?? ""} />
                        <Field label="GitHub URL" name="githubUrl" type="url" defaultValue={project?.githubUrl ?? ""} />
                    </div>
                    <Textarea label="Technologies (one per line)" name="technologies" defaultValue={jsonArrayToLines(project?.technologies)} rows={4} />
                    <div className="grid md:grid-cols-2 gap-4">
                        <Field label="Order" name="order" type="number" defaultValue={project?.order?.toString() ?? "0"} />
                        <div className="flex items-end">
                            <Checkbox label="Featured (visible on homepage)" name="isFeatured" defaultChecked={project?.isFeatured ?? true} />
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
                        <Link href="/admin/projects" className="px-4 py-2 text-sm border border-gray-200 hover:border-gray-300 rounded-md">Cancel</Link>
                        <button type="submit" className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white text-sm font-semibold px-5 py-2 rounded-md transition-colors">
                            {isEdit ? "Save changes" : "Create project"}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
