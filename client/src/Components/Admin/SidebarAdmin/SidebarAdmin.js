import React, { useEffect, useState } from "react";
import { RiStackLine, RiLogoutBoxRLine } from "react-icons/ri";
import { SiCodesandbox } from "react-icons/si";
import { FiUserPlus } from "react-icons/fi";
import { BsPencil } from "react-icons/bs";
import styles from "./SidebarAdmin.module.css";

import userImg from "../../../Assets/Admin/Dashboard/UserImg.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { isInteger } from "formik";

const SidebarAdmin = ({ open }) => {
  const [active, setActive] = useState("dashboard");
  useEffect(() => {
    const activeClass = () => {
      let path = window.location.href;
      path = path.split("/");
      if (path[path.length - 1] === "dashboard") {
        setActive("dashboard");
      } else if (
        path[path.length - 1] === "books" &&
        path[path.length - 2] === "admin"
      ) {
        setActive("books");
      } else if (
        path[path.length - 1] === "orders" &&
        path[path.length - 2] === "admin"
      ) {
        setActive("orders");
      } else if (
        (path[path.length - 1] === "users" &&
          path[path.length - 2] === "admin") ||
        (isInteger(path[path.length - 1]) && path[path.length - 2] === "users")
      ) {
        setActive("users");
      } else if (
        path[path.length - 1] === "hero" &&
        path[path.length - 2] === "admin"
      ) {
        setActive("hero");
      } else if (
        path[path.length - 1] === "new" &&
        path[path.length - 2] === "admin"
      ) {
        setActive("new");
      } else if (
        path[path.length - 1] === "best" &&
        path[path.length - 2] === "admin"
      ) {
        setActive("best");
      } else if (
        path[path.length - 1] === "trending" &&
        path[path.length - 2] === "admin"
      ) {
        setActive("trending");
      } else if (
        path[path.length - 1] === "new-arrivals" &&
        path[path.length - 2] === "admin"
      ) {
        setActive("new-arrivals");
      } else if (
        path[path.length - 1] === "on-sale" &&
        path[path.length - 2] === "admin"
      ) {
        setActive("on-sale");
      } else if (
        path[path.length - 1] === "pre-order" &&
        path[path.length - 2] === "admin"
      ) {
        setActive("pre-order");
      } else if (
        path[path.length - 1] === "blog" &&
        path[path.length - 2] === "admin"
      ) {
        setActive("blog");
      } else if (
        path[path.length - 1] === "new-admin" &&
        path[path.length - 2] === "admin"
      ) {
        setActive("new-admin");
      } else if (
        path[path.length - 1] === "notifications" &&
        path[path.length - 2] === "admin"
      ) {
        setActive("notifications");
      } else if (
        (path[path.length - 1] === "all-admin" &&
          path[path.length - 2] === "admin") ||
        (isInteger(path[path.length - 1]) && path[path.length - 2] === "edit")
      ) {
        setActive("all-admin");
      }
    };
    activeClass();
  }, [active]);
  return (
    <div className={`${styles.wrapper} ${open && styles.open} shadow p-5`}>
      <div className="pb-4 d-flex">
        <div className="">
          <img src={userImg} alt="Oboshor logo" className={styles.user} />
        </div>
        <div className="pl-3">
          <span className={`${styles.username} d-block`}>Iftekhar Ahmed</span>
          <span className={`${styles.role} d-block`}>Admin</span>
        </div>
      </div>
      <span className={styles.icon}>
        <RiStackLine /> <span className="pl-2">Database</span>
      </span>
      <div className={styles.subcat}>
        <Link
          to="/admin/dashboard"
          className={`${styles.link} ${
            active === "dashboard" && styles.active
          }`}
        >
          Books
        </Link>
        <Link
          to="/admin/orders"
          className={`${styles.link} ${active === "orders" && styles.active}`}
        >
          Orders
        </Link>
        <Link
          to="/admin/users"
          className={`${styles.link} ${active === "users" && styles.active}`}
        >
          Users
        </Link>
      </div>
      <span className={styles.icon}>
        <SiCodesandbox /> <span className="pl-2">Store Contents</span>
      </span>
      <div className={styles.subcat}>
        <Link
          to="/admin/hero"
          className={`${styles.link} ${active === "hero" && styles.active}`}
        >
          Hero Carousel
        </Link>
        <Link
          to="/admin/new"
          className={`${styles.link} ${active === "new" && styles.active}`}
        >
          Upload New Books
        </Link>
        <Link
          to="/admin/best"
          className={`${styles.link} ${active === "best" && styles.active}`}
        >
          Obosor Best seller
        </Link>
        <Link
          to="/admin/new-arrivals"
          className={`${styles.link} ${
            active === "new-arrivals" && styles.active
          }`}
        >
          New Arrivals
        </Link>
        <Link
          to="/admin/on-sale"
          className={`${styles.link} ${active === "on-sale" && styles.active}`}
        >
          On Sale
        </Link>
        <Link
          to="/admin/trending"
          className={`${styles.link} ${active === "trending" && styles.active}`}
        >
          Trending
        </Link>
        <Link
          to="/admin/pre-order"
          className={`${styles.link} ${
            active === "pre-order" && styles.active
          }`}
        >
          Pre-Order List
        </Link>
      </div>
      <Link
        to="/admin/blog"
        className={`${styles.icon} ${styles.page__link} ${
          active === "blog" && styles.active
        }`}
      >
        <BsPencil /> <span className="pl-2">Blog</span>
      </Link>
      <Link
        to="/admin/all-admin"
        className={`${styles.icon} ${styles.page__link} ${
          (active === "all-admin" || active === "new-admin") && styles.active
        }`}
      >
        <FiUserPlus /> <span className="pl-2">Add New Admin</span>
      </Link>

      <span className={`${styles.icon} d-block d-md-none`}>
        <RiLogoutBoxRLine /> <span className="pl-2">Logout</span>
      </span>
    </div>
  );
};

const mapStateToProps = (state) => ({
  open: state.admin_page.sidebar_open,
});
export default connect(mapStateToProps, null)(SidebarAdmin);
