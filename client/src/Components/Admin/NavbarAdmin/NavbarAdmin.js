import React from "react";
import logo from "../../../Assets/Admin/OboshorLogo.png";
import userImg from "../../../Assets/Admin/Dashboard/UserImg.png";
import styles from "./NavbarAdmin.module.css";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { Navbar, Nav } from "react-bootstrap";
import { sidebarToggleAction } from "../../../Actions/Admin/PageActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const NavbarAdmin = ({ sidebarToggleAction }) => {
  return (
    <div>
      <Navbar bg="white" expand="md" className="shadow">
        <Navbar.Brand href="#">
          <img src={logo} alt="Oboshor logo" className={styles.logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className=" d-none" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ml-auto">
            <Nav.Link href="#action3">
              <img src={userImg} alt="user" className={styles.user} />
              <span className={styles.username}>Iftekhar Ahmed</span>
            </Nav.Link>

            <div className="d-flex justify-content-center align-items-start flex-column flex-md-row pr-5">
              <Nav.Link
                as={Link}
                to="/admin/login"
                className={styles.nav__item}
              >
                <RiLogoutBoxRLine />{" "}
                <span className={styles.title}>Logout</span>
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
        <div className={styles.toogle} onClick={() => sidebarToggleAction()}>
          <GiHamburgerMenu />
        </div>
      </Navbar>
    </div>
  );
};

export default connect(null, { sidebarToggleAction })(NavbarAdmin);
