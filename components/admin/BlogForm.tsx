import Link from "next/link";
import { saveBlog, deleteBlog } from "@/lib/admin-actions";
import { Field, Textarea, Checkbox, jsonArrayToLines } from "@/components/admin/FormPrimitives";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";

type PostLike = {
    id?: string;
    slug?: string;
    title?: string;
    excerpt?: string;
    content?: string;
    authorName?: string;
    authorBio?: string;
    category?: string;
    tags?: string;
    image?: string;
    readTime?: number;
    featured?: boolean;
    isPublished?: boolean;
};

export default function BlogForm({ post }: { post?: PostLike }) {
    const isEdit = Boolean(post?.id);
    const action = saveBlog.bind(null, post?.id ?? null);
    const del = post?.id ? deleteBlog.bind(null, post.id) : null;

    return (
        <>
            <div className="border-b border-gray-200 bg-white">
                <div className="px-8 py-6 flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{isEdit ? "Edit post" : "New post"}</h1>
                    </div>
                    <Link href="/admin/blog" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md border border-gray-200">
                        <FiArrowLeft className="w-4 h-4" /> Back
                    </Link>
                </div>
            </div>

            <form action={action} className="p-8 max-w-4xl space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
                    <Field label="Title" name="title" defaultValue={post?.title ?? ""} required />
                    <Field label="Slug" name="slug" defaultValue={post?.slug ?? ""} required />
                    <Textarea label="Excerpt" name="excerpt" defaultValue={post?.excerpt ?? ""} rows={3} required />
                    <Textarea label="Content (Markdown)" name="content" defaultValue={post?.content ?? ""} rows={14} required />
                    <div className="grid md:grid-cols-2 gap-4">
                        <Field label="Author name" name="authorName" defaultValue={post?.authorName ?? "Gumisofts"} />
                        <Field label="Author bio" name="authorBio" defaultValue={post?.authorBio ?? ""} />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        <Field label="Category" name="category" defaultValue={post?.category ?? "Technology"} />
                        <Field label="Image URL" name="image" defaultValue={post?.image ?? ""} />
                        <Field label="Read time (min)" name="readTime" type="number" defaultValue={(post?.readTime ?? 5).toString()} />
                    </div>
                    <Textarea label="Tags (one per line)" name="tags" defaultValue={jsonArrayToLines(post?.tags)} rows={3} />
                    <div className="flex flex-col gap-2">
                        <Checkbox label="Featured" name="featured" defaultChecked={post?.featured ?? false} />
                        <Checkbox label="Published" name="isPublished" defaultChecked={post?.isPublished ?? true} />
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
                        <Link href="/admin/blog" className="px-4 py-2 text-sm border border-gray-200 hover:border-gray-300 rounded-md">Cancel</Link>
                        <button type="submit" className="bg-[#2b3991] hover:bg-[#1f2a6b] text-white text-sm font-semibold px-5 py-2 rounded-md transition-colors">
                            {isEdit ? "Save changes" : "Create post"}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
