import { useState, useEffect, useRef } from "react";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import Rating from "./Rating";
import { KEY } from "../DATA";
import { useKey } from "../hooks/useKey";

export default function MovieDetails({
    movieId,
    onGoBack,
    onAddWatchedMovie,
    rating,
}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [userRating, setUserRating] = useState(0);

    // Using useRef to persist some values between renders
    const counterRef = useRef(0);

    const {
        Poster: poster,
        Title: title,
        Released: released,
        Runtime: runtime,
        Genre: genre,
        imdbRating,
        Actors: actors,
        Plot: plot,
        Director: director,
    } = movie;

    // if (imdbRating > 8) return <p>test</p>;

    useKey("keydown", "Escape", onGoBack);

    useEffect(
        function () {
            if (userRating) counterRef.current++;
        },
        [userRating]
    );

    useEffect(
        function () {
            // Create an AbortController instance
            const controller = new AbortController();
            async function getMovieDetails() {
                try {
                    setIsLoading(true);
                    const res = await fetch(
                        `http://www.omdbapi.com/?apikey=${KEY}&i=${movieId}`,
                        { signal: controller.signal }
                    );
                    if (!res.ok) throw new Error("Connection failed");

                    const data = await res.json();
                    setMovie(data);
                } catch (err) {
                    if (err.name === "AbortError") return;
                    console.error(err.message);
                    err.message === "Failed to fetch"
                        ? setError(
                              "Connection failed. Please check your connection."
                          )
                        : setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            }
            getMovieDetails();

            return () => controller.abort();
        },
        [movieId]
    );

    // Changing page title is a side effect because we are handling something in the outer world
    useEffect(
        function () {
            if (!title) return;
            document.title = `Movie | ${title}`;

            // will be executed when the component re-rendered and unmounted
            // It can remember all the variables at the same place and time where it was created
            return () => (document.title = "Usepopcorn");
        },
        [title]
    );

    function handleAdd() {
        const watchedMovie = {
            imdbID: movieId,
            title,
            poster,
            runtime: parseFloat(runtime) || 0,
            imdbRating: Number(imdbRating),
            userRating: Number(userRating),
            countUserDecision: counterRef.current,
        };
        onAddWatchedMovie(watchedMovie);
    }

    return (
        <>
            {isLoading && <Loader />}
            {error && <ErrorMessage message={error} />}
            {!error && !isLoading && (
                <div className="details">
                    <button className="btn-back" onClick={onGoBack}>
                        ⬅
                    </button>
                    <header>
                        <img src={poster} alt={title} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐️</span> {imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>
                    <section>
                        {!rating && (
                            <div className="rating rating-stars">
                                <Rating
                                    maxRating={10}
                                    color="#fcc419"
                                    size={20}
                                    onSetRating={setUserRating}
                                />
                                {userRating > 0 && (
                                    <button
                                        className="btn-add"
                                        onClick={handleAdd}
                                    >
                                        + Add to list
                                    </button>
                                )}
                            </div>
                        )}
                        {rating && (
                            <p className="rating">
                                You rated this movie {rating} ⭐️
                            </p>
                        )}
                        <p>{plot}</p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </div>
            )}
        </>
    );
}
