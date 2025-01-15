import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
    // This hook like useState hook but it has additional funcionality which is setting state and add the new data to the local storage
    const [value, setValue] = useState(
        () => JSON.parse(localStorage.getItem(key)) || initialState
    );

    useEffect(
        function () {
            localStorage.setItem(key, JSON.stringify(value));
        },
        [key, value]
    );

    return [value, setValue];
}
