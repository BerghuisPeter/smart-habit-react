import { memo } from "react";

type HabitItemProps = {
    id: string;
    title: string;
    completedToday: boolean;
    streak: number;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, title: string) => void;
};

export const HabitItem = memo(
    ({ id, title, completedToday, streak, onToggle, onDelete, onEdit }: HabitItemProps) => {

        console.log("row rendered", id);

        return (
            <li className="flex items-center justify-between py-3">
                <label className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={completedToday}
                        onChange={() => onToggle(id)}
                        className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-gray-800">{title}</span>
                </label>

                <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">🔥 {streak}d</span>
                    <button
                        className="text-sm text-indigo-600 hover:underline"
                        onClick={() => {
                            const next = prompt("Rename habit", title);
                            if (next !== null) onEdit(id, next.trim());
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className="text-sm text-red-600 hover:underline"
                        onClick={() => onDelete(id)}
                    >
                        Delete
                    </button>
                </div>
            </li>
        );
    });
