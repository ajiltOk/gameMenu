import "./App.scss";
import Bagazhnik from "./components/Bagazhnik/Bagazhnik";
import Karman from "./components/Karman/Karman";
import Portfel from "./components/Portfel/Portfel";

function App() {
  return (
    <div className="wrapper">
      <Karman />
      <Bagazhnik />
      <Portfel />
    </div>
  );
}

export default App;
