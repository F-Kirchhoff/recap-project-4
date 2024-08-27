import { initialColors } from "./lib/colors";
import { useState } from "react";
import ColorCard from "./Components/ColorCard/ColorCard";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";

function App() {
  const [colors, setColors] = useState(initialColors);

  function handleColorAdd(color) {
    setColors([{ ...color, id: window.crypto.randomUUID() }, ...colors]);
  }

  function handleColorDelete(id) {
    setColors(colors.filter((color) => color.id !== id));
  }
  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmit={handleColorAdd} />
      <ul>
        {colors.map((color) => (
          <li key={color.id}>
            <ColorCard color={color} onDelete={handleColorDelete} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
