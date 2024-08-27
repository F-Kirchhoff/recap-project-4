import { initialColors } from "./lib/colors";
import { useState } from "react";
import ColorCard from "./Components/ColorCard/ColorCard";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import { useEffect } from "react";

const DEFAULT_THEME = {
  name: "New Theme",
  colors: [],
};

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

  function handleThemeEdit(updatedTheme) {
    const updatedThemes = themes.map((theme) => {
      if (theme.id !== selectedThemeId) {
        return theme;
      }
      return { ...theme, ...updatedTheme };
    });

    setThemes(updatedThemes);
  }

  function handleColorAdd(newColor) {
    const updatedColors = [
      { id: window.crypto.randomUUID(), ...newColor },
      ...selectedTheme.colors,
    ];

    const updatedTheme = {
      ...selectedTheme,
      colors: updatedColors,
    };

    handleThemeEdit(updatedTheme);
  }

  function handleColorDelete(id) {
    const updatedColors = selectedTheme.colors.filter(
      (color) => color.id !== id,
    );

    const updatedTheme = {
      ...selectedTheme,
      colors: updatedColors,
    };

    handleThemeEdit(updatedTheme);
  }

  function handleColorEdit(updatedColor) {
    const updatedColors = selectedTheme.colors.map((color) =>
      color.id !== updatedColor.id ? color : updatedColor,
    );

    const updatedTheme = {
      ...selectedTheme,
      colors: updatedColors,
    };

    handleThemeEdit(updatedTheme);
  }

  function handleThemeRename(newName) {
    const updatedTheme = {
      ...selectedTheme,
      name: newName,
    };

    handleThemeEdit(updatedTheme);
  }

  function handleThemeAdd() {
    const newID = window.crypto.randomUUID();
    setThemes([...themes, { id: newID, ...DEFAULT_THEME }]);
    setSelectedThemeId(newID);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <select
        value={selectedThemeId}
        onChange={(event) => setSelectedThemeId(event.target.value)}
      >
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
      <button onClick={handleThemeAdd}>Add new Theme</button>
      <ThemeDisplay
        theme={selectedTheme}
        onAdd={handleColorAdd}
        onDelete={handleColorDelete}
        onEdit={handleColorEdit}
        onRename={handleThemeRename}
      />
    </>
  );
}

function ThemeDisplay({ theme, onAdd, onEdit, onDelete, onRename }) {
  const [isRename, setIsRename] = useState(false);
  const { colors, name } = theme;

  useEffect(() => {
    setIsRename(false);
  }, [theme.name]);

  return (
    <>
      {isRename ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onRename(event.target.elements.name.value);
            setIsRename(false);
          }}
        >
          <input defaultValue={name} name="name" />
          <button>Apply Changes</button>
        </form>
      ) : (
        <>
          <h2>{name}</h2>
          <button onClick={() => setIsRename(true)}>Edit</button>
        </>
      )}

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
