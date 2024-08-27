import { initialColors } from "./lib/colors";
import { useState } from "react";
import ColorCard from "./Components/ColorCard/ColorCard";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";

function App() {
  const initialThemes = [
    {
      id: "0",
      name: "Test",
      colors: initialColors,
    },

    {
      id: "1",
      name: "Test 2",
      colors: initialColors,
    },
    {
      id: "2",
      name: "Test 3",
      colors: initialColors,
    },
  ];

  const [themes, setThemes] = useState(initialThemes);
  const [selectedThemeId, setSelectedThemeId] = useState("0");

  const selectedTheme = themes.find((theme) => theme.id === selectedThemeId);

  function handleColorAdd(newColor) {
    const updatedThemes = themes.map((theme) => {
      if (theme.id !== selectedThemeId) {
        return theme;
      }

      const updatedColors = [
        { id: window.crypto.randomUUID(), ...newColor },
        ...theme.colors,
      ];
      const updatedTheme = {
        ...theme,
        colors: updatedColors,
      };

      console.log(updatedTheme);

      return updatedTheme;
    });

    setThemes(updatedThemes);
  }

  function handleColorDelete(id) {
    const updatedThemes = themes.map((theme) => {
      if (theme.id !== selectedThemeId) {
        return theme;
      }

      const updatedColors = theme.colors.filter((color) => color.id !== id);

      const updatedTheme = {
        ...theme,
        colors: updatedColors,
      };

      console.log(updatedTheme);

      return updatedTheme;
    });

    setThemes(updatedThemes);
  }

  function handleColorEdit(updatedColor) {
    const updatedThemes = themes.map((theme) => {
      if (theme.id !== selectedThemeId) {
        return theme;
      }

      const updatedColors = theme.colors.map((color) =>
        color.id !== updatedColor.id ? color : updatedColor,
      );

      const updatedTheme = {
        ...theme,
        colors: updatedColors,
      };

      console.log(updatedTheme);

      return updatedTheme;
    });

    setThemes(updatedThemes);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <select onChange={(event) => setSelectedThemeId(event.target.value)}>
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
      <ThemeDisplay
        theme={selectedTheme}
        onAdd={handleColorAdd}
        onDelete={handleColorDelete}
        onEdit={handleColorEdit}
      />
    </>
  );
}

function ThemeDisplay({ theme, onAdd, onEdit, onDelete }) {
  const { colors, name } = theme;

  return (
    <>
      <h2>{name}</h2>
      <ColorForm onSubmit={onAdd} />
      <ul>
        {colors.map((color) => (
          <li key={color.id}>
            <ColorCard color={color} onDelete={onDelete} onEdit={onEdit} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
