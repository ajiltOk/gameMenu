import styles from "./Portfel.module.scss";
import DraggableElement from "../Item/Item";

function Portfel({ draggedToPortfel }) {
  return (
    <>
      <p>Портфель</p>
      <div className={styles.container}>
        {draggedToPortfel.map((element, index) => (
          <DraggableElement 
            key={index} 
            element={element}
          />
        ))}
      </div>
    </>
  );
}

export default Portfel;
