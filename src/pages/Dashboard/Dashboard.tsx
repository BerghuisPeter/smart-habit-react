import { useEffect, useMemo, useReducer } from "react";
import { Card } from "../../shared/components/Card.tsx";
import { Stat } from "./components/Stat.tsx";
import type { Habit } from "./model/types.ts";
import HabitList from "./components/HabitList.tsx";
import { habitReducer } from "./model/habitReducer.ts";
import { HabitForm } from "./components/HabitForm.tsx";


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


function Dashboard() {
    const [habits, dispatch] = useReducer(habitReducer, [], loadHabits);

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

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <header className="flex flex-col gap-4 md:flex-row md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-center md:text-left">📊 Your Dashboard</h1>
                    <p className="text-gray-600 text-center md:text-left">Track habits, watch streaks, and keep momentum.</p>
                </div>
                <button
                    className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
                    onClick={() => dispatch({ type: "RESET_TODAY" })}
                    title="Uncheck all for today"
                >
                    Reset Today
                </button>
            </header>

            {/* Stats */}
            <section className="grid gap-4 sm:grid-cols-3">
                <Card><Stat label="Habits Today" value={`${stats.done}/${stats.total}`} /></Card>
                <Card><Stat label="Total Habits" value={stats.total} /></Card>
                <Card><Stat label="Longest Streak" value={`${stats.longest} days`} /></Card>
            </section>

            {/* Add Habit */}
            <Card>
                <HabitForm onAdd={title => dispatch({ type: "ADD", title })} />
            </Card>

            {/* Habit List */}
            <Card>
                <h2 className="text-lg font-semibold mb-3">Today</h2>
                <HabitList
                    habits={habits}
                    onToggle={id => dispatch({ type: "TOGGLE_TODAY", id })}
                    onDelete={id => dispatch({ type: "DELETE", id })}
                    onEdit={(id, title) => dispatch({ type: "EDIT", id, title })}
                />
            </Card>

            {/* Quick Actions */}
            <section className="grid gap-3 sm:grid-cols-2">
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
            </section>
        </div>
    );
}


export default Dashboard
