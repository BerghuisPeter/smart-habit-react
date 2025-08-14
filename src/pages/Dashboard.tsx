import { Outlet } from "react-router-dom";


function Dashboard() {
    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <header className="flex flex-col gap-4 md:flex-row">
                <div>
                    <h1 className="text-3xl font-bold text-center md:text-left">📊 Your Dashboard</h1>
                    <p className="text-gray-600 text-center md:text-left">Track habits, watch streaks, and keep momentum.</p>
                </div>
            </header>

            <Outlet />
        </div>
    );
}


export default Dashboard
