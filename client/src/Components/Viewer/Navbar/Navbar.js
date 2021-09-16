import React from "react";
import {
  Col,
  Row,
  Nav,
  Navbar,
  Container,
  Form

} from "react-bootstrap";
import Style from "./Navbar.module.css";
import { FaSearch } from "react-icons/fa";
import { TopBar } from "../TopBar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginSignupModalToggle } from "../../../Actions/Viewer/LandingPageActions";
import { LoginModal } from "../LoginModal/";
import { SignupModal } from "../SignupModal";
import {FiHeart} from 'react-icons/fi'
import {BiShoppingBag} from 'react-icons/bi'
import {HiOutlineUser} from 'react-icons/hi'

const Nav1 = ({ loginSignupModalToggle }) => {
  return (
    <div>
      <LoginModal />
      <SignupModal />
      <Container>
        {/* <TopBar /> */}

        <Row>
          <Col md={2} sm={6}>
            <Navbar.Brand href="#home" className="">
              <img
                alt="brand logo"
                src="./images/"
                width="78"
                height="78"
                className="pb-2"
              />{" "}
              {""}
              <a href="" className={Style.brand_text}>
                {" "}
                Book Barns
              </a>
            </Navbar.Brand>
          </Col>

          <Col md={5} sm={6} className="align-self-center">
            <Form inline>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="  Search..."
                  className={`${Style.searchForm}`}
                />

                <div className={`input-group-append`}>
                  <span className={Style.sIcon}>
                    <FaSearch />
                  </span>
                </div>
              </div>

              <i></i>
            </Form>
          </Col>
          <Col md={4} sm={6} className="align-self-center mr-o">
            <Nav className="">
              <Link to="/wishlist" className="text-dark mr-3">
                {" "}
                <i className="fa-lg"><FiHeart/></i> Wishlist <br></br>{" "}
                <span className="text-muted"> 0 items</span>{" "}
              </Link>
              <Link to="/cart" className="text-dark mr-3">
                {" "}
                <i className="fa-lg"><BiShoppingBag/> </i> Cart <br></br>{" "}
                <span className="text-muted"> 0 items</span>
              </Link>
              <Link
                className="text-dark mr-3"
                onClick={() => loginSignupModalToggle("login")}
              >
                {" "}
                <i className=" fa-lg"><HiOutlineUser/></i> Signin <br></br>{" "}
                <span className="text-muted"> or register</span>{" "}
              </Link>
            </Nav>
          </Col>
        </Row>
      </Container>
      <Navbar id="viewer_nav" className={Style.nav_bg} expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/" className="text-light px-4 nav-link ">
                Home
              </Link>
              <Link to="/" className="text-light px-4 nav-link ">
                About
              </Link>
              <Link to="/" className="text-light px-4 nav-link ">
                Our Networks
              </Link>
              <Link to="/" className="text-light px-4 nav-link ">
                Blog
              </Link>
              <Link to="/" className="text-light px-4 nav-link ">
                Contact
              </Link>
              <Link to="/" className="text-light px-4 nav-link ">
                Trending
              </Link>
              <Link to="/" className="text-light px-4 nav-link ">
                Extra Discount
              </Link>
              <Link to="/" className="text-light px-4 nav-link ">
                Pre order Discount
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default connect(null, { loginSignupModalToggle })(Nav1);
