import styles from "./Portfel.module.scss";
import Item from "../Item/Item";

function Portfel() {
  return (
    <div>
      <p>Портфель</p>
      <div className={styles.container}>
        {[...Array(20)].map((_, index) => (
          <Item key={index} />
        ))}
      </div>
    </div>
  );
}

export default Portfel;
