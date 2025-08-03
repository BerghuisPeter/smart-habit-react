import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
            <p className="text-lg text-gray-700 mb-6">Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="text-indigo-600 hover:underline">
                ← Go back to Home
            </Link>
        </div>
    );
};
