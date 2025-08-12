import React, { forwardRef, type InputHTMLAttributes } from "react";
import clsx from "clsx";

type FormInputProps = {
    id: string;
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    hasError?: boolean;
    errorId?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInput = React.memo(forwardRef<HTMLInputElement, FormInputProps>(function FormInput(
    { id, label, value, onChange, hasError, errorId, className, ...inputHTMLAttributes },
    ref
) {
    console.log("FormInput " + label + " rendered");
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}

            <input
                ref={ref}
                id={id}
                value={value}
                onChange={onChange}
                aria-invalid={hasError || undefined}
                aria-describedby={hasError && errorId ? errorId : undefined}
                className={clsx(
                    "w-full px-3 py-2 border rounded focus:outline-none focus:ring-2",
                    hasError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500",
                    className
                )}
                {...inputHTMLAttributes}
            />
        </div>
    );
}));
