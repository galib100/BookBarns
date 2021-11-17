import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Style from "./Navbar.module.css";

import { loginSignupModalToggle } from "../../../Actions/Viewer/LandingPageActions";

import { BiCurrentLocation } from "react-icons/bi";
import { GoRequestChanges } from "react-icons/go";
import { RiContactsLine } from "react-icons/ri";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import brandLogo from "../../../Assets/brand_logo2.jpg";
import swal from "sweetalert";

const SideDrawer = ({
  show,
  isLogedIn,
  loginSignupModalToggle,
  clear,
  setShowCardForRequest,
  clearUser,
}) => {
  const location = useLocation();
  const history = useHistory();

  // SELECT DRAWER CLASS
  let drawerClass = `${Style.side__drawer}`;
  if (show) {
    drawerClass = `${Style.side__drawer} ${Style.open}`;
  }

  // LOGIN CARD OPEN
  const cardOpen = () => {
    clear();
    loginSignupModalToggle("login");
  };

  // CONTROL REQUEST FOR BOOK MODAL
  const requestModalController = () => {
    clear();
    if (isLogedIn) {
      setShowCardForRequest(true);
    } else {
      loginSignupModalToggle("login");
    }
  };

  // LOGOUT FUNC
  const logoutFunc = () => {
    if (isLogedIn) {
      localStorage.removeItem("viewer");
      localStorage.removeItem("viewer_token");
      clearUser();
      const pathname = location.pathname;
      if (pathname === "/profile") {
        history.push("/");
      }
      swal("Successfully signed out.", "", "success");
    } else {
      clear();
    }
  };

  return (
    <>
      <nav className={drawerClass}>
        <div className={Style.Drawerheading}>
          <Link to="/" onClick={clear}>
            <img alt="অবসর" src={brandLogo} width="75" className="pb-2" />
          </Link>
        </div>
        <div className={Style.drawerLink}>
          {isLogedIn ? (
            <Link to="/profile">
              <div className={Style.drawerLinkLogo}>
                <BiCurrentLocation />
              </div>
              <div>Track Your Order</div>
            </Link>
          ) : (
            <Link onClick={cardOpen}>
              <div className={Style.drawerLinkLogo}>
                <BiCurrentLocation />
              </div>
              <div>Track Your Order</div>
            </Link>
          )}
          <Link onClick={requestModalController}>
            <div className={Style.drawerLinkLogo}>
              <GoRequestChanges />
            </div>
            <div>Request a book</div>
          </Link>
          <Link to="/contact">
            <div className={Style.drawerLinkLogo}>
              <RiContactsLine />
            </div>
            <div>Networoks & Contacts</div>
          </Link>
          {isLogedIn ? (
            <Link to="/profile">
              <div className={Style.drawerLinkLogo}>
                <AiOutlineUser />
              </div>
              <div>Profile</div>
            </Link>
          ) : null}
          {isLogedIn ? (
            <Link onClick={logoutFunc}>
              <div className={Style.drawerLinkLogo}>
                <AiOutlineLogout />
              </div>
              <div>Logout</div>
            </Link>
          ) : null}
        </div>
      </nav>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogedIn: state.viewer.isLogedIn,
  };
};

export default connect(mapStateToProps, { loginSignupModalToggle })(SideDrawer);
