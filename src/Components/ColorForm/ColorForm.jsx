import "./ColorForm.css";
import { useState } from "react";

const DEFAULT_COLOR = {
  hex: "#CCCCCC",
  contrastText: "#333333",
  role: "Primary",
};

export default function ColorForm({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formdata = new FormData(event.target);
    const color = Object.fromEntries(formdata);

    onSubmit(color);
  }

  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <label className="color-form__input-container">
        <span className="color-form__text-label">Role</span>
        <input
          type="text"
          id="role"
          name="role"
          defaultValue={DEFAULT_COLOR.role}
          className="color-form__role-input"
        />
      </label>
      <ColorInput
        name="hex"
        displayName="Hex"
        defaultValue={DEFAULT_COLOR.hex}
      />
      <ColorInput
        name="contrastText"
        displayName="Contrast Text"
        defaultValue={DEFAULT_COLOR.contrastText}
      />
      <button type="submit">Add Color</button>
    </form>
  );
}

function ColorInput({ name, displayName, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const onChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <label className="color-form__input-container">
      <span className="color-form__text-label">{displayName}</span>
      <input
        className="color-form__color-input-text"
        type="text"
        name={name}
        required
        onChange={onChange}
        value={value.toUpperCase()}
      />
      <input
        type="color"
        className="color-form__color-input-color"
        onChange={onChange}
        value={value}
      />
    </label>
  );
}
