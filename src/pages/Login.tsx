import React, { useState } from "react";
import { FormInput } from "../components/FormInput";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.ts";
import { ROUTE_PATHS } from "../constants/routes.tsx";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailErrors = validate('email', email);
        const passwordErrors = validate('password', password);
        const newErrors = {
            ...emailErrors,
            ...passwordErrors,
        };

        setFormErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setLoading(true);
            try {
                await login(email, password);
                navigate(ROUTE_PATHS.DASHBOARD);
            } catch (err) {
                console.error('Invalid credentials {}', err);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleChange = (field: 'email' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (field === 'email') setEmail(value);
        if (field === 'password') setPassword(value);

        const fieldErrors = validate(field, value);

        setFormErrors(prev => {
            const rest = { ...prev };
            delete rest[field];
            return { ...rest, ...fieldErrors };
        });
    };

    const validate = (field: string, value: string) => {
        const errors: typeof formErrors = {};

        if (field === 'email') {
            if (!value) {
                errors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                errors.email = 'Invalid email format';
            }
        }

        if (field === 'password') {
            if (!value) {
                errors.password = 'Password is required';
            } else if (value.length < 3) {
                errors.password = 'Password must be at least 3 characters';
            }
        }

        return errors;
    };

    return (
        <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput
                    id="email"
                    label="Email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={handleChange('email')}
                    error={formErrors.email}
                />

                <FormInput
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handleChange('password')}
                    error={formErrors.password}
                />

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition disabled:bg-indigo-950"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Log In'}
                </button>
            </form>
        </div>
    );
}

export default Login;
