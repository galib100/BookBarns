import React from "react";
import styles from "./ShadowCard.module.css";

const ShadowCard = ({ children, title }) => {
  return (
    <div className={`${styles.card} shadow`}>
      {title && <div className={styles.header}>{title}</div>}
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default ShadowCard;
