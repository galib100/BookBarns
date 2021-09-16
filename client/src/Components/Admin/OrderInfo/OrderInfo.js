import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import styles from "./OrderInfo.module.css";
import BookList from "./BookList";
import OrderStatus from "./OrderStatus";
import ClientInfo from "./ClientInfo";
import { ShadowCard } from "../../shared/ShadowCard";
import OrderDetails from "./OrderDetails";
import { Link } from "react-router-dom";

const OrderInfo = ({ order, loading }) => {
  const [totalBook, setTotalBook] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  return (
    <>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <Row className={styles.wrapper}>
          <Col md={7}>
            <BookList
              setTotalBook={setTotalBook}
              setTotalBill={setTotalBill}
              order={order.order}
            />
          </Col>
          <Col md={5}>
            <ShadowCard>
              <Row className="px-4 py-2">
                <Col xs={12}>
                  <h3>Ordered Books</h3>
                </Col>
                <Col xs={12} className={styles.border2}></Col>
                <Col xs={12}>
                  <OrderDetails
                    totalBook={totalBook}
                    totalBill={totalBill}
                    order={order}
                  />
                </Col>
              </Row>
            </ShadowCard>
            <div className="pt-3">
              <ShadowCard>
                <Row className="px-4 py-2">
                  <Col xs={12}>
                    <h3>Client Details</h3>
                  </Col>
                  <Col xs={12} className={styles.border2}></Col>
                  <Col xs={12}>
                    <ClientInfo client={order.client} />
                  </Col>
                </Row>
              </ShadowCard>
            </div>
          </Col>
          <Col xs={12} className="pt-5">
            <h3 className="pt-3">Ordered Status</h3>
            <OrderStatus status={order.status} />
          </Col>
        </Row>
      )}
      <div className="text-center pt-5">
        <Link to="/admin/orders" className="primary__btn">
          Go Back
        </Link>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  order: state.admin_orders.selected_order_admin,
  loading: state.admin_orders.loading,
});

export default connect(mapStateToProps, {})(OrderInfo);
