import { useState } from "react";
import PropTypes from "prop-types";

const ratingContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
};

Rating.propTypes = {
    maxRating: PropTypes.number,
    color: PropTypes.string,
    size: PropTypes.number,
    messages: PropTypes.array,
    defaultRating: PropTypes.number,
    onSetRating: PropTypes.func,
};

export default function Rating({
    maxRating = 5,
    color = "#000",
    size = 48,
    messages = [],
    defaultRating = 0,
    onSetRating,
    className = "",
}) {
    const [rating, setRating] = useState(defaultRating);
    const [tempRating, setTempRating] = useState(0);

    const ratingTextStyle = {
        lineHeight: "1",
        fontSize: `${size / 1.8}px`,
        margin: 0,
        color: color,
    };

    const starBtnStyle = {
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: "transparent",
        border: "none",
        outline: "none",
        cursor: "pointer",
    };

    const handleSetRating = (rate) => {
        setRating(rate);
        onSetRating(rate);
    };

    return (
        <div className={className} style={ratingContainerStyle}>
            <div>
                {Array.from({ length: maxRating }, (_, i) => (
                    <button
                        key={i}
                        onMouseOver={() => setTempRating(i + 1)}
                        onMouseLeave={() => setTempRating(0)}
                        onClick={() => handleSetRating(i + 1)}
                        style={starBtnStyle}
                    >
                        <Star
                            isFull={
                                tempRating
                                    ? tempRating >= i + 1
                                    : rating >= i + 1
                            }
                            color={color}
                        />
                    </button>
                ))}
            </div>
            <p style={ratingTextStyle}>
                {messages.length === maxRating
                    ? messages[tempRating ? tempRating - 1 : rating - 1]
                    : tempRating || rating || ""}
            </p>
        </div>
    );
}

function Star({ isFull, color }) {
    const starStyle = {
        width: "100%",
        height: "100%",
        stroke: color,
        fill: isFull ? color : "none",
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 25"
            style={starStyle}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="{2}"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
        </svg>
    );
}
