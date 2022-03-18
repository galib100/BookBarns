import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { BASE_URL } from "../../../Constants/URL";
import { saveBooksCategories } from "../../../Actions/Viewer/BookRelated";
// COMPONENTS
import { Nav1 } from "../../../Components/Viewer/Navbar/";
import { Footer } from "../../../Components/Viewer/Footer";
import Items from "../../../Components/Viewer/Landing/Items";
import BannerForLandingPage from "../../../Components/Viewer/Landing/BannerForLandingPage";

const LandingPage = ({ categoriesOfBooks, saveBooksCategories }) => {
  const [categeroyLoading, setCategoryLoading] = useState(false);

  // FETCH CATEGORIES
  const fetchCategories = () => {
    setCategoryLoading(true);
    axios
      .get(`${BASE_URL}/api/admin/allCategory`)
      .then((res) => {
        setCategoryLoading(false);
        saveBooksCategories(res.data);
      })
      .catch((err) => {
        setCategoryLoading(false);
      });
  };

  // CONTROL CATEGORIES
  useEffect(() => {
    if (categoriesOfBooks.length === 0) {
      fetchCategories();
    }
  }, [categoriesOfBooks]);

  return (
    <>
      <Helmet>
        <title>Book barns </title>
        <meta name="title" content="Book barns  " />
        <meta
          name="description"
          content="Book barns  is a community-based book shop founded by a group of enthusiasts from RUET, which won the Bangabandhu Innovation Grant 2019."
        />
        <meta
          name="keywords"
          content="Book barns , book shop, Bangabandhu Innovation Grant, Book barns  ruet, Book barns  shop, online book shop, book market, Book barns  books, best books online "
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Nav1 />
      <BannerForLandingPage
        categeroyLoading={categeroyLoading}
        saveBooksCategories={saveBooksCategories}
      />
      <Items />
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    categoriesOfBooks: state.bookController.categoriesOfBooks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveBooksCategories: (books) => dispatch(saveBooksCategories(books)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
