import React, { useEffect, useState } from "react";
import { Col, Row, Nav, Navbar, Container, Form } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
// COMPONENTS & ACTIONS
import { loginSignupModalToggle } from "../../../Actions/Viewer/LandingPageActions";
import { LoginModal } from "../LoginModal";
import { SignupModal } from "../SignupModal";
// ICONS
import { FiHeart } from "react-icons/fi";
import { BiShoppingBag } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaSearch } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
// STYLES & Images
import Style from "./Navbar.module.css";
import brandLogo from "../../../Assets/brand_logo2.jpg";
import DrawerTogglerButton from "./DrawerTogglerButton";

function Navigation({
  savedBooks,
  loginSignupModalToggle,
  cart,
  user,
  savedWishlist,
  isLogedIn,
  drawerToggleClickHnadler,
}) {
  const [lock, setLock] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [matchedData, setMatchedData] = useState([]);

  // MINIMUM TEXT
  // input: take two string || output: {big string, small string}
  const minimumText = (a, b) => {
    if (a.length > b.length) {
      return { str: a.toLowerCase(), substr: b.toLowerCase() };
    } else {
      return { str: b.toLowerCase(), substr: a.toLowerCase() };
    }
  };

  // SEARCH FUNCTIONALITY
  // input: nothing || output: matched books that is searched
  const searching = (event) => {
    event.preventDefault();
    let text = event.target.value.toLowerCase().trim();
    let matches = [];
    // search desired book
    if (text.length >= 1) {
      savedBooks.forEach((book) => {
        const title = minimumText(book.title, text);
        const author = minimumText(book.author, text);
        const category = minimumText(book.category, text);
        const publisher = minimumText(book.publisher, text);

        if (
          title.str.includes(title.substr) ||
          author.str.includes(author.substr) ||
          category.str.includes(category.substr) ||
          publisher.str.includes(publisher.substr)
        ) {
          matches.push(book);
        }
      });
    }
    // limit the result
    if (matches.length >= 25) {
      matches = matches.slice(0, 25);
    }
    // save into the state
    setMatchedData(matches);
  };

  // NAVIGATION LOCKING
  const lockNavigation = () => {
    if (window.scrollY >= 180 && window.innerWidth > 480) {
      setLock(true);
    } else {
      setLock(false);
    }
  };
  window.addEventListener("scroll", lockNavigation);

  useEffect(() => {
    const wishlistArray = JSON.parse(localStorage.getItem("viewer_wishlist"));
    setWishlist(wishlistArray);
  }, [savedWishlist.length]);

  return (
    <div>
      <LoginModal />
      <SignupModal />
      <Container className={`${Style.topNavContainer}`}>
        {/* ================== TOP-BAR ================== */}
        <Row className={`${Style.topnavrow}`}>
          <Col className={`${Style.topnavColleft}`}></Col>

          <Col className={`${Style.topnavColright}`}>
            <Link to="/" className={Style.topbarText}>
              Home
            </Link>
            <Link to="/About" className={Style.topbarText}>
              About
            </Link>
            <Link to="/howtoorder" className={Style.topbarText}>
              How to order
            </Link>
            <Link to="/blog" className={Style.topbarText}>
              Blog
            </Link>
            <Link to="/contact" className={Style.topbarText}>
              Contact
            </Link>
          </Col>
        </Row>
      </Container>

      {/* ================== MENU-BAR ================== */}
      <Container className={lock ? Style.navcontainerLock : Style.navcontainer}>
        <Row className={Style.colwrapper}>
          {/* ------- brand ------- */}
          <Col md={2} sm={6} className={Style.bannerCol}>
            <DrawerTogglerButton click={drawerToggleClickHnadler} />
            <Navbar.Brand href="#home" className={`${Style.brand}`}>
              <Link to="/">
                <img
                  alt="BookBarns"
                  src={brandLogo}
                  width="75"
                  height="75"
                  className="pb-2"
                />
                {/* <span>BookBarns</s> */}
              </Link>
            </Navbar.Brand>
          </Col>

          {/* ------- search field ------- */}
          <Col
            md={6}
            sm={6}
            className={`${Style.column} ${Style.searchformCol}`}
          >
            <Form inline className={`${Style.searchform}`}>
              <input
                type="text"
                placeholder="  Search..."
                className={`${Style.inputfield}`}
                onChange={(e) => searching(e)}
              />
              <div className={`input-group-append`}>
                <span className={Style.sIcon}>
                  <FaSearch />
                </span>
              </div>
              {matchedData.length > 0 ? (
                <div className={Style.serchResult}>
                  {matchedData.map((book) => (
                    <Link
                      to={`/Book/${book._id}`}
                      className={Style.filteredBookLink}
                    >
                      <p className={Style.name}>{book.title}</p>
                      <p className={Style.divider}> | </p>
                      <p className={Style.author}>{book.author}</p>
                    </Link>
                  ))}
                </div>
              ) : null}
            </Form>
          </Col>

          {/* ------- menu-items ------- */}
          <Col md={4} sm={6} className={`${Style.column}`}>
            <Nav className={`${Style.infomenu}`}>
              <Link to="/wishlist" className={`${Style.infomenuItem}`}>
                <div className={`${Style.infomenuItemLogo}`}>
                  <i className="fa-lg">
                    <FiHeart />
                  </i>
                </div>
                <div className={`${Style.infomenuItemText}`}>
                  <h4>Wishlist</h4>
                  <p>{wishlist ? wishlist.length : "0"} items</p>
                </div>
                {wishlist && wishlist.length > 0 ? (
                  <div className={Style.infoTextForMobile}></div>
                ) : null}
              </Link>
              <Link to="/cart" className={`${Style.infomenuItem}`}>
                <div className={`${Style.infomenuItemLogo}`}>
                  <i className="fa-lg">
                    <BiShoppingBag />{" "}
                  </i>
                </div>
                <div className={`${Style.infomenuItemText}`}>
                  <h4>Cart</h4>
                  <p>{cart.length} items</p>
                </div>
                {cart.length > 0 ? (
                  <div className={Style.infoTextForMobile}></div>
                ) : null}
              </Link>
              {isLogedIn ? (
                <Link to="/profile" className={`${Style.infomenuItem}`}>
                  <div className={`${Style.infomenuItemLogo}`}>
                    <i className=" fa-lg">
                      <HiOutlineUser />
                    </i>
                  </div>
                  <div className={`${Style.infomenuItemText}`}>
                    <h4>Profile</h4>
                    <p>{user.currentUser.username}</p>
                  </div>
                </Link>
              ) : (
                <div
                  className={`${Style.infomenuItem}`}
                  onClick={() => loginSignupModalToggle("login")}
                >
                  <div className={`${Style.infomenuItemLogo}`}>
                    <i className=" fa-lg">
                      <HiOutlineUser />
                    </i>
                  </div>
                  <div className={`${Style.infomenuItemText}`}>
                    <h4>Sign in</h4>
                    <p>or Sign up</p>
                  </div>
                </div>
              )}
            </Nav>
          </Col>
        </Row>
      </Container>

      {/* search form for mobile device which is hidden desktop version */}
      <form className={`${Style.searchformForMobile}`}>
        <input
          type="text"
          placeholder="  Search..."
          className={`${Style.inputfield}`}
          onChange={(e) => searching(e)}
        />
        {matchedData.length > 0 ? (
          <div className={Style.serchResult}>
            {matchedData.map((book) => (
              <Link to={`/Book/${book._id}`} className={Style.filteredBookLink}>
                {book.title}
              </Link>
            ))}
          </div>
        ) : null}
      </form>

      {/* ================== NAV - BOTTOM ================== */}
      <Navbar id="viewer_nav" className={Style.nav_bottom} expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink
              to="/BestSeller"
              exact
              activeClassName={`${Style.activelink}`}
              className={`${Style.nav_bottom_link}`}
            >
              Best Seller
            </NavLink>
            <NavLink
              to="/NewArrivals"
              exact
              activeClassName={`${Style.activelink}`}
              className={`${Style.nav_bottom_link}`}
            >
              New Arrival
            </NavLink>
            <NavLink
              to="/Trending"
              exact
              activeClassName={`${Style.activelink}`}
              className={`${Style.nav_bottom_link}`}
            >
              Trending
            </NavLink>
            <NavLink
              to="/ExtraDiscount"
              exact
              activeClassName={`${Style.activelink}`}
              className={`${Style.nav_bottom_link}`}
            >
              Extra Discount
            </NavLink>
            <NavLink
              to="/Preorder"
              exact
              activeClassName={`${Style.activelink}`}
              className={`${Style.nav_bottom_link}`}
            >
              Pre Order
            </NavLink>
            <NavLink
              to="/publisher"
              exact
              activeClassName={`${Style.activelink}`}
              className={`${Style.nav_bottom_link}`}
            >
              Publisher
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.bookController.cart,
    savedWishlist: state.bookController.wishlist,
    isLogedIn: state.viewer.isLogedIn,
    user: state.viewer.currentUser,
  };
};

export default connect(mapStateToProps, { loginSignupModalToggle })(Navigation);
