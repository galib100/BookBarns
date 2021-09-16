import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./OrderInfo.module.css";

const OrderDetails = ({ order, totalBook, totalBill }) => {
  return (
    <Row>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item}`}>Order ID</span>
      </Col>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item}`}>#{order.id}</span>
      </Col>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item}`}>Status</span>
      </Col>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item} ${styles.bold}`}>
          {order.status}
        </span>
      </Col>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item}`}>Total Books</span>
      </Col>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item}`}>
          <span className={styles.bold}>{totalBook}</span> Pieces
        </span>
      </Col>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item}`}>Total Bill</span>
      </Col>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item}`}>
          <span className={styles.bold}>{totalBill}</span>tk.
        </span>
      </Col>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item}`}>Ordering Date</span>
      </Col>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item}`}>{order.date}</span>
      </Col>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item}`}>Contact No.</span>
      </Col>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item}`}>
          {order.client.phone}
        </span>
      </Col>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item}`}>
          Shipping Address
        </span>
      </Col>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item}`}>
          {order.address}
        </span>
      </Col>
    </Row>
  );
};

export default OrderDetails;
