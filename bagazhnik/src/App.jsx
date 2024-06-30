import "./App.scss";
import Portfel from "./components/Portfel/Portfel";
import { useDrop } from "react-dnd";
import { useState, useEffect} from "react";
import Karman from "./components/Karman/Karman";
import Bagazhnik from "./components/Bagazhnik/Bagazhnik"

const base = [
  { id: 1, text: "Element 1", location: "bagazhnik"},
  { id: 2, text: "Element 2", location: "bagazhnik"},
  { id: 3, text: "Element 3", location: "bagazhnik"}
]

const App = () => {
  const [elements, setElements] = useState([]);
  const [draggedToKarman, setDraggedToKarman] = useState([]);
  const [draggedToPortfel, setDraggedToPortfel] = useState([]);  

  useEffect(() => {
    setElements(base)
  }, [])

  const [, dropRefKarman] = useDrop({
    accept: "ELEMENT",
    drop(element) {
      if(element.element.location === "bagazhnik") {
        setDraggedToKarman([...draggedToKarman, element.element]),
        setElements(elements.filter((item) => item.id !== element.element.id)),
        element.element.location = "karman"
      } else if(element.element.location === "portfel") {
        setDraggedToKarman([...draggedToKarman, element.element]),
        setDraggedToPortfel(draggedToPortfel.filter((item) => item.id !== element.element.id)),
        element.element.location = "karman"
      } else {
        movingWithinCell(draggedToKarman)
      }
    },
  })

  const [, dropRefPortfel] = useDrop({
    accept: "ELEMENT",
    drop(element) {
      if(element.element.location === "bagazhnik") {
        setDraggedToPortfel([...draggedToPortfel, element.element]),
        setElements(elements.filter((item) => item.id !== element.element.id)),
        element.element.location = "portfel"
      } else if(element.element.location === "karman") {
        setDraggedToPortfel([...draggedToPortfel, element.element]),
        setDraggedToKarman(draggedToKarman.filter((item) => item.id !== element.element.id)),
        element.element.location = "portfel"
      }

    },
  })

  const [, dropRefBagazhnik] = useDrop({
    accept: "ELEMENT",
    drop(element) {
      if(element.element.location === "karman") {
        setElements([...elements, element.element]),
        setDraggedToKarman(draggedToKarman.filter((item) => item.id !== element.element.id)),
        element.element.location = "bagazhnik"
      } else if(element.element.location === "portfel") {
        setElements([...elements, element.element]),
        setDraggedToPortfel(draggedToPortfel.filter((item) => item.id !== element.element.id)),
        element.element.location = "bagazhnik"
      }

    },
  })

  const movingWithinCell = (fromIndex, toIndex, draggedToKarman) => {
    const updatedItems = [...draggedToKarman];
    const [item] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, item);
    setDraggedToKarman(updatedItems);
  };


  return (
      <div className="wrapper" >
        <div className="dragEnd" ref={dropRefKarman} >      
          <Karman draggedToKarman={draggedToKarman} />  
        </div>
        <div className="dragStart" ref={dropRefBagazhnik}>
          <Bagazhnik elements={elements} />
        </div>
        <div ref={dropRefPortfel} >
          <Portfel draggedToPortfel={draggedToPortfel} />
        </div>
      </div>
  );
}

export default App;
