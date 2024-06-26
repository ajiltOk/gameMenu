/*import styles from "./Item.module.scss";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ColorizeIcon from "@mui/icons-material/Colorize";

const iconComponents = {
  WorkIcon: WorkIcon,
  AccessTimeIcon: AccessTimeIcon,
  ColorizeIcon: ColorizeIcon,
};

function Item({ itemName }) {
  const IconComponent = iconComponents[itemName];
  return <div className={styles.item}>{itemName && <IconComponent />}</div>;
}

export default Item;*/

import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const DraggableElement = ({ id, text, moveElement }) => {
  let draggedRef = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: "ELEMENT",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "ELEMENT",
    hover: (item) => {
      if (!draggedRef.current) {
        return;
      }
      if (item.id !== id) {
        moveElement(item.id, id);
      }
    },
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity }}>
      {text}
    </div>
  );
};

export default DraggableElement;
