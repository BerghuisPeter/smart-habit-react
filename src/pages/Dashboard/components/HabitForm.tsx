import { useState } from "react";
import { FormInput } from "../../../shared/components/FormInput.tsx";

export const HabitForm = ({ onAdd }: Readonly<{ onAdd: (title: string) => void }>) => {
    const [title, setTitle] = useState("");
    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                onAdd(title);
                setTitle("");
            }}
            className="flex flex-col gap-2 md:flex-row"
        >
            <FormInput
                id="habit"
                value={title}
                placeholder="Add a new habit…"
                onChange={e => setTitle(e.target.value)} />
            <button
                type="submit"
                className="rounded-lg bg-indigo-600 text-white px-4 py-2 disabled:opacity-50"
                disabled={!title.trim()}
            >
                Add
            </button>
        </form>
    );
}
