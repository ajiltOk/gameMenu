import "./App.scss";
import Portfel from "./components/Portfel/Portfel";
import { useDrop } from "react-dnd";
import { useState, useEffect } from "react";
import Karman from "./components/Karman/Karman";
import Bagazhnik from "./components/Bagazhnik/Bagazhnik";
import data from "../data";

const App = () => {
  const [elements, setElements] = useState([]);
  const [draggedToKarman, setDraggedToKarman] = useState([]);
  const [draggedToPortfel, setDraggedToPortfel] = useState([]);

  useEffect(() => {
    setElements(data);
  }, []);

  const [, dropRefKarman] = useDrop({
    accept: "ELEMENT",
    drop(element) {
      if (element.element.location === "bagazhnik") {
        setDraggedToKarman([...draggedToKarman, element.element]),
          setElements(
            elements.filter((item) => item.id !== element.element.id)
          ),
          (element.element.location = "karman");
      } else if (element.element.location === "portfel") {
        setDraggedToKarman([...draggedToKarman, element.element]),
          setDraggedToPortfel(
            draggedToPortfel.filter((item) => item.id !== element.element.id)
          ),
          (element.element.location = "karman");
      }
    },
  });

  const [, dropRefPortfel] = useDrop({
    accept: "ELEMENT",
    drop(element) {
      if (element.element.location === "bagazhnik") {
        setDraggedToPortfel([...draggedToPortfel, element.element]),
          setElements(
            elements.filter((item) => item.id !== element.element.id)
          ),
          (element.element.location = "portfel");
      } else if (element.element.location === "karman") {
        setDraggedToPortfel([...draggedToPortfel, element.element]),
          setDraggedToKarman(
            draggedToKarman.filter((item) => item.id !== element.element.id)
          ),
          (element.element.location = "portfel");
      }
    },
  });

  const [, dropRefBagazhnik] = useDrop({
    accept: "ELEMENT",
    drop(element) {
      if (element.element.location === "karman") {
        setElements([...elements, element.element]),
          setDraggedToKarman(
            draggedToKarman.filter((item) => item.id !== element.element.id)
          ),
          (element.element.location = "bagazhnik");
      } else if (element.element.location === "portfel") {
        setElements([...elements, element.element]),
          setDraggedToPortfel(
            draggedToPortfel.filter((item) => item.id !== element.element.id)
          ),
          (element.element.location = "bagazhnik");
      }
    },
  });

  return (
    <div className="wrapper">
      <div ref={dropRefKarman}>
        <Karman draggedToKarman={draggedToKarman} />
      </div>
      <div ref={dropRefBagazhnik}>
        <Bagazhnik elements={elements} />
      </div>
      <div ref={dropRefPortfel}>
        <Portfel draggedToPortfel={draggedToPortfel} />
      </div>
    </div>
  );
};

export default App;
