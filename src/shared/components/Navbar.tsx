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

    const logoutButton = (
        <li>
            <button
                onClick={logout}
                className="hover:underline text-white bg-indigo-600 p-1 rounded-lg md:text-red-400 md:p-0"
            >
                Logout
            </button>
        </li>
    );

    return (
        <nav className="bg-indigo-600 text-white px-4 py-3 shadow">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <Link to="/" className="text-xl font-bold tracking-tight">
                    SmartHabit
                </Link>
                <ul className="hidden md:flex space-x-4 ml-auto">
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
                        logoutButton
                    )}
                </ul>

                <input id="menu-toggle" type="checkbox" className="peer hidden"/>

                {/* Click-away overlay */}
                <label htmlFor="menu-toggle"
                       className="fixed inset-0 z-40 md:hidden
                        bg-black/30 opacity-0 pointer-events-none
                        transition-opacity duration-200
                        peer-checked:opacity-100 peer-checked:pointer-events-auto
                      "
                       aria-hidden="true"
                />

                <label
                    htmlFor="menu-toggle"
                    className="md:hidden ml-auto p-2 cursor-pointer rounded-lg focus:outline-none focus:ring
                                peer-checked:[&>div>span:nth-child(1)]:translate-y-2.5
                                peer-checked:[&>div>span:nth-child(1)]:rotate-45
                                peer-checked:[&>div>span:nth-child(2)]:opacity-0
                                peer-checked:[&>div>span:nth-child(3)]:-translate-y-2.5
                                peer-checked:[&>div>span:nth-child(3)]:-rotate-45
  "
                >
                    <span className="sr-only">Open main menu</span>
                    <div className="relative h-6 w-8">
                        <span
                            className="absolute left-0 top-1 block h-0.5 w-8 bg-current transition-transform duration-300"/>
                        <span
                            className="absolute left-0 top-1/2 -mt-0.5 block h-0.5 w-8 bg-current transition-opacity duration-300"/>
                        <span
                            className="absolute left-0 bottom-1 block h-0.5 w-8 bg-current transition-transform duration-300"/>
                    </div>
                </label>


                <ul className="space-y-3
                        md:hidden hidden peer-checked:block
                            fixed inset-y-0 right-0 z-50
                            flex flex-col gap-2
                            h-full w-1/2
                            rounded-l-lg border
                             bg-white p-3 text-gray-900 shadow-sm">

                    <li className="flex justify-end top-3 list-none">
                        <label
                            htmlFor="menu-toggle"
                            className="grid h-9 w-9 place-items-center rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring"
                            aria-label="Close menu"
                        >
                            <span className="sr-only">Close</span>
                            <div className="relative h-5 w-5">
                                <span
                                    className="absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 rotate-45 bg-current"></span>
                                <span
                                    className="absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 -rotate-45 bg-current"></span>
                            </div>
                        </label>
                    </li>

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
                    {logoutButton}
                </ul>

            </div>
        </nav>
    );
};
