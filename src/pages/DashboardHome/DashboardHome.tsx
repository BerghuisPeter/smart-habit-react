import { useCallback, useEffect, useMemo, useReducer } from "react";
import type { Habit } from "./model/types.ts";
import { Card } from "../../shared/components/Card.tsx";
import { Stat } from "./components/Stat.tsx";
import { HabitForm } from "./components/HabitForm.tsx";
import HabitList from "./components/HabitList.tsx";
import { habitReducer } from "./model/habitReducer.ts";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../shared/constants/routes.tsx";


// -------------------- Local Storage, normally fetched from API--------------------
const LS_KEY = "smarthabit.habits";
function loadHabits(): Habit[] {
    try {
        const raw = localStorage.getItem(LS_KEY);
        return raw ? (JSON.parse(raw) as Habit[]) : [];
    } catch {
        return [];
    }
}

export function DashboardHome() {
    const [habits, dispatch] = useReducer(habitReducer, [], loadHabits);
    const navigate = useNavigate();

    // persist
    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(habits));
    }, [habits]);

    // demo: mark all as not done at midnight (simple client-side reset)
    useEffect(() => {
        const now = new Date();
        const msTillMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
        const timer = setTimeout(() => dispatch({ type: "RESET_TODAY" }), msTillMidnight);
        return () => clearTimeout(timer);
    }, []);



    // stats
    const stats = useMemo(() => {
        const total = habits.length;
        const done = habits.filter(h => h.completedToday).length;
        const longest = habits.reduce((m, h) => Math.max(m, h.streak), 0);
        return { total, done, longest };
    }, [habits]);

    const handleToggle = useCallback((id: string) => {
        dispatch({ type: "TOGGLE_TODAY", id });
    }, []);

    const handleDelete = useCallback((id: string) => {
        dispatch({ type: "DELETE", id });
    }, []);

    const handleEdit = useCallback((id: string, title: string) => {
        dispatch({ type: "EDIT", id, title });
    }, []);

    const goToInsightsPage = ()=> {
        navigate(ROUTE_PATHS.DASHBOARD_INSIGHTS);
    }

    return (
        <>
            {/* Stats */}
            <section className="grid gap-4 sm:grid-cols-3">
                <Card><Stat label="Habits Today" value={`${stats.done}/${stats.total}`}/></Card>
                <Card><Stat label="Total Habits" value={stats.total}/></Card>
                <Card><Stat label="Longest Streak" value={`${stats.longest} days`}/></Card>
            </section>

            {/* Add Habit */}
            <Card>
                <HabitForm onAdd={title => dispatch({ type: "ADD", title })}/>
            </Card>

            {/* Habit List */}
            <Card>
                <h2 className="text-lg font-semibold mb-3">Today</h2>
                <HabitList
                    habits={habits}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
            </Card>

            {/* Quick Actions */}
            <section className="grid gap-3 sm:grid-cols-3">
                <button
                    className="rounded-xl bg-indigo-600 text-white px-4 py-3 font-medium hover:bg-indigo-700"
                    onClick={() => {
                        const unchecked = habits.filter(h => !h.completedToday).map(h => h.id);
                        unchecked.forEach(id => dispatch({ type: "TOGGLE_TODAY", id }));
                    }}
                >
                    Mark All Done Today
                </button>
                <button
                    className="rounded-xl border px-4 py-3 font-medium hover:bg-gray-50"
                    onClick={() => {
                        const examples = ["Drink water", "Read 10 pages", "Walk 5k steps", "Meditate 5 min"];
                        const pick = examples[Math.floor(Math.random() * examples.length)];
                        dispatch({ type: "ADD", title: pick });
                    }}
                >
                    Add Random Habit
                </button>
                <button className="rounded-xl border px-4 py-3 font-medium bg-indigo-600 hover:bg-indigo-700"
                        onClick={goToInsightsPage}
                >
                    go to insights
                </button>
            </section>
        </>
    );
}
