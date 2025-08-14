import { useParams } from "react-router-dom";

export const HabitDetail = () => {
    const { habitId } = useParams<{ habitId: string }>();

    return (
        <div style={{ padding: 20 }}>
            <h2>Habit Detail</h2>
            <p>Habit ID: {habitId}</p>
        </div>
    );
};
