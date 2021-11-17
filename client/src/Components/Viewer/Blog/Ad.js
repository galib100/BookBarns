import React from "react";
import { BASE_URL } from "../../../Constants/URL";
import styles from "./Ad.module.css";

const Ad = ({ link, image }) => {
  return (
    <div>
      <a href={link}>
        <img src={`${BASE_URL}/${image}`} className={styles.img} alt="" />
      </a>
    </div>
  );
};

export default Ad;
