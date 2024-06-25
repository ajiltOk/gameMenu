import styles from "./Item.module.scss";
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

export default Item;
