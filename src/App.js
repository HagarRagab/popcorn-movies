import { useCallback, useState } from "react";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

import Nav from "./components/Nav";
import Query from "./components/Query";
import NumResult from "./components/NumResult";
import Main from "./components/Main";
import Box from "./components/Box";
import MoviesList from "./components/MoviesList";
import Summary from "./components/Summary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import MovieDetails from "./components/MovieDetails";
import ErrorMessage from "./components/ErrorMessage";
import Loader from "./components/Loader";

export default function App() {
    const [watched, setWatched] = useLocalStorageState([], "watched");
    const [query, setQuery] = useState("");
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    const handleCloseMovie = useCallback(function () {
        setSelectedMovieId(null);
    }, []);
    const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

    function handleWatchedMovies(watchedMovie) {
        setWatched((movies) => [...movies, watchedMovie]);
        handleCloseMovie();
    }

    function handleDeleteWatchedMovie(id) {
        setWatched((movies) => movies.filter((movie) => movie.imdbID !== id));
    }

    return (
        <>
            <Nav>
                <Query query={query} onSetQuery={setQuery} />
                <NumResult movies={movies} />
            </Nav>
            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {error && <ErrorMessage message={error} />}
                    {!error && !isLoading && (
                        <MoviesList
                            movies={movies}
                            onSelectMovie={(id) =>
                                setSelectedMovieId(
                                    selectedMovieId === id ? null : id
                                )
                            }
                        />
                    )}
                </Box>
                <Box>
                    {selectedMovieId ? (
                        <MovieDetails
                            movieId={selectedMovieId}
                            onGoBack={() => handleCloseMovie()}
                            onAddWatchedMovie={handleWatchedMovies}
                            rating={
                                watched.find(
                                    (watched) =>
                                        watched.imdbID === selectedMovieId
                                )?.userRating
                            }
                        />
                    ) : (
                        <>
                            <Summary watched={watched} />
                            <WatchedMoviesList
                                watched={watched}
                                onDeleteWatchedMovie={handleDeleteWatchedMovie}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}
