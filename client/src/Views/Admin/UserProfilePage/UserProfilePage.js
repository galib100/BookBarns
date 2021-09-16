import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { NavbarAdmin } from "../../../Components/Admin/NavbarAdmin";
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";
import { getUserProfile } from "../../../Actions/Admin/UserProfileActions";
import UserProfile from "../../../Components/Admin/UserProfile/UserProfile";
import { connect } from "react-redux";

const UserProfilePage = (props) => {
  const { getUserProfile } = props;
  let id = parseInt(props.match.params.id);
  let flag = false;
  useEffect(() => {
    flag = getUserProfile(id);
    if (!flag) {
      return <Redirect to="/admin/users" />;
    }
  }, [id]);
  return (
    <div style={{ background: "#ebf6fa" }}>
      <NavbarAdmin />
      <Container fluid style={{ overflowX: "hidden" }} className="px-0">
        <Row>
          <Col md={3}>
            <SidebarAdmin />
          </Col>
          <Col md={9} className="pb-5">
            <UserProfile />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default connect(null, { getUserProfile })(UserProfilePage);
