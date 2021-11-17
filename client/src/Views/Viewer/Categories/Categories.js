import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// COMPONENTS
import { Nav1 } from "../../../Components/Viewer/Navbar/";
import { Footer } from "../../../Components/Viewer/Footer";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// STYLES
import Style from "./Categories.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { Helmet } from "react-helmet";
// CONSTANT
const arrowBelow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-chevron-down"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

function Categories({ categoriesOfBooks }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Obosor | Category</title>
        <meta name="desciption" content={`Obosor Categories.`} />
      </Helmet>
      <Nav1 />
      <div className={Style.categoriesContainer}>
        <h4>Categories</h4>
        <Accordion>
          {categoriesOfBooks.map((cata, index) => (
            <Card key={index}>
              <Card.Header className={Style.categoryName}>
                <div>
                  <Link to={`/category/${cata.category}`}>{cata.category}</Link>
                </div>
                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  eventKey={`${index}`}
                  className={Style.btn}
                >
                  {arrowBelow}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={`${index}`}>
                <Card.Body className={Style.subCategoryContainer}>
                  <div className={Style.subCategoryName}>
                    {cata.subCategory.map((subcata) => (
                      <Link to={`/sub-category/${subcata}`}>{subcata}</Link>
                    ))}
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    categoriesOfBooks: state.bookController.categoriesOfBooks,
  };
};

export default connect(mapStateToProps, null)(Categories);
