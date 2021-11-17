import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { NavbarAdmin } from "../../../Components/Admin/NavbarAdmin";
import { PageHeader } from "../../../Components/Admin/PageHeader";
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";
import { CategoryList } from "../../../Components/Admin/CategoryList";
import CategoryAddModal from "../../../Components/Admin/CategoryAddModal/CategoryAddModal";
import CategoryEditModal from "../../../Components/Admin/CategoryEditModal/CategoryEditModal";

const CategoryPage = () => {
  return (
    <div className="bg-light">
      <CategoryEditModal />
      <CategoryAddModal />
      <NavbarAdmin />
      <Container fluid style={{ overflowX: "hidden" }} className="px-0">
        <Row>
          <Col md={3}>
            <SidebarAdmin />
          </Col>
          <Col md={9} className="pb-5 pr-md-5 pr-0">
            <PageHeader
              title="Category Management"
              modal="add_category"
              btnText="Add New Category"
              backLink="/admin/dashboard"
              backText="Home"
            />
            <CategoryList />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CategoryPage;
