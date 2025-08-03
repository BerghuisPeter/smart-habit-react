import { useAuth } from "../hooks/useAuth.ts";

function Dashboard() {

    const { user } = useAuth();

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">📊 Your Dashboard</h1>
            <h2>Welcome, {user?.email}</h2>
            <div className="rounded-lg border p-6 bg-white shadow">
                <p className="text-gray-700 mb-2">Welcome back! Here's where you can:</p>
                <ul className="list-disc list-inside text-gray-600">
                    <li>Track your daily habits</li>
                    <li>View progress over time</li>
                    <li>Set new goals and reminders</li>
                </ul>
            </div>
        </div>
    );
}

export default Dashboard
