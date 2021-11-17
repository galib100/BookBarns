import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// REDUX
import { connect } from "react-redux";
import { saveBooksToStore } from "../../../Actions/Viewer/BookRelated";
// STYLES & ASSETS
import Style from "./Publisher.module.css";
import { BASE_URL } from "../../../Constants/URL";
import notfoundImage from "../../../Assets/Viewer/ViewBooks/not-found.png"
//COMPONENTS
import { Footer } from "../../../Components/Viewer/Footer";
import { Nav1 } from "../../../Components/Viewer/Navbar";
import BookCard from "../../../Components/Viewer/Book/BookCard";
import BookCardLoading from "../../../Components/Viewer/Book/BookCardLoading";

function FilteredBookForAPublisher({ savedBooks, saveBooksToStore }) {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // FILTER BOOKS
  const filterBooks = (books, type) => {
    let fbooks = [];
    books.map((book) => {
      if (book.publisher.trim() == type.trim()) {
        fbooks.push(book);
      }
    });
    setFilteredBooks(fbooks);
    setTimeout(() => { setLoading(false); }, 1000);
  };

  // FETCH BOOK INFORMATION IF A CLIENT RELOAD THE PARE
  useEffect(() => {
    const type = location.pathname.split("/")[2];

    // Get books from redux store if page-reload happen get books from server
    if (savedBooks.length === 0) {
      setLoading(true);
      axios
        .get(`${BASE_URL}/api/admin/allBooks`)
        .then((res) => {
          const actualData = res.data.books; // <-- actual data for deployment
          saveBooksToStore(actualData); // <-- save books to redux store
          filterBooks(actualData, type); // <-- filter books
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      filterBooks(savedBooks, type);
    }
  }, []);
  return (
    <>
      <Nav1 />
      <div className={Style.filterBooksAccordingToPublisherCont}>
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
          <Link to="/publisher">Publisher</Link>
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
            filteredBooks.length > 0 ? (
              <div className={Style.itemContainerr}>
                {filteredBooks &&
                  filteredBooks.map((book) => (
                    <div className={Style.viewBookContForBook}>
                      <BookCard key={book.id} item={book} />
                    </div>
                  ))}
              </div>
            ) : (
              <div className={Style.emptyBooks}>
                <img src={notfoundImage} alt="" />
                <h3>Sorry! Books in this category are currently unavailable</h3>
                <Link to="/categories">Want to try diffrent category?</Link>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilteredBookForAPublisher);
