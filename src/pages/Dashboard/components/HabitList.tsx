import type { Habit } from "../model/types.ts";

type HabitListProps = {
    habits: Habit[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, title: string) => void;
};

function HabitList({ habits, onToggle, onDelete, onEdit }: Readonly<HabitListProps>) {
    if (!habits.length)
        return <p className="text-gray-500">No habits yet. Add your first one above ✨</p>;

    return (
        <ul className="divide-y">
            {habits.map(h => (
                <li key={h.id} className="flex items-center justify-between py-3">
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={h.completedToday}
                            onChange={() => onToggle(h.id)}
                            className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className={"text-gray-800"}>{h.title}</span>
                    </label>

                    <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">🔥 {h.streak}d</span>
                        <button
                            className="text-sm text-indigo-600 hover:underline"
                            onClick={() => {
                                const next = prompt("Rename habit", h.title);
                                if (next !== null) onEdit(h.id, next.trim());
                            }}
                        >
                            Edit
                        </button>
                        <button
                            className="text-sm text-red-600 hover:underline"
                            onClick={() => onDelete(h.id)}
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default HabitList;
