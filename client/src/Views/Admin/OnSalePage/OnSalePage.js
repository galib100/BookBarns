import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { NavbarAdmin } from "../../../Components/Admin/NavbarAdmin";
import { OnSaleList } from "../../../Components/Admin/OnSaleList";
import { OnSaleModal } from "../../../Components/Admin/OnSaleModal";
import { PageHeader } from "../../../Components/Admin/PageHeader";
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";

const OnSalePage = () => {
  return (
    <div className="bg-light">
      <OnSaleModal />
      <NavbarAdmin />
      <Container fluid style={{ overflowX: "hidden" }} className="px-0">
        <Row>
          <Col md={3}>
            <SidebarAdmin />
          </Col>
          <Col md={9} className="pb-5 pr-md-5 pr-0">
            <PageHeader
              title="On Sale"
              modal="onSale"
              btnText="Add New Book In This List"
              backLink="/admin/dashboard"
              backText="Home"
            />
            <OnSaleList />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OnSalePage;
