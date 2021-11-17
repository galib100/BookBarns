import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { NavbarAdmin } from "../../../Components/Admin/NavbarAdmin";
import { PageHeader } from "../../../Components/Admin/PageHeader";
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";
import { CuponList } from "../../../Components/Admin/CuponList";
import { CuponAddModal } from "../../../Components/Admin/CuponAddModal";
import { CuponEditModal } from "../../../Components/Admin/CuponEditModal";

const CuponPage = () => {
  return (
    <div className="bg-light">
      <CuponEditModal />
      <CuponAddModal />
      <NavbarAdmin />
      <Container fluid style={{ overflowX: "hidden" }} className="px-0">
        <Row>
          <Col md={3}>
            <SidebarAdmin />
          </Col>
          <Col md={9} className="pb-5 pr-md-5 pr-0">
            <PageHeader
              title="Coupon Management"
              modal="add_cupon"
              btnText="Add New Coupon"
              backLink="/admin/dashboard"
              backText="Home"
            />
            <CuponList />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CuponPage;
