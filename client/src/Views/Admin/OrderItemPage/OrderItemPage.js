import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { NavbarAdmin } from "../../../Components/Admin/NavbarAdmin";
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";
import { getOrderItem } from "../../../Actions/Admin/OrderItemActions";
import { OrderInfo } from "../../../Components/Admin/OrderInfo";
import { connect } from "react-redux";

const OrderItemPage = (props) => {
  const { getOrderItem } = props;
  let id = props.match.params.id;

  getOrderItem(id);

  return (
    <div style={{ background: "#F5F5F5" }}>
      <NavbarAdmin />
      <Container fluid style={{ overflowX: "hidden" }} className="px-0">
        <Row className="mr-0">
          <Col md={3}>
            <SidebarAdmin />
          </Col>
          <Col md={9} className="pb-5 pt-4 px-3">
            <OrderInfo />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default connect(null, { getOrderItem })(OrderItemPage);
