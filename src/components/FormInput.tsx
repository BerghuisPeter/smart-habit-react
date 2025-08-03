import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

type FormInputProps = {
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInput = ({
                              label,
                              id,
                              value,
                              onChange,
                              error,
                              className,
                              ...inputProps
                          }: FormInputProps) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                id={id}
                value={value}
                onChange={onChange}
                {...inputProps}
                className={clsx(
                    'w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2',
                    error
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-indigo-500',
                    className
                )}
            />
            {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
        </div>
    );
};
