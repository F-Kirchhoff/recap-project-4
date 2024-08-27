import "./ColorCard.css";
import ColorForm from "../ColorForm/ColorForm";
import { useState, useEffect } from "react";

const contrastScoreToEmojiMap = {
  Yup: "✨",
  Kinda: "🤷‍♀️",
  Nope: "👎",
};

export default function Color({ color, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [contrastScoreEmoji, setContrastScoreEmoji] = useState("❓");

  function handleShowEditForm() {
    setIsEditing(true);
  }

  function handleCancel() {
    setIsEditing(false);
  }

  function handleEdit(newColor) {
    onEdit({ id: color.id, ...newColor });
    setIsEditing(false);
  }

  function handleDelete() {
    if (confirm("Are you sure you want to delete this color?")) {
      onDelete(color.id);
    }
  }

  useEffect(() => {
    async function fetchContrastScore() {
      const response = await fetch(
        "https://www.aremycolorsaccessible.com/api/are-they",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ colors: [color.hex, color.contrastText] }),
        },
      );
      const data = await response.json();
      console.log(data);
      setContrastScoreEmoji(contrastScoreToEmojiMap[data.overall]);
    }
    fetchContrastScore();
  }, [color.hex, color.contrastText]);

  if (isEditing) {
    return (
      <div
        className="color-card__edit-container"
        style={{
          background: color.hex,
          color: color.contrastText,
        }}
      >
        <button className="color-card__close-button" onClick={handleCancel}>
          X
        </button>
        <ColorForm
          onSubmit={handleEdit}
          isEditing={isEditing}
          initialColor={color}
        />
      </div>
    );
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card__headline">
        {color.role} {contrastScoreEmoji}
      </h3>
      <div className="color-card__buttons">
        <button
          className="color-card__delete-button"
          onClick={handleShowEditForm}
        >
          Edit
        </button>
        <button className="color-card__delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <div className="color-card__main-color">
        <ColorDisplay value={color.hex} />
      </div>
      <div className="color-card__contrast-color">
        contrast:
        <span className="color-card__contrast-color-display">
          <ColorDisplay value={color.contrastText} />
        </span>
      </div>
    </div>
  );
}

function ColorDisplay({ value }) {
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  function handleClick() {
    if (showCopyMessage) {
      return;
    }

    window.navigator.clipboard.writeText(value);
    setShowCopyMessage(true);
    setTimeout(() => setShowCopyMessage(false), 2000);
  }

  return (
    <div>
      {showCopyMessage && (
        <p className="color-card__copy-message"> ✅ copied to clipboard</p>
      )}
      <button className="color-card__color-display" onClick={handleClick}>
        {value}
      </button>
    </div>
  );
}
