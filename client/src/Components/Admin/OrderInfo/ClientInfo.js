import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./OrderInfo.module.css";

const ClientInfo = ({ client }) => {
  return (
    <Row>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item}`}>Clients Name</span>
      </Col>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item}`}>{client.name}</span>
      </Col>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item}`}>Phone No.</span>
      </Col>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item}`}>{client.phone}</span>
      </Col>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item}`}>Alt. Phone No.</span>
      </Col>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item}`}>
          {client.phone2}
        </span>
      </Col>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item}`}>Email</span>
      </Col>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item}`}>{client.email}</span>
      </Col>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item}`}>Address</span>
      </Col>
      <Col xs={6} className="pt-2">
        <span className={`d-block ${styles.details_item}`}>
          {client.address}
        </span>
      </Col>
    </Row>
  );
};

export default ClientInfo;
