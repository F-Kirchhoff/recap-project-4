import "./ColorCard.css";

export default function Color({ color }) {
  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card__headline">{color.role}</h3>
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
