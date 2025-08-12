import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../shared/hooks/useAuth.ts";
import { ROUTE_PATHS } from "../shared/constants/routes.tsx";
import { FormInput } from "../shared/components/FormInput.tsx";
import { validateAll, validateField } from "../shared/utils/formValidators.ts";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
    const [loading, setLoading] = useState(false);
    const emailRef = React.useRef<HTMLInputElement>(null);

    const { login } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        emailRef.current?.focus();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validateAll(email, password);
        setFormErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setLoading(true);
            try {
                await login(email, password);
                navigate(ROUTE_PATHS.DASHBOARD);
            } catch (err) {
                console.error("Invalid credentials {}", err);
            } finally {
                setLoading(false);
            }
        }
    };

    const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setFormErrors(prev => {
            const next = { ...prev };
            delete next.email;
            return { ...next, ...validateField("email", value) };
        });
    }, []);

    const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        setFormErrors(prev => {
            const next = { ...prev };
            delete next.password;
            return { ...next, ...validateField("password", value) };
        });
    }, []);

    return (
        <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput
                    ref={emailRef}
                    id="email"
                    label="Email"
                    type="email"
                    autoComplete="email"
                    placeholder="test@domain.com"
                    value={email}
                    onChange={onEmailChange}
                />
                {formErrors.email && (
                    <p id="email-error" className="text-sm text-red-600 mt-1" aria-live="polite">
                        {formErrors.email}
                    </p>
                )}

                <FormInput
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="P*ssword123"
                    value={password}
                    onChange={onPasswordChange}
                />
                {formErrors.password && (
                    <p id="password-error" className="text-sm text-red-600 mt-1" aria-live="polite">
                        {formErrors.password}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition disabled:bg-indigo-950"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Log In"}
                </button>
            </form>
        </div>
    );
}

export default Login;
