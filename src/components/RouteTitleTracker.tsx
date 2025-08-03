import { useEffect } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const RouteTitleTracker = () => {
    const location = useLocation();

    useEffect(() => {
        const matchedRoute = ROUTES.find(route =>
            matchPath(route.path, location.pathname)
        );

        if (matchedRoute?.title) {
            document.title = `${import.meta.env.VITE_APP_TITLE} - ${matchedRoute.title}`;
        } else {
            document.title = import.meta.env.VITE_APP_TITLE; // fallback
        }
    }, [location.pathname]);

    return null;
};

export default RouteTitleTracker;
