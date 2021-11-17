import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { NavbarAdmin } from "../../../Components/Admin/NavbarAdmin";
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";
import UserProfile from "../../../Components/Admin/UserProfile/UserProfile";

const UserProfilePage = (props) => {
  let id = props.match.params.id;

  return (
    <div style={{ background: "#ebf6fa" }}>
      <NavbarAdmin />
      <Container fluid style={{ overflowX: "hidden" }} className="px-0">
        <Row>
          <Col md={3}>
            <SidebarAdmin />
          </Col>
          <Col md={9} className="pb-5">
            <UserProfile id={id} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserProfilePage;
