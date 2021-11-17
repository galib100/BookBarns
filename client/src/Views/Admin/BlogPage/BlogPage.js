import React from "react";
import { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { getBlogs } from "../../../Actions/Admin/BlogActions";
import { BlogList } from "../../../Components/Admin/BlogList";
import { BlogModal } from "../../../Components/Admin/BlogModal";
import { BlogEditModal } from "../../../Components/Admin/BlogEditModal";
import { NavbarAdmin } from "../../../Components/Admin/NavbarAdmin";
import { PageHeader } from "../../../Components/Admin/PageHeader";
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";

const BlogPage = ({ getBlogs }) => {
  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <div className="bg-light">
      <BlogModal />
      <BlogEditModal />
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

export default connect(null, { getBlogs })(BlogPage);
