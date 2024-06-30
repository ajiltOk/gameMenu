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

import { useDrag, useDrop} from "react-dnd";

const DraggableElement = ({ element }) => {

  const [{ isDragging }, dragRef] = useDrag({
    type: "ELEMENT",
    item: { element },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "ELEMENT",
    hover: (element) => {
      console.log(element)
    },
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <>
      {element && !isDragging &&
        <div ref={dragRef} style={{ opacity }} location={element.location} id={element.id}>
        {element.text}
      </div>
      }
      {element && isDragging &&
        <div ref={dropRef} style={{ opacity }} location={element.location} id={element.id}>
        {element.text}
      </div>
      }
    </> 
  );
};

export default DraggableElement;
