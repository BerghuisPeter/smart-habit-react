import './App.css'
import { Route, Routes } from "react-router-dom";
import { PrivateRouteGuard } from "./guards/PrivateRouteGuard.tsx";
import { PublicOnlyRouteGuard } from "./guards/PublicOnlyRouteGuard.tsx";
import RouteTitleTracker from "./shared/components/RouteTitleTracker.tsx";
import { Navbar } from "./shared/components/Navbar.tsx";
import { ROUTES } from "./shared/constants/routes.tsx";
import React from "react";

function App() {

    function wrapNode(node: React.ReactElement, privateOnly?: boolean, publicOnly?: boolean) {
        if (privateOnly) return <PrivateRouteGuard>{node}</PrivateRouteGuard>;
        if (publicOnly) return <PublicOnlyRouteGuard>{node}</PublicOnlyRouteGuard>;
        return node;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <RouteTitleTracker/>
            <Navbar/>

            <main className="flex-grow p-4">
                <Routes>
                    {ROUTES.map(({ path, element, privateOnly, publicOnly, children }) => {
                        if (children?.length) {
                            return (
                                <Route key={path} path={path} element={wrapNode(element, privateOnly, publicOnly)}>
                                    {children.map((c) =>
                                        c.index
                                            ? <Route key={`${path}-index`} index element={c.element}/>
                                            : <Route key={`${path}/${c.path}`} path={c.path} element={c.element}/>
                                    )}
                                </Route>
                            );
                        }

                        return <Route key={path} path={path} element={wrapNode(element, privateOnly, publicOnly)}/>;
                    })}
                </Routes>
            </main>

            <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
                © {new Date().getFullYear()} SmartHabit · Build smarter habits, daily.
            </footer>
        </div>
    );
}


export default App
