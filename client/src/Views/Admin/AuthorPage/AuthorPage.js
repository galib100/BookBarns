import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { NavbarAdmin } from "../../../Components/Admin/NavbarAdmin";
import { PageHeader } from "../../../Components/Admin/PageHeader";
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";
import AuthorList from "../../../Components/Admin/AuthorList/AuthorList";
import AuthorAddModal from "../../../Components/Admin/AuthorAddModal/AuthorAddModal";

const AuthorPage = () => {
  return (
    <div className="bg-light">
      <AuthorAddModal />
      <NavbarAdmin />
      <Container fluid style={{ overflowX: "hidden" }} className="px-0">
        <Row>
          <Col md={3}>
            <SidebarAdmin />
          </Col>
          <Col md={9} className="pb-5 pr-md-5 pr-0">
            <PageHeader
              title="Author Management"
              modal="author"
              btnText="Add New Author"
              backLink="/admin/dashboard"
              backText="Home"
            />
            <AuthorList />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AuthorPage;
