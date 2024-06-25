import React, { useState } from "react";
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
        {items.map((item, index) => (
          <div
            key={index}
            onDragStart={() => handleDragStart(index)}
            onDragEnd={() => handleDragEnd(index)}
            onDrop={() => handleDrop(index, index)}
            draggable
          >
            <Item
              itemName={item.Name}
              count={numberOfOccupiedCells}
              isDragging={item.isDragging}
            />
          </div>
        ))}
        {[...Array(42 - numberOfOccupiedCells)].map((_, index) => (
          <Item key={index} />
        ))}
      </div>
    </div>
  );
}

export default Bagazhnik;
