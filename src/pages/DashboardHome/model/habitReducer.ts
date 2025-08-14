import type { Habit, HabitAction } from "./types.ts";

export function habitReducer(state: Habit[], action: HabitAction): Habit[] {
    switch (action.type) {
        case "ADD": {
            const newHabit: Habit = {
                id: crypto.randomUUID(),
                title: action.title.trim(),
                createdAt: new Date().toISOString(),
                completedToday: false,
                streak: 0,
            };
            if (!newHabit.title) return state;
            return [...state, newHabit];
        }
        case "TOGGLE_TODAY": {
            return state.map(h =>
                h.id === action.id
                    ? {
                        ...h,
                        completedToday: !h.completedToday,
                        // naive streak handling for demo purposes
                        streak: !h.completedToday ? h.streak + 1 : Math.max(0, h.streak - 1),
                    }
                    : h
            );
        }
        case "DELETE": {
            return state.filter(h => h.id !== action.id);
        }
        case "EDIT": {
            return state.map(h => (h.id === action.id ? { ...h, title: action.title } : h));
        }
        case "RESET_TODAY": {
            return state.map(h => ({ ...h, completedToday: false }));
        }
        default:
            return state;
    }
}
