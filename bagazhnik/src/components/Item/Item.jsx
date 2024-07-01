import styles from "./Item.module.scss";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ColorizeIcon from "@mui/icons-material/Colorize";

import { useDrag, useDrop } from "react-dnd";
import { memo } from "react";

const iconComponents = {
  WorkIcon: WorkIcon,
  AccessTimeIcon: AccessTimeIcon,
  ColorizeIcon: ColorizeIcon,
};

const DraggableElement = memo(function DraggableElement({
  id,
  itemName,
  moveCard,
  findCard,
  element,
}) {
  let elementQuantity = element.quantity;
  const IconComponent = iconComponents[itemName];
  const originalIndex = findCard(id).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "ELEMENT",
      item: { id, originalIndex, element, elementQuantity },

      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveCard]
  );
  const [, drop] = useDrop(
    () => ({
      accept: "ELEMENT",
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard]
  );
  const opacity = isDragging ? 0 : 1;
  return (
    <div
      ref={(node) => drag(drop(node))}
      //location={element.location}
      className={styles.cell}
    >
      {itemName && <IconComponent />}
      {element && <span>{elementQuantity}</span>}
    </div>
  );
});

export default DraggableElement;
