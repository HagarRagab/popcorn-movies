import { useRef } from "react";
import { useKey } from "../hooks/useKey";

export default function Query({ query, onSetQuery }) {
    const inputEl = useRef(null);

    useKey("keypress", "Enter", () => {
        // prevent clearing the input value in case the input is being already focused
        if (document.activeElement === inputEl.current) return;
        onSetQuery("");
        inputEl.current.focus();
    });

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => onSetQuery(e.target.value)}
            ref={inputEl}
            autoFocus
        />
    );
}
