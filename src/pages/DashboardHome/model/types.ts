export type Habit = {
    id: string;
    title: string;
    createdAt: string; // ISO
    completedToday: boolean;
    streak: number; // simple streak counter
};

export type HabitAction =
    | { type: "ADD"; title: string }
    | { type: "TOGGLE_TODAY"; id: string }
    | { type: "DELETE"; id: string }
    | { type: "EDIT"; id: string; title: string }
    | { type: "RESET_TODAY" };
