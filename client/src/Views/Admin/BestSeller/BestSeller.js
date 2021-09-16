import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { BestSellerList } from "../../../Components/Admin/BestSellerList";
import { BestSellerModal } from "../../../Components/Admin/BestSellerModal";
import { NavbarAdmin } from "../../../Components/Admin/NavbarAdmin";
import { PageHeader } from "../../../Components/Admin/PageHeader";
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";

const BestSeller = () => {
  return (
    <div className="bg-light">
      <BestSellerModal />
      <NavbarAdmin />
      <Container fluid style={{ overflowX: "hidden" }} className="px-0">
        <Row>
          <Col md={3}>
            <SidebarAdmin />
          </Col>
          <Col md={9} className="pb-5 pr-md-5 pr-0">
            <PageHeader
              title="Obosor Best seller"
              modal="bestSeller"
              btnText="Add New Book In This List"
              backLink="/admin/dashboard"
              backText="Home"
            />
            <BestSellerList />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BestSeller;
