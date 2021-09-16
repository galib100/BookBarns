import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { HeroCarouselList } from "../../../Components/Admin/HeroCarouselList";
import { HeroCarouselModal } from "../../../Components/Admin/HeroCarouselModal";
import { NavbarAdmin } from "../../../Components/Admin/NavbarAdmin";
import { PageHeader } from "../../../Components/Admin/PageHeader";
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";

const HeroCarouselPage = () => {
  return (
    <div className="bg-light">
      <HeroCarouselModal />
      <NavbarAdmin />
      <Container fluid style={{ overflowX: "hidden" }} className="px-0">
        <Row>
          <Col md={3}>
            <SidebarAdmin />
          </Col>
          <Col md={9} className="pb-5 pr-md-5 pr-0">
            <PageHeader
              title="Hero Carousel"
              backLink="/admin/dashboard"
              backText="Home"
            />
            <HeroCarouselList />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroCarouselPage;
