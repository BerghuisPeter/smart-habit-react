type LoadingProps = {
    label?: string;
    variant?: "page" | "inline";
};

export default function Loading({ label = "Loading…", variant = "page" }: Readonly<LoadingProps>) {
    const wrapper =
        variant === "page"
            ? "flex items-center justify-center min-h-[40vh] w-full"
            : "inline-flex items-center gap-2";

    const spinnerSize = variant === "page" ? "h-8 w-8" : "h-4 w-4";

    return (
        <output className={wrapper} aria-live="polite" aria-busy="true">
            <svg
                className={`${spinnerSize} animate-spin text-gray-500`}
                viewBox="0 0 24 24"
                fill="none"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
            </svg>
            {label && <span className="ml-3 text-sm text-gray-600">{label}</span>}
        </output>
    );
}
