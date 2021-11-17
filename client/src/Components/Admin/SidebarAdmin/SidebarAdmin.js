import React, { useEffect, useState } from "react";
import { RiStackLine, RiLogoutBoxRLine } from "react-icons/ri";
import { SiCodesandbox } from "react-icons/si";
import { AiOutlineTags, AiOutlineEdit } from "react-icons/ai";
import { FiUserPlus } from "react-icons/fi";
import { BsPencil } from "react-icons/bs";
import { HiHashtag } from "react-icons/hi";
import { VscOrganization } from "react-icons/vsc";
import styles from "./SidebarAdmin.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { isInteger } from "formik";
import { BASE_URL } from "../../../Constants/URL";
import { logout } from "../../../Actions/Admin/AuthActions";

const SidebarAdmin = ({ open, loading, admin }) => {
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
        (path[path.length - 1] === "orders" &&
          path[path.length - 2] === "admin") ||
        (path[path.length - 1] && path[path.length - 2] === "orders")
      ) {
        setActive("orders");
      } else if (
        (path[path.length - 1] === "users" &&
          path[path.length - 2] === "admin") ||
        (path[path.length - 1] && path[path.length - 2] === "users")
      ) {
        setActive("users");
      } else if (
        path[path.length - 1] === "hero" &&
        path[path.length - 2] === "admin"
      ) {
        setActive("hero");
      } else if (
        path[path.length - 1] === "ad" &&
        path[path.length - 2] === "admin"
      ) {
        setActive("ad");
      } else if (
        path[path.length - 1] === "category" &&
        path[path.length - 2] === "admin"
      ) {
        setActive("category");
      } else if (
        path[path.length - 1] === "author" &&
        path[path.length - 2] === "admin"
      ) {
        setActive("author");
      } else if (
        path[path.length - 1] === "cupon" &&
        path[path.length - 2] === "admin"
      ) {
        setActive("cupon");
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
        path[path.length - 1] === "requested" &&
        path[path.length - 2] === "admin"
      ) {
        setActive("requested");
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
        path[path.length - 1] === "publisher" &&
        path[path.length - 2] === "admin"
      ) {
        setActive("publisher");
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
      {!loading && admin !== {} && (
        <div className="pb-4 d-flex">
          <div className="">
            <img
              src={`${BASE_URL}/${admin.image}`}
              alt="Oboshor logo"
              className={`${styles.user} rounded-circle`}
            />
          </div>
          <div className="pl-3">
            <span className={`${styles.username} d-block`}>
              {admin.username}
            </span>
            <span
              className={`${styles.role} d-block`}
              style={{ textTransform: "capitalize" }}
            >
              {admin.role}
            </span>
          </div>
        </div>
      )}
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
          Products
        </Link>
        {admin.role === "admin" && (
          <>
            <Link
              to="/admin/orders"
              className={`${styles.link} ${
                active === "orders" && styles.active
              }`}
            >
              Orders
            </Link>
            <Link
              to="/admin/users"
              className={`${styles.link} ${
                active === "users" && styles.active
              }`}
            >
              Users
            </Link>
          </>
        )}
      </div>
      <span className={styles.icon}>
        <SiCodesandbox /> <span className="pl-2">Store Contents</span>
      </span>
      <div className={styles.subcat}>
        {admin.role === "admin" && (
          <>
            <Link
              to="/admin/hero"
              className={`${styles.link} ${active === "hero" && styles.active}`}
            >
              Hero Carousel
            </Link>
            <Link
              to="/admin/ad"
              className={`${styles.link} ${active === "ad" && styles.active}`}
            >
              Ad Management
            </Link>
          </>
        )}

        <Link
          to="/admin/new"
          className={`${styles.link} ${active === "new" && styles.active}`}
        >
          Upload New Product
        </Link>
        {admin.role === "admin" && (
          <>
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
              className={`${styles.link} ${
                active === "on-sale" && styles.active
              }`}
            >
              On Sale
            </Link>
            <Link
              to="/admin/trending"
              className={`${styles.link} ${
                active === "trending" && styles.active
              }`}
            >
              Trending
            </Link>
            <Link
              to="/admin/requested"
              className={`${styles.link} ${
                active === "requested" && styles.active
              }`}
            >
              Requested Books
            </Link>
            <Link
              to="/admin/pre-order"
              className={`${styles.link} ${
                active === "pre-order" && styles.active
              }`}
            >
              On Pre-Order
            </Link>
          </>
        )}
      </div>
      <Link
        to="/admin/blog"
        className={`${styles.icon} ${styles.page__link} ${
          active === "blog" && styles.active
        }`}
      >
        <BsPencil /> <span className="pl-2">Blog</span>
      </Link>
      {admin.role === "admin" && (
        <>
          <Link
            to="/admin/category"
            className={`${styles.icon} ${styles.page__link} ${
              active === "category" && styles.active
            }`}
          >
            <AiOutlineTags /> <span className="pl-2">Categories</span>
          </Link>

          <Link
            to="/admin/cupon"
            className={`${styles.icon} ${styles.page__link} ${
              active === "cupon" && styles.active
            }`}
          >
            <HiHashtag /> <span className="pl-2">Coupon</span>
          </Link>
          <Link
            to="/admin/publisher"
            className={`${styles.icon} ${styles.page__link} ${
              active === "publisher" && styles.active
            }`}
          >
            <VscOrganization /> <span className="pl-2">Publishers</span>
          </Link>
          <Link
            to="/admin/author"
            className={`${styles.icon} ${styles.page__link} ${
              active === "author" && styles.active
            }`}
          >
            <AiOutlineEdit /> <span className="pl-2">Authors</span>
          </Link>
          <Link
            to="/admin/all-admin"
            className={`${styles.icon} ${styles.page__link} ${
              (active === "all-admin" || active === "new-admin") &&
              styles.active
            }`}
          >
            <FiUserPlus /> <span className="pl-2">Admin</span>
          </Link>
        </>
      )}

      <span
        className={`${styles.icon} d-block d-md-none`}
        onClick={() => logout()}
      >
        <RiLogoutBoxRLine /> <span className="pl-2">Logout</span>
      </span>
    </div>
  );
};

const mapStateToProps = (state) => ({
  open: state.admin_page.sidebar_open,
  admin: state.auth_admin.admin,
  loading: state.auth_admin.loading,
});
export default connect(mapStateToProps, null)(SidebarAdmin);
