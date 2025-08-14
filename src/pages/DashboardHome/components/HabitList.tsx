import type { Habit } from "../model/types.ts";
import { HabitItem } from "./HabitItem.tsx";

type HabitListProps = {
    habits: Habit[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, title: string) => void;
};

function HabitList({ habits, onToggle, onDelete, onEdit }: Readonly<HabitListProps>) {

    console.log("habits list rendered")

    if (!habits.length)
        return <p className="text-gray-500">No habits yet. Add your first one above ✨</p>;

    return (
        <ul className="divide-y">
            {habits.map(h => (
                <HabitItem
                    key={h.id}
                    id={h.id}
                    title={h.title}
                    completedToday={h.completedToday}
                    streak={h.streak}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    );
}

export default HabitList;
