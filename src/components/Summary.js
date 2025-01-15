import Label from "./Label";

export const average = (arr) =>
    arr.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0).toFixed(1);

export default function Summary({ watched }) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));
    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <Label icon="#️⃣">{watched.length} movies</Label>
                <Label icon="⭐️">{avgImdbRating}</Label>
                <Label icon="🌟">{avgUserRating}</Label>
                <Label icon="⏳">{avgRuntime} min</Label>
            </div>
        </div>
    );
}
