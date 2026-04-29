import Link from "next/link";
import { FiPlus } from "react-icons/fi";

type Props = {
    title: string;
    description?: string;
    actionLabel?: string;
    actionHref?: string;
    children?: React.ReactNode;
};

export default function AdminPageHeader({
    title,
    description,
    actionLabel,
    actionHref,
    children,
}: Props) {
    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="px-8 py-6 flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                    {description && (
                        <p className="text-sm text-gray-500 mt-1">{description}</p>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {children}
                    {actionLabel && actionHref && (
                        <Link
                            href={actionHref}
                            className="inline-flex items-center gap-2 bg-[#2b3991] hover:bg-[#1f2a6b] text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
                        >
                            <FiPlus className="w-4 h-4" />
                            {actionLabel}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
