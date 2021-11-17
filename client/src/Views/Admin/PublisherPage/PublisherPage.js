import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { NavbarAdmin } from "../../../Components/Admin/NavbarAdmin";
import { PageHeader } from "../../../Components/Admin/PageHeader";
import { PublisherEditModal } from "../../../Components/Admin/PublisherEditModal";
import { PublisherList } from "../../../Components/Admin/PublisherList";
import { PublisherModal } from "../../../Components/Admin/PublisherModal";
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";

const BestSeller = () => {
  return (
    <div className="bg-light">
      <PublisherModal />
      <PublisherEditModal />
      <NavbarAdmin />
      <Container fluid style={{ overflowX: "hidden" }} className="px-0">
        <Row>
          <Col md={3}>
            <SidebarAdmin />
          </Col>
          <Col md={9} className="pb-5 pr-md-5 pr-0">
            <PageHeader
              title="Publisher Management"
              modal="publisher"
              btnText="Add New Publisher"
              backLink="/admin/dashboard"
              backText="Home"
            />
            <PublisherList />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BestSeller;
