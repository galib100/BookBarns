import React from "react";
import logo from "../../../Assets/Admin/OboshorLogo.png";
import styles from "./NavbarAdmin.module.css";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { Navbar, Nav } from "react-bootstrap";
import { sidebarToggleAction } from "../../../Actions/Admin/PageActions";
import { connect } from "react-redux";
import { logout } from "../../../Actions/Admin/AuthActions";
import { BASE_URL } from "../../../Constants/URL";
import { Link } from "react-router-dom";

const NavbarAdmin = ({ sidebarToggleAction, logout, admin, loading }) => {
  const logoutHandeler = () => {
    logout();
  };
  return (
    <div>
      <Navbar bg="white" expand="md" className="shadow">
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Oboshor logo" className={styles.logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className=" d-none" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ml-auto">
            {!loading && admin !== {} && (
              <Nav.Link href="#action3">
                <img
                  src={`${BASE_URL}/${admin.image}`}
                  alt="user"
                  className={`${styles.user} rounded-circle`}
                />
                <span className={styles.username}>{admin.username}</span>
              </Nav.Link>
            )}

            <div className="d-flex justify-content-center align-items-start flex-column flex-md-row pr-5">
              <Nav.Link
                as="span"
                className={styles.nav__item}
                onClick={logoutHandeler}
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

const mapStateToProps = (state) => ({
  admin: state.auth_admin.admin,
  loading: state.auth_admin.loading,
});

export default connect(mapStateToProps, { sidebarToggleAction, logout })(
  NavbarAdmin
);
