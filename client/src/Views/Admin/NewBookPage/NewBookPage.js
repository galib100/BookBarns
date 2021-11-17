import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { AddBookForm } from "../../../Components/Admin/AddBookForm";
import { NavbarAdmin } from "../../../Components/Admin/NavbarAdmin";
import { PageHeader } from "../../../Components/Admin/PageHeader";
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";
import { getBook } from "../../../Actions/Admin/BooksActions";
import { connect } from "react-redux";

const NewBookPage = ({ match, getBook, loading }) => {
  const [headline, setHeadline] = useState("Upload New Product");
  let bookId = match.params.id ? match.params.id : -1;

  useEffect(() => {
    const title = () => {
      let path = window.location.href;
      path = path.split("/");
      if (
        path[path.length - 3] === "admin" &&
        path[path.length - 2] === "book"
      ) {
        setHeadline("Edit Book");
      } else {
        getBook(0);
      }
      if (bookId !== -1) {
        getBook(bookId);
      }
    };

    title();
  }, [match.params.id]);
  return (
    <div className="bg-light">
      <NavbarAdmin />
      <Container fluid style={{ overflowX: "hidden" }} className="px-0">
        <Row>
          <Col md={3}>
            <SidebarAdmin />
          </Col>
          <Col md={9} className="pb-5 pr-md-5 pr-0">
            {!loading || bookId === -1 ? (
              <>
                <PageHeader
                  title={headline}
                  btnLink="/admin/dashboard"
                  btnText="All Books List"
                  backLink="/admin/dashboard"
                  backText="Home"
                />
                <AddBookForm edit={bookId} />
              </>
            ) : (
              <h1>Loading</h1>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
const mapStateToProps = (state) => ({
  loading: state.admin_book_page.loading,
});

export default connect(mapStateToProps, { getBook })(NewBookPage);
