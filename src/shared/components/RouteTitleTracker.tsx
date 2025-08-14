import { useEffect } from "react";
import { useMatches } from "react-router-dom";

export default function RouteTitleTracker() {
    const matches = useMatches(); // deepest match last

    useEffect(() => {
        const last = matches[matches.length - 1];
        const title =
            (last?.handle as { title?: string } | undefined)?.title ??
            "SmartHabit";
        document.title = `${import.meta.env.VITE_APP_TITLE || "SmartHabit"}${title ? " - " + title : ""}`;
    }, [matches]);

    return null;
}
