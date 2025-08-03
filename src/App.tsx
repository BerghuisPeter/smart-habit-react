import './App.css'
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar.tsx";
import { ROUTES } from "./constants/routes.tsx";
import { PrivateRouteGuard } from "./guards/PrivateRouteGuard.tsx";
import { PublicOnlyRouteGuard } from "./guards/PublicOnlyRouteGuard.tsx";
import RouteTitleTracker from "./components/RouteTitleTracker.tsx";

function App() {

    return (
        <div className="min-h-screen flex flex-col">
            <RouteTitleTracker/>
            <Navbar/>

            <main className="flex-grow p-4">
                <Routes>
                    {ROUTES.map(({ path, element, privateOnly, publicOnly }) => {
                        if (privateOnly) {
                            return (
                                <Route
                                    key={path}
                                    path={path}
                                    element={<PrivateRouteGuard>{element}</PrivateRouteGuard>}
                                />
                            );
                        }

                        if (publicOnly) {
                            return (
                                <Route
                                    key={path}
                                    path={path}
                                    element={<PublicOnlyRouteGuard>{element}</PublicOnlyRouteGuard>}
                                />
                            );
                        }

                        return <Route key={path} path={path} element={element}/>;
                    })}
                </Routes>
            </main>

            <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
                © {new Date().getFullYear()} SmartHabit · Build smarter habits, daily.
            </footer>
        </div>
    )
}


export default App
