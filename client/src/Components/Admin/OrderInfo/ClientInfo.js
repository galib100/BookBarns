import React from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import styles from "./OrderInfo.module.css";

const ClientInfo = ({ client }) => {
  return (
    <>
      {client && (
        <Row>
          <Col xs={6} className="pt-2">
            <span className={`d-block ${styles.details_item}`}>
              Clients Name
            </span>
          </Col>
          <Col xs={6} className="pt-2">
            <span className={`d-block ${styles.details_item}`}>
              {client.username}
            </span>
          </Col>
          <Col xs={6} className="pt-2">
            <span className={`d-block ${styles.details_item}`}>Phone No.</span>
          </Col>
          <Col xs={6} className="pt-2">
            <span className={`d-block ${styles.details_item}`}>
              {client.phone1}
            </span>
          </Col>
          <Col xs={6} className="pt-2">
            <span className={`d-block ${styles.details_item}`}>
              Alt. Phone No.
            </span>
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
            <span className={`d-block ${styles.details_item}`}>
              {client.email}
            </span>
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
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  client: state.admin_orders.selected_order_admin.client,
});
export default connect(mapStateToProps, {})(ClientInfo);
