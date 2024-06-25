import styles from "./Karman.module.scss";
import Item from "../Item/Item";

function Karman() {
  return (
    <div>
      <p>Карман</p>
      <div className={styles.container}>
        {[...Array(10)].map((_, index) => (
          <Item key={index} />
        ))}
      </div>
    </div>
  );
}

export default Karman;
