import { Home } from '../pages/Home';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import { NotFound } from '../pages/NotFound';
import type { JSX } from "react";

type RouteDef = {
    path: string;
    element: JSX.Element;
    title: string;
    publicOnly?: boolean;
    privateOnly?: boolean
};

export const ROUTE_PATHS = {
    HOME: '/',
    DASHBOARD: '/dashboard',
    LOGIN: '/login',
    NOT_FOUND: '*',
} as const;


export const ROUTES: RouteDef[] = [
    { path: ROUTE_PATHS.HOME, element: <Home/>, title: 'Home' },
    { path: ROUTE_PATHS.DASHBOARD, element: <Dashboard/>, title: 'Dashboard', privateOnly: true },
    { path: ROUTE_PATHS.LOGIN, element: <Login/>, title: 'Login', publicOnly: true },
    { path: ROUTE_PATHS.NOT_FOUND, element: <NotFound/>, title: 'Not Found' },
];
