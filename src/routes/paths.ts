import { generatePath } from "react-router-dom";

export const ROUTE_PATHS = {
    HOME: "/",
    DASHBOARD: "/dashboard",
    DASHBOARD_INSIGHTS: "insights",
    DASHBOARD_HABIT: "habit/:habitId",
    LOGIN: "/login",
    NOT_FOUND: "*",
} as const;

export type HabitDetailParams = { habitId: string };

export const toHome = () => ROUTE_PATHS.HOME;
export const toDashboard = () => ROUTE_PATHS.DASHBOARD;
export const toDashboardInsights = () =>
    generatePath(ROUTE_PATHS.DASHBOARD + "/" + ROUTE_PATHS.DASHBOARD_INSIGHTS);
export const toHabitDetail = (p: HabitDetailParams) =>
    generatePath(ROUTE_PATHS.DASHBOARD + "/" + ROUTE_PATHS.DASHBOARD_HABIT, p);
export const toLogin = () => ROUTE_PATHS.LOGIN;
