import "./ColorCard.css";

export default function Color({ color, onDelete }) {
  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card__headline">{color.role}</h3>
      <div className="color-card__buttons">
        <button
          className="color-card__delete-button"
          onClick={() => onDelete(color.id)}
        >
          Delete
        </button>
      </div>
      <p className="color-card__main-color">{color.hex}</p>
      <p className="color-card__contrast-color">
        contrast:{" "}
        <span className="color-card__contrast-color-display">
          {color.contrastText}
        </span>
      </p>
    </div>
  );
}
