import { initialColors } from "./lib/colors";
import ColorCard from "./Components/ColorCard/ColorCard";
import "./App.css";

function App() {
  return (
    <>
      <h1>Theme Creator</h1>
      <ul>
        {initialColors.map((color) => (
          <li key={color.id}>
            <ColorCard color={color} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
