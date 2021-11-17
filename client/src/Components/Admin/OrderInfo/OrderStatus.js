import React from "react";
import placedImg from "../../../Assets/Admin/Order/clipboard.png";
import pendingImg from "../../../Assets/Admin/Order/pending.png";
import confirmImg from "../../../Assets/Admin/Order/planner.png";
import processingImg from "../../../Assets/Admin/Order/process.png";
import shippedImg from "../../../Assets/Admin/Order/shipped.png";
import deliveredImg from "../../../Assets/Admin/Order/delivery.png";
import styles from "./OrderInfo.module.css";
import { connect } from "react-redux";
import swal from "sweetalert";
import { editOrderStatus } from "../../../Actions/Admin/OrderItemActions";
import { useState } from "react";
import { useEffect } from "react";

const OrderStatus = ({ order, editOrderStatus }) => {
  let status = order.status.toLowerCase();
  const [stat, setStat] = useState(0);

  useEffect(() => {
    if (status === "placed") {
      setStat(1);
    } else if (status === "pending") {
      setStat(2);
    } else if (status === "confirm") {
      setStat(3);
    } else if (status === "processing") {
      setStat(4);
    } else if (status === "shipped") {
      setStat(5);
    } else if (status === "delivered") {
      setStat(6);
    }
  }, [status]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const statusHandeler = (newStatus, active) => {
    if (newStatus.toLowerCase() === order.status.toLowerCase()) {
      swal(`Can not update to the same status`, {
        icon: "warning",
      });
    } else {
      let flag = editOrderStatus(capitalizeFirstLetter(newStatus), order.id);
      if (flag) {
        swal("Status Updated!", {
          icon: "success",
        });
      } else {
        swal("Something Went Wrong", {
          icon: "warning",
        });
      }
    }
  };
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
        <button
          className={`${styles.confirm} ${stat >= 1 && styles.active}`}
          onClick={() => statusHandeler("Placed", stat >= 1)}
        >
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
            Order Pending
          </span>
        </div>
        <button
          className={`${styles.confirm} ${stat >= 2 && styles.active}`}
          onClick={() => statusHandeler("Pending", stat >= 2)}
        >
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
        <button
          className={`${styles.confirm} ${stat >= 3 && styles.active}`}
          onClick={() => statusHandeler("Confirm", stat >= 3)}
        >
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
        <button
          className={`${styles.confirm} ${stat >= 4 && styles.active}`}
          onClick={() => statusHandeler("Processing", stat >= 4)}
        >
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
        <button
          className={`${styles.confirm} ${stat >= 5 && styles.active}`}
          onClick={() => statusHandeler("Shipped", stat >= 5)}
        >
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
        <button
          className={`${styles.confirm} ${stat >= 6 && styles.active}`}
          onClick={() => statusHandeler("Delivered", stat >= 6)}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  order: state.admin_orders.selected_order_admin,
});
export default connect(mapStateToProps, { editOrderStatus })(OrderStatus);
