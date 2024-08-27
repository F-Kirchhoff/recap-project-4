import "./ColorCard.css";
import ColorForm from "../ColorForm/ColorForm";
import { useState } from "react";

export default function Color({ color, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);

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
      <h3 className="color-card__headline">{color.role}</h3>
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
