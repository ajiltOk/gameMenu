import styles from "./Karman.module.scss";
import DraggableElement from "../Item/Item";

const Karman = ({ draggedToKarman }) => {

  return (
    <>
      <p>Карман</p>
      <div className={styles.container}>
        {draggedToKarman.map((element, index) => (
          <DraggableElement 
            key={index} 
            element={element}
          />
        ))}
      </div>
    </>
  );
}

export default Karman;
