import { Outlet } from "react-router-dom";
import RouteTitleTracker from "../components/RouteTitleTracker.tsx";
import { Navbar } from "../components/Navbar.tsx";

export default function RootLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <RouteTitleTracker />
            <Navbar />
            <main className="flex-grow p-4">
                <Outlet />
            </main>
            <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
                © {new Date().getFullYear()} SmartHabit · Build smarter habits, daily.
            </footer>
        </div>
    );
}
