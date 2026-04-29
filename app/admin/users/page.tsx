import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { createUser, deleteUser, resetUserPassword } from "@/lib/admin-actions";
import { Field, SelectField } from "@/components/admin/FormPrimitives";
import { auth } from "@/lib/auth";
import { FiTrash2, FiKey } from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
    const [users, session] = await Promise.all([
        prisma.user.findMany({ orderBy: { createdAt: "asc" } }),
        auth(),
    ]);
    const meId = session?.user?.id;

    return (
        <>
            <AdminPageHeader
                title="Admin Users"
                description={`${users.length} accounts can access this admin area`}
            />
            <div className="p-8 grid lg:grid-cols-3 gap-6 max-w-6xl">
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">Name</th>
                                <th className="px-4 py-3 text-left font-medium">Email</th>
                                <th className="px-4 py-3 text-left font-medium">Role</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-50 align-top">
                                    <td className="px-4 py-3 font-medium text-gray-900">{u.name ?? "—"}</td>
                                    <td className="px-4 py-3 text-gray-600">{u.email}</td>
                                    <td className="px-4 py-3 text-gray-600">{u.role}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-2">
                                            <details className="relative">
                                                <summary className="list-none cursor-pointer inline-flex items-center gap-1 text-xs px-2 py-1 rounded border border-gray-200 hover:border-[#2b3991] hover:text-[#2b3991]">
                                                    <FiKey className="w-3.5 h-3.5" /> Reset
                                                </summary>
                                                <form
                                                    action={resetUserPassword.bind(null, u.id)}
                                                    className="absolute right-0 mt-2 z-10 bg-white border border-gray-200 rounded-md shadow-md p-3 w-64 space-y-2"
                                                >
                                                    <Field label="New password" name="password" type="password" required />
                                                    <button
                                                        type="submit"
                                                        className="w-full bg-[#2b3991] hover:bg-[#1f2a6b] text-white text-xs font-semibold py-1.5 rounded-md"
                                                    >
                                                        Set new password
                                                    </button>
                                                </form>
                                            </details>
                                            {u.id !== meId && (
                                                <form action={deleteUser.bind(null, u.id)}>
                                                    <button
                                                        type="submit"
                                                        className="text-xs p-1.5 rounded border border-gray-200 hover:border-red-300 hover:text-red-700"
                                                        aria-label="Delete user"
                                                    >
                                                        <FiTrash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </form>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <form action={createUser} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 h-fit">
                    <h2 className="font-semibold text-gray-900">Add admin user</h2>
                    <Field label="Name" name="name" />
                    <Field label="Email" name="email" type="email" required />
                    <Field label="Password" name="password" type="password" required />
                    <SelectField
                        label="Role"
                        name="role"
                        defaultValue="admin"
                        options={["admin", "editor", "viewer"]}
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#2b3991] hover:bg-[#1f2a6b] text-white text-sm font-semibold py-2 rounded-md transition-colors"
                    >
                        Create user
                    </button>
                </form>
            </div>
        </>
    );
}
