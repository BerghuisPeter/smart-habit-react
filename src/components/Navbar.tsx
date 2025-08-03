import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useAuth } from "../hooks/useAuth.ts";
import { ROUTE_PATHS } from "../constants/routes.tsx";

export const Navbar = () => {

    const { pathname } = useLocation();
    const { user, logout } = useAuth();

    const links = [
        { path: ROUTE_PATHS.HOME, label: 'Home' },
        { path: ROUTE_PATHS.DASHBOARD, label: 'Dashboard', protected: true },
        { path: ROUTE_PATHS.LOGIN, label: 'Login', protected: false, hideWhenAuthenticated: true },
    ];

    return (
        <nav className="bg-indigo-600 text-white px-4 py-3 shadow">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <Link to="/" className="text-xl font-bold tracking-tight">
                    SmartHabit
                </Link>
                <ul className="flex space-x-4">
                    {links
                        .filter(link =>
                            (!link.protected || user) &&
                            !(link.hideWhenAuthenticated && user))
                        .map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={clsx(
                                        'hover:underline',
                                        pathname === link.path && 'underline font-semibold'
                                    )}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}

                    {user && (
                        <li>
                            <button
                                onClick={logout}
                                className="hover:underline text-red-200"
                            >
                                Logout
                            </button>
                        </li>
                    )}

                </ul>
            </div>
        </nav>
    );
};
