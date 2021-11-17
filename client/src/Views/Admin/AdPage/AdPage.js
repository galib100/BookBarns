import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { AdList } from "../../../Components/Admin/AdList";
import { AdModal } from "../../../Components/Admin/AdModal";
import { NavbarAdmin } from "../../../Components/Admin/NavbarAdmin";
import { PageHeader } from "../../../Components/Admin/PageHeader";
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";

const AdPage = () => {
  return (
    <div className="bg-light">
      <AdModal />
      <NavbarAdmin />
      <Container fluid style={{ overflowX: "hidden" }} className="px-0">
        <Row>
          <Col md={3}>
            <SidebarAdmin />
          </Col>
          <Col md={9} className="pb-5 pr-md-5 pr-0">
            <PageHeader
              title="Ad Management"
              backLink="/admin/dashboard"
              backText="Home"
            />
            <AdList />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdPage;
