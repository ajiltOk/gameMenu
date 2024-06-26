import "./App.scss";
import Bagazhnik from "./components/Bagazhnik/Bagazhnik";
import Karman from "./components/Karman/Karman";
import Portfel from "./components/Portfel/Portfel";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="wrapper">
        <Karman />
        <Bagazhnik />
        <Portfel />
      </div>
    </DndProvider>
  );
}

export default App;
