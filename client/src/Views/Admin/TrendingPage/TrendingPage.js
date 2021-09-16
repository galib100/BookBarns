import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { TrendingList } from "../../../Components/Admin/TrendingList";
import { TrendingModal } from "../../../Components/Admin/TrendingModal";
import { NavbarAdmin } from "../../../Components/Admin/NavbarAdmin";
import { PageHeader } from "../../../Components/Admin/PageHeader";
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";

const TrendingPage = () => {
  return (
    <div className="bg-light">
      <TrendingModal />
      <NavbarAdmin />
      <Container fluid style={{ overflowX: "hidden" }} className="px-0">
        <Row>
          <Col md={3}>
            <SidebarAdmin />
          </Col>
          <Col md={9} className="pb-5 pr-md-5 pr-0">
            <PageHeader
              title="Trending"
              modal="trending"
              btnText="Add New Book In This List"
              backLink="/admin/dashboard"
              backText="Home"
            />
            <TrendingList />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TrendingPage;
