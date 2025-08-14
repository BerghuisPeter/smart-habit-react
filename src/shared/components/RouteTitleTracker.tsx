import { useEffect } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { flattenRoutesWithNoIndex, ROUTES } from '../constants/routes';

const FLAT_ROUTES = flattenRoutesWithNoIndex(ROUTES);

const RouteTitleTracker = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const matched = FLAT_ROUTES.find(r =>
            matchPath({ path: r.path!, end: true }, pathname)
        );

        document.title = matched?.title
            ? `${import.meta.env.VITE_APP_TITLE} - ${matched.title}`
            : import.meta.env.VITE_APP_TITLE;
    }, [pathname]);

    return null;
};

export default RouteTitleTracker;
