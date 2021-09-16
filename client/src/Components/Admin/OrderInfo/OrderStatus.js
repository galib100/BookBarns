import React from "react";
import { useState } from "react";
import placedImg from "../../../Assets/Admin/Order/clipboard.png";
import pendingImg from "../../../Assets/Admin/Order/pending.png";
import confirmImg from "../../../Assets/Admin/Order/planner.png";
import processingImg from "../../../Assets/Admin/Order/process.png";
import shippedImg from "../../../Assets/Admin/Order/shipped.png";
import deliveredImg from "../../../Assets/Admin/Order/delivery.png";
import styles from "./OrderInfo.module.css";

const OrderStatus = ({ status }) => {
  let stat = 0;
  if (status === "placed") {
    stat = 1;
  } else if (status === "pending") {
    stat = 2;
  } else if (status === "confirmed") {
    stat = 3;
  } else if (status === "processing") {
    stat = 4;
  } else if (status === "shipped") {
    stat = 5;
  } else if (status === "delivered") {
    stat = 6;
  }
  console.log(stat);
  return (
    <div>
      <div
        className={`${styles.base_status} ${
          stat >= 1 && styles.active
        } px-5 mt-3`}
      >
        <div className="">
          <img
            src={placedImg}
            alt={status}
            className={`${styles.status_img} ${stat < 1 && styles.img_gray}`}
          />{" "}
          <span
            className={`${styles.status_text} ${stat >= 1 && styles.active}`}
          >
            Order Placed
          </span>
        </div>
        <button className={`${styles.confirm} ${stat >= 1 && styles.active}`}>
          Confirm
        </button>
      </div>
      <div
        className={`${styles.base_status} ${
          stat >= 2 && styles.active
        } px-5 mt-3`}
      >
        <div className="">
          <img
            src={pendingImg}
            alt={status}
            className={`${styles.status_img} ${stat < 2 && styles.img_gray}`}
          />{" "}
          <span
            className={`${styles.status_text} ${stat >= 2 && styles.active}`}
          >
            Order Placed
          </span>
        </div>
        <button className={`${styles.confirm} ${stat >= 2 && styles.active}`}>
          Confirm
        </button>
      </div>
      <div
        className={`${styles.base_status} ${
          stat >= 3 && styles.active
        } px-5 mt-3`}
      >
        <div className="">
          <img
            src={confirmImg}
            alt={status}
            className={`${styles.status_img} ${stat < 3 && styles.img_gray}`}
          />{" "}
          <span
            className={`${styles.status_text} ${stat >= 3 && styles.active}`}
          >
            Order Confirm
          </span>
        </div>
        <button className={`${styles.confirm} ${stat >= 3 && styles.active}`}>
          Confirm
        </button>
      </div>
      <div
        className={`${styles.base_status} ${
          stat >= 4 && styles.active
        } px-5 mt-3`}
      >
        <div className="">
          <img
            src={processingImg}
            alt={status}
            className={`${styles.status_img} ${stat < 4 && styles.img_gray}`}
          />{" "}
          <span
            className={`${styles.status_text} ${stat >= 4 && styles.active}`}
          >
            Order Processing
          </span>
        </div>
        <button className={`${styles.confirm} ${stat >= 4 && styles.active}`}>
          Confirm
        </button>
      </div>
      <div
        className={`${styles.base_status} ${
          stat >= 5 && styles.active
        } px-5 mt-3`}
      >
        <div className="">
          <img
            src={shippedImg}
            alt={status}
            className={`${styles.status_img} ${stat < 5 && styles.img_gray}`}
          />{" "}
          <span
            className={`${styles.status_text} ${stat >= 5 && styles.active}`}
          >
            Order Shipped
          </span>
        </div>
        <button className={`${styles.confirm} ${stat >= 5 && styles.active}`}>
          Confirm
        </button>
      </div>
      <div
        className={`${styles.base_status} ${
          stat >= 6 && styles.active
        } px-5 mt-3`}
      >
        <div className="">
          <img
            src={deliveredImg}
            alt={status}
            className={`${styles.status_img} ${stat < 6 && styles.img_gray}`}
          />{" "}
          <span
            className={`${styles.status_text} ${stat >= 6 && styles.active}`}
          >
            Order Delivered
          </span>
        </div>
        <button className={`${styles.confirm} ${stat >= 6 && styles.active}`}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default OrderStatus;
