import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import AdminList from "../../../Components/Admin/AdminList/AdminList";
import { NavbarAdmin } from "../../../Components/Admin/NavbarAdmin";
import { PageHeader } from "../../../Components/Admin/PageHeader";
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";

const AllAdminPage = () => {
  return (
    <div className="bg-light">
      <NavbarAdmin />
      <Container fluid style={{ overflowX: "hidden" }} className="px-0">
        <Row>
          <Col md={3}>
            <SidebarAdmin />
          </Col>
          <Col md={9} className="pb-5">
            <PageHeader
              title="All Admin"
              btnLink="/admin/new-admin"
              btnText="Add New Admin"
              backLink="/admin/users"
              backText="All Users"
            />
            <AdminList />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AllAdminPage;
