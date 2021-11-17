import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  saveBooksToStore,
  saveFilteredBooksToStore,
} from "../../../Actions/Viewer/BookRelated";
// COMPONETS & FUNC
import Nav1 from "../../../Components/Viewer/Navbar/Navbar";
import BookCard from "../../../Components/Viewer/Book/BookCard";
import BookCardLoading from "../../../Components/Viewer/Book/BookCardLoading";
import { Footer } from "../../../Components/Viewer/Footer";
// STYLES
import Style from "./ViewBooks.module.css";
import notFound from "../../../Assets/Viewer/ViewBooks/not-found.png";
// API
import axios from "axios";
import { BASE_URL } from "../../../Constants/URL";
import { Helmet } from "react-helmet";

function ViewBooks({
  savedBooks,
  filteredSavedBooks,
  saveBooksToStore,
  saveFilteredBooksToStore,
}) {
  const location = useLocation();
  const [heading, setHeading] = useState("");
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);

  // FILTER BOOKS ACCORDING TO PATHNAME
  const filterBooks = (pathname) => {
    let fb, hd;
    if (pathname === "/BestSeller") {
      hd = "Best Seller"
      fb = filteredSavedBooks.bestSeller;
    } else if (pathname === "/NewArrivals") {
      hd = "New Arrivals";
      fb = filteredSavedBooks.newArrival;
    } else if (pathname === "/Preorder") {
      hd = "Preorder";
      fb = filteredSavedBooks.preOrders;
    } else if (pathname === "/Trending") {
      hd = "Trending";
      fb = filteredSavedBooks.trending;
    } else if (pathname === "/ExtraDiscount") {
      hd = "Extra Discount";
      fb = filteredSavedBooks.extraDiscount;
    }
    setHeading(hd);
    setItemList(fb);
    setLoading(false);
  };

  useEffect(() => {
    const pathname = location.pathname.slice("/");
    filterBooks(pathname);
  }, [filteredSavedBooks]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const pathname = location.pathname.slice("/");

    // Get books from redux store if page-reload happen get books from server
    if (savedBooks.length === 0) {
      setLoading(true);
      axios
        .get(`${BASE_URL}/api/admin/allBooks`)
        .then((res) => {
          const actualData = res.data.books;
          saveBooksToStore(actualData); // <-- save books to redux store
          saveFilteredBooksToStore(actualData); // <-- filter books
          filterBooks(pathname);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      saveFilteredBooksToStore(savedBooks);
      filterBooks(pathname);
    }
  }, []);

  return (
    <>
      {/* ==================== React Helmet =================== */}
      <Helmet>
        <title>Obosor | {heading}</title>
        <meta name="desciption" content={`${heading} books`} />
      </Helmet>
      {/* ==================== Navigation =================== */}
      <Nav1 />
      {/* ==================== Top Text =================== */}
      <div className={Style.topText}>
        <Link to="/">Home</Link>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-right"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
        <Link to={location.pathname}>{heading}</Link>
      </div>

      {/* ==================== Category Name =================== */}
      <div className={Style.container}>
        <div className={Style.heading}>
          <h2>{heading}</h2>
        </div>

        {/* ==================== Filtered Books =================== */}
        {!loading ? (
          itemList && itemList.length > 0 ? (
            <div className={Style.itemContainerr}>
              {itemList &&
                itemList.map((book) => (
                  <div className={Style.viewBookContForBook}>
                    <BookCard key={book.id} item={book} />
                  </div>
                ))}
            </div>
          ) : (
            <div className={Style.itemContainerr}>
              <div className={Style.noBookHere}>
                <img src={notFound} alt="Not Found" />
                <h3>Sorry! currently, {heading} books are unavailable.</h3>
              </div>
            </div>
          )
        ) : (
          <div className={Style.itemContainerr}>
            {Array(7)
              .fill("")
              .map(() => (
                <div className={Style.viewBookContForBook}>
                  <BookCardLoading />
                </div>
              ))}
          </div>
        )}
      </div>

      {/* ==================== Footer =================== */}
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  savedBooks: state.bookController.books,
  filteredSavedBooks: state.bookController.filteredSavedBooks,
});

const mapDispatchToProps = (dispatch) => {
  return {
    saveBooksToStore: (books) => dispatch(saveBooksToStore(books)),
    saveFilteredBooksToStore: (books) =>
      dispatch(saveFilteredBooksToStore(books)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewBooks);
