import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { NavbarAdmin } from "../../../Components/Admin/NavbarAdmin";
import { PageHeader } from "../../../Components/Admin/PageHeader";
import { PreOrderList } from "../../../Components/Admin/PreOrderList/";
import { PreOrderModal } from "../../../Components/Admin/PreOrderModal/";
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";

const PreOrderPage = () => {
  return (
    <div className="bg-light">
      <PreOrderModal />
      <NavbarAdmin />
      <Container fluid style={{ overflowX: "hidden" }} className="px-0">
        <Row>
          <Col md={3}>
            <SidebarAdmin />
          </Col>
          <Col md={9} className="pb-5 pr-md-5 pr-0">
            <PageHeader
              title="Pre-Order List"
              modal="preOrder"
              btnText="Add New Book In This List"
              backLink="/admin/dashboard"
              backText="Home"
            />
            <PreOrderList />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PreOrderPage;
