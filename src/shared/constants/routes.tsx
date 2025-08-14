import { type JSX } from "react";
import { Home } from "../../pages/Home.tsx";
import Login from "../../pages/Login.tsx";
import { NotFound } from "../../pages/NotFound.tsx";
import { DashboardInsights } from "../../pages/DashboardInsights.tsx";
import { DashboardHome } from "../../pages/DashboardHome/DashboardHome.tsx";
import Dashboard from "../../pages/Dashboard.tsx";
import { HabitDetail } from "../../pages/HabitDetail.tsx";

export type RouteDef = {
    path?: string;
    element: JSX.Element;
    title?: string;
    index?: boolean;
    publicOnly?: boolean;
    privateOnly?: boolean
    children?: RouteDef[];
};

export const ROUTE_PATHS = {
    HOME: '/',
    DASHBOARD: '/dashboard',
    LOGIN: '/login',
    NOT_FOUND: '*',
    DASHBOARD_INSIGHTS: 'insights',
    DASHBOARD_HABIT_DETAIL: 'habit/:habitId'
} as const;


export const ROUTES: RouteDef[] = [
    { path: ROUTE_PATHS.HOME, element: <Home/>, title: 'Home' },
    {
        path: ROUTE_PATHS.DASHBOARD,
        element: <Dashboard/>,
        title: "Dashboard",
        privateOnly: true,
        children: [
            {
                index: true, element: <DashboardHome/>,
            },
            {
                path: ROUTE_PATHS.DASHBOARD_INSIGHTS,
                element: <DashboardInsights/>,
                title: "Insights"
            },
            {
                path: ROUTE_PATHS.DASHBOARD_HABIT_DETAIL,
                element: <HabitDetail />,
                title: "Habit Detail",
            }
        ],
    },
    { path: ROUTE_PATHS.LOGIN, element: <Login/>, title: 'Login', publicOnly: true },
    { path: ROUTE_PATHS.NOT_FOUND, element: <NotFound/>, title: 'Not Found' },
];

export function flattenRoutesWithNoIndex(
    routes: RouteDef[],
    parentPath = ""
): RouteDef[] {
    return routes.flatMap((route) => {

        if (route.index && !route.path) {
            return [];
        }

        const fullPath = route.path
            ? `${parentPath}${route.path}`.replace(/\/+/g, "/")
            : parentPath || "/";

        const currentRoute: RouteDef = { ...route, path: fullPath };

        const children = route.children
            ? flattenRoutesWithNoIndex(route.children, fullPath + "/")
            : [];

        return [currentRoute, ...children];
    });
}
