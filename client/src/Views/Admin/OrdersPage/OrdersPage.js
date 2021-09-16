import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { BookCards } from "../../../Components/Admin/BookCards";
import { NavbarAdmin } from "../../../Components/Admin/NavbarAdmin";
import { RunningOrders } from "../../../Components/Admin/RunningOrders";
import { CompletedOrders } from "../../../Components/Admin/CompletedOrders";
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";

const OrdersPage = () => {
  return (
    <div className="bg-light">
      <NavbarAdmin />
      <Container fluid style={{ overflowX: "hidden" }} className="px-0">
        <Row>
          <Col md={3}>
            <SidebarAdmin />
          </Col>
          <Col md={9} className="pb-5 pr-md-5 pr-0">
            <BookCards />
            <div className="mb-4">
              <RunningOrders />
            </div>
            <CompletedOrders />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrdersPage;
