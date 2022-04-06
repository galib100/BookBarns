import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// STYLES
import Style from "./Categories.module.css";
import notfoundImage from "../../../Assets/Viewer/ViewBooks/not-found.png"
// REDUX
import { connect } from "react-redux";
import { saveBooksToStore } from "../../../Actions/Viewer/BookRelated";
// API
import axios from "axios";
import { BASE_URL } from "../../../Constants/URL";
// COMPONENTS
import { Nav1 } from "../../../Components/Viewer/Navbar/";
import { Footer } from "../../../Components/Viewer/Footer";
import BookCardLoading from "../../../Components/Viewer/Book/BookCardLoading";
import BookCard from "../../../Components/Viewer/Book/BookCard";
import { Helmet } from "react-helmet";

function Category({ savedBooks, saveBooksToStore }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [fBooks, setFbooks] = useState([]);

  // FILTER BOOKS ACCORDING TO CATEGORY & SUBCATEGORY
  const filterBooks = (books, filterIn, filterBy) => {
    let filteredBooks = [];

    if (filterIn === "sub-category") {
      books.map((book) => {
        const subCats = book.subcategory;
        if (subCats.trim() === filterBy.trim()) {
          filteredBooks.push(book);
        }
      });
    } else {
      books.map((book) => {
        const cats = book.category;
        if (cats.trim() === filterBy.trim()) {
          filteredBooks.push(book);
        }
      });
    }
    setFbooks(filteredBooks);
  };

  // FETCH BOOK INFORMATION IF A CLIENT RELOAD THE PARE
  useEffect(() => {
    const type = location.pathname.split("/")[1];
    const name = decodeURIComponent(location.pathname.split("/")[2]);

    // Get books from redux store if page-reload happen get books from server
    if (savedBooks.length === 0) {
      setLoading(true);
      axios
        .get(`${BASE_URL}/api/admin/allBooks`)
        .then((res) => {
          const actualData = res.data.books; // <-- actual data for deployment
          saveBooksToStore(actualData); // <-- save books to redux store
          filterBooks(actualData, actualData.type, name); // <-- filter books
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      filterBooks(savedBooks, type, name);
    }
  }, []);

  return (
    <>
    <Helmet>
      <title>BookBarns-{location.pathname.split("/")[2]}</title>
      <meta name="desciption" content={`Top ${location.pathname.split("/")[2]} books`} />
    </Helmet>
      <Nav1 />
      <div className={Style.categoryPageCont}>
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
          <Link to="/categories">Categories</Link>
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
          <Link to={location.pathname}>{location.pathname.split("/")[2]}</Link>
        </div>

        {/* ==================== Category Name =================== */}
        <div className={Style.container}>
          <div className={Style.heading}>
            <h2>{location.pathname.split("/")[2]}</h2>
          </div>

          {/* ==================== Filtered Books =================== */}
          {!loading ? (
            fBooks.length > 0 ? (
              <div className={Style.itemContainerr}>
                {fBooks &&
                  fBooks.map((book) => (
                    <div className={Style.viewBookContForBook}>
                      <BookCard key={book.id} item={book} />
                    </div>
                  ))}
              </div>
            ) : <div className={Style.emptyBooks}>
              <img src={notfoundImage} alt="" />
              <h3>Sorry! Books in this category are currently unavailable</h3>
              <Link to="/categories">Want to try diffrent category?</Link>
            </div>
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
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  savedBooks: state.bookController.books,
});

const mapDispatchToProps = (dispatch) => {
  return {
    saveBooksToStore: (books) => dispatch(saveBooksToStore(books)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
