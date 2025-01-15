import Label from "./Label";

export default function Movie({ movie, onSelectMovie }) {
    return (
        <li onClick={() => onSelectMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <Label icon="🗓">{movie.Year}</Label>
            </div>
        </li>
    );
}
