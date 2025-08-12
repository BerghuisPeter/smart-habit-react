export type Field = "email" | "password";
export type Errors = { email?: string; password?: string };

export function validateField(field: Field, value: string): Errors {
    const errors: Errors = {};
    if (field === "email") {
        if (!value) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) errors.email = "Invalid email format";
    }
    if (field === "password") {
        if (!value) errors.password = "Password is required";
        else if (value.length < 3) errors.password = "Password must be at least 3 characters";
    }
    return errors;
}

export function validateAll(email: string, password: string): Errors {
    return { ...validateField("email", email), ...validateField("password", password) };
}
