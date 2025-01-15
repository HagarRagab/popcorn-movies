import { useEffect } from "react";

export function useKey(event, key, callback) {
    useEffect(
        function () {
            const eventCallback = (e) => {
                if (e.code === key) callback();
            };
            document.addEventListener(event, eventCallback);
            return () => document.removeEventListener(event, eventCallback);
        },
        [event, key, callback]
    );
}
