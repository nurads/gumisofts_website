export function Field({
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

export function Textarea({
    label,
    name,
    defaultValue,
    rows = 3,
    required,
    placeholder,
}: {
    label: string;
    name: string;
    defaultValue?: string;
    rows?: number;
    required?: boolean;
    placeholder?: string;
}) {
    return (
        <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}</label>
            <textarea
                name={name}
                rows={rows}
                defaultValue={defaultValue}
                required={required}
                placeholder={placeholder}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2b3991] resize-y"
            />
        </div>
    );
}

export function SelectField({
    label,
    name,
    defaultValue,
    options,
}: {
    label: string;
    name: string;
    defaultValue?: string;
    options: { value: string; label?: string }[] | string[];
}) {
    const opts = options.map((o) =>
        typeof o === "string" ? { value: o, label: o } : { value: o.value, label: o.label ?? o.value }
    );
    return (
        <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}</label>
            <select
                name={name}
                defaultValue={defaultValue}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2b3991]"
            >
                {opts.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export function Checkbox({
    label,
    name,
    defaultChecked,
}: {
    label: string;
    name: string;
    defaultChecked?: boolean;
}) {
    return (
        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input
                type="checkbox"
                name={name}
                defaultChecked={defaultChecked}
                className="rounded border-gray-300 text-[#2b3991] focus:ring-[#2b3991]"
            />
            {label}
        </label>
    );
}

export function jsonArrayToLines(val?: string | null) {
    if (!val) return "";
    try {
        const arr = JSON.parse(val);
        return Array.isArray(arr) ? arr.join("\n") : "";
    } catch {
        return "";
    }
}
