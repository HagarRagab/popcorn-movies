import Label from "./Label";

export default function WatchedMovie({ movie, onDeleteWatchedMovie }) {
    return (
        <li>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>
                <Label icon="⭐️">{movie.imdbRating}</Label>
                <Label icon="🌟">{movie.userRating}</Label>
                <Label icon="⏳">{movie.runtime} min</Label>
                <button
                    className="btn-delete"
                    onClick={() => onDeleteWatchedMovie(movie.imdbID)}
                >
                    x
                </button>
            </div>
        </li>
    );
}
