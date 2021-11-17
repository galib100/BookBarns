import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { saveBooksToStore } from "../../../Actions/Viewer/BookRelated";
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

function ViewFilteredBook({savedBooks, saveBooksToStore}) {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // FILTER BOOKS
  const filterBooks = (books, type, value) => {
    let fbooks = [];
    setType(type);
    setValue(value);

    if(type === 'author'){
      books.map((book) => {
        if (book.author === value) {
          fbooks.push(book);
        }
      });
    } else if(type === 'genre'){
      books.map((book) => {
        if (book.genre === value) {
          fbooks.push(book);
        }
      });
    }
    setFilteredBooks(fbooks);
  };
  
  // FETCH BOOK INFORMATION IF A CLIENT RELOAD THE PARE
  useEffect(() => {
    const type = location.pathname.split("/")[1];
    const value = location.pathname.split("/")[2];

    // Get books from redux store if page-reload happen get books from server
    if (savedBooks.length === 0) {
      setLoading(true);
      axios
        .get(`${BASE_URL}/api/admin/allBooks`)
        .then((res) => {
          const actualData = res.data.books; // <-- actual data for deployment
          saveBooksToStore(actualData); // <-- save books to redux store
          filterBooks(actualData, type, value); // <-- filter books
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      filterBooks(savedBooks, type, value);
    }
  }, []);

  return <div>
      <Helmet>
        <title>Obosor-Books</title>
        <meta name="desciption" content={`books`} />
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
        <div>{type}</div>
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
        <div>{value}</div>
      </div>

      {/* ==================== Category Name =================== */}
      <div className={Style.container}>
        <div className={Style.heading}>
          <h2>{value}</h2>
        </div>

        {/* ==================== Filtered Books =================== */}
        {!loading ? (
          filteredBooks && filteredBooks.length > 0 ? (
            <div className={Style.itemContainerr}>
              {filteredBooks &&
                filteredBooks.map((book) => (
                  <div className={Style.viewBookContForBook}>
                    <BookCard key={book.id} item={book} />
                  </div>
                ))}
            </div>
          ) : (
            <div className={Style.itemContainerr}>
              <div className={Style.noBookHere}>
                <img src={notFound} alt="Not Found" />
                {/* <h3>Sorry! currently, {heading} books are unavailable.</h3> */}
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
  </div>;
}

const mapStateToProps = (state) => ({
  savedBooks: state.bookController.books,
});

const mapDispatchToProps = (dispatch) => {
  return {
    saveBooksToStore: (books) => dispatch(saveBooksToStore(books)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewFilteredBook);
