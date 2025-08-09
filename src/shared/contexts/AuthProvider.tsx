import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import { jwtDecode } from 'jwt-decode';
import { LOCAL_STORAGE_TOKEN_KEY } from "../constants/common.ts";
import HttpClient from "../utils/HttpClient.ts";

type User = {
    email: string;
    role: string;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {

    useEffect(() => {
        const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
        if (token) {
            const decodedUser = jwtDecode<User>(token);
            setUser(decodedUser);
        }
    }, []);

    const [user, setUser] = useState<User | null>(null);

    const login = useCallback(async (email: string, password: string) => {
        if (email && password) {

            // fake call to login API and return mock user's token
            // const res = await fetch('https://your-api.com/auth/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email, password }),
            // });
            // if (!res.ok) {
            //     // handle 401/403 or validation errors
            //     throw new Error('Login failed');
            // }
            //
            // const data = await res.json();
            // const { token } = data;
            // const user = jwtDecode<User>(token);

            // For now, fake the jwt return
            // {email: 'user@example.com', role: 'user', exp: 1690000000}
            await new Promise(resolve => setTimeout(resolve, 1000));
            const token =
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                'eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsImV4cCI6MTY5MDAwMDAwMH0.' +
                'dummysignature';


            const user = jwtDecode<User>(token);
            setUser(user);
            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    }, []);

    const authValue = useMemo(
        () => ({ user, login, logout }),
        [user, login, logout]
    );

    useEffect(() => {
        HttpClient.setUnauthorizedHandler(logout);
    }, [logout]);

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
