import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { getRequestedBooks } from "../../../Actions/Admin/RequestedBooksActions";
import { BookCards } from "../../../Components/Admin/BookCards";
import { NavbarAdmin } from "../../../Components/Admin/NavbarAdmin";
import { RequestedBooks } from "../../../Components/Admin/RequestedBooks";
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";
import { Redirect, useHistory } from "react-router";

const RequestedBooksPage = ({ getRequestedBooks }) => {
  const history = useHistory();
  useEffect(() => {
    getRequestedBooks();
    console.log("in effect");
  }, []);

  return (
    <div className="bg-light">
      <NavbarAdmin />
      <Container fluid style={{ overflowX: "hidden" }} className="px-0">
        <Row>
          <Col md={3}>
            <SidebarAdmin />
          </Col>
          <Col md={9} className="pb-5">
            <BookCards />
            <RequestedBooks />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default connect(null, { getRequestedBooks })(RequestedBooksPage);
