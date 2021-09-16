import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { AllBooks } from "../../../Components/Admin/AllBooks";
import { BookCards } from "../../../Components/Admin/BookCards";
import { NavbarAdmin } from "../../../Components/Admin/NavbarAdmin";
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";

const DashboardPage = () => {
  return (
    <div className="bg-light">
      <NavbarAdmin />
      <Container fluid style={{ overflowX: "hidden" }} className="px-0">
        <Row>
          <Col md={3}>
            <SidebarAdmin />
          </Col>
          <Col md={9} className="pb-5">
            <BookCards />
            <AllBooks />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DashboardPage;
