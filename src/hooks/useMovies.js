import { useState, useEffect } from "react";
import { KEY } from "../DATA";

export function useMovies(query, callback) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(
        function () {
            callback?.();
            const controller = new AbortController();
            async function getMovies() {
                try {
                    setIsLoading(true);
                    setError("");

                    const res = await fetch(
                        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                        { signal: controller.signal }
                    );

                    const data = await res.json();
                    if (data.Response === "False")
                        throw new Error("No movies found.");

                    setMovies(data.Search);
                } catch (err) {
                    if (err.name === "AbortError") return;
                    console.error(err.message);
                    if (err.message === "Failed to fetch")
                        setError(
                            "Something went wrong. Please check your connection."
                        );
                    else setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            }
            if (query.length < 3) {
                setError("");
                setMovies([]);
                return;
            }
            getMovies();

            return () => controller.abort();
        },
        [query, callback]
    );

    return { isLoading, movies, error };
}
