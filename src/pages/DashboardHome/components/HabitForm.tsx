import React, { useCallback, useState } from "react";
import { FormInput } from "../../../shared/components/FormInput.tsx";

export const HabitForm = React.memo(function HabitForm({
                                                           onAdd,
                                                       }: Readonly<{ onAdd: (title: string) => void }>) {
    const [title, setTitle] = useState("");

    const onTitleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
        },
        []
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!title.trim()) return;
            onAdd(title);
            setTitle("");
        },
        [onAdd, title]
    );

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:flex-row">
            <FormInput
                id="habit"
                value={title}
                placeholder="Add a new habit…"
                onChange={onTitleChange}
            />
            <button
                type="submit"
                className="rounded-lg bg-indigo-600 text-white px-4 py-2 disabled:opacity-50"
                disabled={!title.trim()}
            >
                Add
            </button>
        </form>
    );
});
