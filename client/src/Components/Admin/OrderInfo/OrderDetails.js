import React from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Moment from "react-moment";
import { BsClockHistory } from "react-icons/bs";
import styles from "./OrderInfo.module.css";

const OrderDetails = ({ order, totalBook, totalBill }) => {
  return (
    <>
      {order && (
        <Row>
          <Col xs={6} className="pt-2">
            <span className={`d-block ${styles.details_item}`}>Order ID</span>
          </Col>
          <Col xs={6} className="pt-2">
            <span className={`d-block ${styles.details_item}`}>
              #{order.id}
            </span>
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
            <span className={`d-block ${styles.details_item}`}>
              Total Books
            </span>
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
              <span className={styles.bold}>{order.totalprice}</span>tk.
            </span>
          </Col>
          <Col xs={6} className="pt-2">
            <span className={`d-block ${styles.details_item}`}>
              Ordering Date
            </span>
          </Col>
          <Col xs={6} className="pt-2">
            <span className={`d-block ${styles.details_item}`}>
              <Moment format="DD/MM/YYYY">{order.date}</Moment>{" "}
              <span className="mx-1">
                <BsClockHistory />
              </span>
              <Moment format="hh:mm" add={{ hours: 6 }}>
                {order.date}
              </Moment>
            </span>
          </Col>
          {order.appliedcupon && (
            <>
              <Col xs={6} className="pt-2">
                <span className={`d-block ${styles.details_item}`}>Cupon</span>
              </Col>
              <Col xs={6} className="pt-2">
                <span className={`d-block ${styles.details_item}`}>
                  {order.appliedcupon.cuponcode}{" "}
                  <span className="text-danger">
                    [
                    {order.appliedcupon.cupontype === "flat"
                      ? `-${order.appliedcupon.amount}tk`
                      : `-${order.appliedcupon.amount}%`}
                    ]
                  </span>
                </span>
              </Col>
            </>
          )}
          <Col xs={6} className="pt-2">
            <span className={`d-block ${styles.details_item}`}>
              Contact No.
            </span>
          </Col>
          <Col xs={6} className="pt-2">
            <span className={`d-block ${styles.details_item}`}>
              {order.client.phone1}
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
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  order: state.admin_orders.selected_order_admin,
});
export default connect(mapStateToProps, {})(OrderDetails);
