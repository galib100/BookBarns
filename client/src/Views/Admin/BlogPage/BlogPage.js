import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { BlogList } from "../../../Components/Admin/BlogList";
import { BlogModal } from "../../../Components/Admin/BlogModal";
import { NavbarAdmin } from "../../../Components/Admin/NavbarAdmin";
import { PageHeader } from "../../../Components/Admin/PageHeader";
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";

const BlogPage = () => {
  return (
    <div className="bg-light">
      <BlogModal />
      <NavbarAdmin />
      <Container fluid style={{ overflowX: "hidden" }} className="px-0">
        <Row>
          <Col md={3}>
            <SidebarAdmin />
          </Col>
          <Col md={9} className="pb-5 pr-md-5 pr-0">
            <PageHeader
              title="Blogs"
              modal="blog"
              btnText="Add New Blog"
              backLink="/admin/dashboard"
              backText="Home"
            />
            <BlogList />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BlogPage;
