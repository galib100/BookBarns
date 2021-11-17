import React from "react";
import { Link } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import { blogModalToggleAction } from "../../../Actions/Admin/BlogActions";
import { bestSellerModalToggleAction } from "../../../Actions/Admin/BestSellerActions";
import { newArrivalsModalToggleAction } from "../../../Actions/Admin/NewArrivalsActions";
import { onSaleModalToggleAction } from "../../../Actions/Admin/OnSaleActions";
import { preOrderModalToggleAction } from "../../../Actions/Admin/PreOrderActions";
import { trendingModalToggleAction } from "../../../Actions/Admin/TrendingActions";
import styles from "./PageHeader.module.css";
import { connect } from "react-redux";
import { addCategoryModalToggleAction } from "../../../Actions/Admin/CategoryActions";
import { addCuponModalToggleAction } from "../../../Actions/Admin/CuponActions";
import { addPublisherModalToggleAction } from "../../../Actions/Admin/PublisherActions";
import { addAuthorModalToggleAction } from "../../../Actions/Admin/AuthorActions";

const PageHeader = ({
  title,
  backText,
  backLink,
  btnText,
  btnLink,
  modal,
  blogModalToggleAction,
  bestSellerModalToggleAction,
  newArrivalsModalToggleAction,
  onSaleModalToggleAction,
  preOrderModalToggleAction,
  trendingModalToggleAction,
  addCategoryModalToggleAction,
  addCuponModalToggleAction,
  addPublisherModalToggleAction,
  addAuthorModalToggleAction,
}) => {
  const clickHandeler = () => {
    if (modal === "blog") {
      blogModalToggleAction();
    } else if (modal === "bestSeller") {
      bestSellerModalToggleAction();
    } else if (modal === "newArrivals") {
      newArrivalsModalToggleAction();
    } else if (modal === "onSale") {
      onSaleModalToggleAction();
    } else if (modal === "preOrder") {
      preOrderModalToggleAction();
    } else if (modal === "trending") {
      trendingModalToggleAction();
    } else if (modal === "add_category") {
      addCategoryModalToggleAction();
    } else if (modal === "add_cupon") {
      addCuponModalToggleAction();
    } else if (modal === "publisher") {
      addPublisherModalToggleAction();
    } else if (modal === "author") {
      addAuthorModalToggleAction();
    }
  };

  return (
    <div className="d-flex flex-md-row flex-column justify-content-between align-items-center p-4">
      <div className="d-flex flex-md-row flex-column justify-content-start align-items-center">
        {backLink && (
          <Link to={backLink} className={styles.btn}>
            <BiLeftArrowAlt className="mr-1" />
            {backText}
          </Link>
        )}
        <span className={styles.title}>{title}</span>
      </div>
      {btnLink && (
        <Link to={btnLink} className={styles.btn}>
          {btnText}
        </Link>
      )}
      {modal && (
        <button onClick={clickHandeler} className={styles.btn}>
          {btnText}
        </button>
      )}
    </div>
  );
};

export default connect(null, {
  blogModalToggleAction,
  bestSellerModalToggleAction,
  newArrivalsModalToggleAction,
  onSaleModalToggleAction,
  preOrderModalToggleAction,
  trendingModalToggleAction,
  addCategoryModalToggleAction,
  addCuponModalToggleAction,
  addPublisherModalToggleAction,
  addAuthorModalToggleAction,
})(PageHeader);
