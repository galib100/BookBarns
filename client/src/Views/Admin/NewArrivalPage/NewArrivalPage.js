import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { NavbarAdmin } from "../../../Components/Admin/NavbarAdmin";
import { NewArrivalsList } from "../../../Components/Admin/NewArrivalsList";
import { NewArrivalsModal } from "../../../Components/Admin/NewArrivalsModal";
import { PageHeader } from "../../../Components/Admin/PageHeader";
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";

const NewArrivalPage = () => {
  return (
    <div className="bg-light">
      <NewArrivalsModal />
      <NavbarAdmin />
      <Container fluid style={{ overflowX: "hidden" }} className="px-0">
        <Row>
          <Col md={3}>
            <SidebarAdmin />
          </Col>
          <Col md={9} className="pb-5 pr-md-5 pr-0">
            <PageHeader
              title="New Arrivals"
              modal="newArrivals"
              btnText="Add New Book In This List"
              backLink="/admin/dashboard"
              backText="Home"
            />
            <NewArrivalsList />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NewArrivalPage;
