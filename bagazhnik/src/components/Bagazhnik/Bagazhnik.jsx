/*import React, { useState } from "react";
import styles from "./Bagazhnik.module.scss";
import Item from "../Item/Item";
import data from "../../../data";

function Bagazhnik() {
  let numberOfOccupiedCells = 0;
  const [items, setItems] = useState(data);

  data.forEach((element) => {
    numberOfOccupiedCells += element.Quantity;
  });

  const handleDragStart = (index) => {
    setItems((prevItems) => {
      return prevItems.map((item, idx) => {
        if (idx === index) {
          return { ...item, isDragging: true };
        }
        return item;
      });
    });
  };

  const handleDragEnd = (index) => {
    setItems((prevItems) => {
      return prevItems.map((item, idx) => {
        if (idx === index) {
          return { ...item, isDragging: false };
        }
        return item;
      });
    });
  };

  const handleDrop = (currentIndex, dropIndex) => {
    const draggedItem = items[currentIndex];
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(currentIndex, 1);
      newItems.splice(dropIndex, 0, draggedItem);
      return newItems;
    });
  };

  return (
    <div>
      <p>Багажник</p>
      <div className={styles.container}>
        {items.map((item) =>
          [...Array(item.Quantity)].map((_, index) => (
            <div
              key={index}
              onDragStart={() => handleDragStart(index)}
              onDragEnd={() => handleDragEnd(index)}
              onDrop={() => handleDrop(index, index)}
              draggable
            >
              <Item itemName={item.Name} isDragging={item.isDragging} />
            </div>
          ))
        )}
        {[...Array(42 - numberOfOccupiedCells)].map((_, index) => (
          <Item key={index} />
        ))}
      </div>
    </div>
  );
}

export default Bagazhnik;*/

import React, { useState } from "react";
import DraggableElement from "../Item/Item";

const DraggableContainer = () => {
  const [elements, setElements] = useState([
    { id: 1, text: "Element 1" },
    { id: 2, text: "Element 2" },
    { id: 3, text: "Element 3" },
  ]);

  const moveElement = (fromId, toId) => {
    const fromIndex = elements.findIndex((element) => element.id === fromId);
    const toIndex = elements.findIndex((element) => element.id === toId);

    const updatedElements = [...elements];
    const [removedElement] = updatedElements.splice(fromIndex, 1);
    updatedElements.splice(toIndex, 0, removedElement);

    setElements(updatedElements);
  };

  return (
    <div>
      {elements.map((element) => (
        <DraggableElement
          key={element.id}
          id={element.id}
          text={element.text}
          moveElement={moveElement}
        />
      ))}
    </div>
  );
};

export default DraggableContainer;
