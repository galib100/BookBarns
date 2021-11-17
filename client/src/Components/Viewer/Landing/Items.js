import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Slider from "react-slick";
// COMPONENTS & DATA
import BookCard from "../Book/BookCard";
import { Card, Container, Row, Col } from "react-bootstrap";
import {
  saveBooksToStore,
  saveBooksCategories,
  saveFilteredBooksToStore,
} from "../../../Actions/Viewer/BookRelated";
import BookCardLoading from "../Book/BookCardLoading";
// STYLE & IMAGES
import Style from "./Items.module.css";
import img1 from "../../../Assets/Viewer/Landing/bestSeller.png";
import img2 from "../../../Assets/Viewer/Landing/new.png";
import img3 from "../../../Assets/Viewer/Landing/onsale.png";
import img4 from "../../../Assets/Viewer/Landing/preorder.png";
import img5 from "../../../Assets/Viewer/Landing/fire.png";
// API
import axios from "axios";
import { BASE_URL } from "../../../Constants/URL";

const Items = ({
  savedBooks,
  filteredSavedBooks,
  saveBooksToStore,
  saveFilteredBooksToStore,
}) => {
  const [loading, setLoading] = useState(false);

  // CAROUSEL SETTINGS
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // FETCH BOOKS
  const fetchBooks = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/api/admin/allBooks`)
      .then((res) => {
        const actualData = res.data.books.filter(
          (item) => item.deleted !== true
        );
        saveBooksToStore(actualData); // <-- save books to redux store
        saveFilteredBooksToStore(actualData); // <-- filter books
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  // FETCH BOOK, FILTER BOOKS, GET CATEGORIES
  useEffect(() => {
    if (savedBooks.length === 0) {
      fetchBooks();
    } else {
      saveFilteredBooksToStore(savedBooks);
    }
  }, []);

  //  DECLARE: LOADING BOOK COMPONENTS
  const cartBookIsNowLoading = (
    <Slider {...settings} className={Style.slider}>
      {Array(5)
        .fill("")
        .map(() => (
          <BookCardLoading />
        ))}
    </Slider>
  );

  return (
    <Container className={`${Style.itemContainer}`}>
      <Row className={`${Style.itemrow}`}>
        <Col>
          <Card className={Style.item_bg}>
            <Card.Img variant="top" src={img1} className={Style.img_icon} />
            <Card.Title className={Style.item_text}>
              {" "}
              Obosor Best seller{" "}
            </Card.Title>
            <Link to="/BestSeller">
              {" "}
              <Card.Subtitle className={`mb-2 ${Style.itemSubText}`}>
                Explore Now
              </Card.Subtitle>
            </Link>
          </Card>
        </Col>

        <Col>
          <Card className={Style.item_bg}>
            <Card.Img variant="top" src={img2} className={Style.img_icon} />
            <Card.Title className={Style.item_text}> New Arrivals </Card.Title>
            <Link to="/NewArrivals">
              {" "}
              <Card.Subtitle className={`mb-2 ${Style.itemSubText}`}>
                Explore Now
              </Card.Subtitle>
            </Link>
          </Card>
        </Col>

        <Col>
          <Card className={Style.item_bg}>
            <Card.Img variant="top" src={img3} className={Style.img_icon} />
            <Card.Title className={Style.item_text}>
              {" "}
              Extra Discount{" "}
            </Card.Title>
            <Link to="/ExtraDiscount">
              {" "}
              <Card.Subtitle className={`mb-2 ${Style.itemSubText}`}>
                Explore Now
              </Card.Subtitle>
            </Link>
          </Card>
        </Col>

        <Col>
          <Card className={Style.item_bg}>
            <Card.Img variant="top" src={img4} className={Style.img_icon} />
            <Card.Title className={Style.item_text}> Pre Order </Card.Title>
            <Link to="/Preorder">
              <Card.Subtitle className={`mb-2 ${Style.itemSubText}`}>
                Explore Now
              </Card.Subtitle>
            </Link>
          </Card>
        </Col>

        <Col>
          <Card className={Style.item_bg}>
            <Card.Img variant="top" src={img5} className={Style.img_icon} />
            <Card.Title className={Style.item_text}> Trending </Card.Title>
            <Link to="/Trending">
              <Card.Subtitle className={`mb-2 ${Style.itemSubText}`}>
                Explore Now
              </Card.Subtitle>
            </Link>
          </Card>
        </Col>
      </Row>

      {/* /////////////////////////////////////////////////////////////// */}
      {/* ============ BEST SELLER =========== */}
      <Row className={`${Style.booksRow}`}>
        <Col>
          <h4 className={Style.item_header}>Obosor Best seller</h4>
        </Col>
        <Col>
          <Link to="/BestSeller">
            <span>View All</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-chevron-right"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </span>
          </Link>
        </Col>
      </Row>
      {/* books */}
      {!loading ? (
        <div style={{ overflow: "hidden", width: "100%" }}>
          <Slider {...settings} className={Style.slider}>
            {filteredSavedBooks &&
              filteredSavedBooks.bestSeller &&
              filteredSavedBooks.bestSeller
                .slice(0, 15)
                .map((item) => <BookCard key={item._id} item={item} />)}
          </Slider>
        </div>
      ) : (
        cartBookIsNowLoading
      )}

      {/* ============ NEW ARRIVALS =========== */}
      <Row className={`${Style.booksRow}`}>
        <Col>
          <h4 className={Style.item_header}>New Arrivals</h4>
        </Col>
        <Col>
          <Link to="/NewArrivals">
            <span>View All</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-chevron-right"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </span>
          </Link>
        </Col>
      </Row>
      {/* books */}
      {!loading ? (
        <div style={{ overflow: "hidden", width: "100%" }}>
          <Slider {...settings} className={Style.slider}>
            {filteredSavedBooks &&
              filteredSavedBooks.newArrival &&
              filteredSavedBooks.newArrival
                .slice(0, 15)
                .map((item) => <BookCard key={item.id} item={item} />)}
          </Slider>
        </div>
      ) : (
        cartBookIsNowLoading
      )}

      {/* ============ TRENDING =========== */}
      <Row className={`${Style.booksRow}`}>
        <Col>
          <h4 className={Style.item_header}>Trending</h4>
        </Col>
        <Col>
          <Link to="/Trending">
            <span>View All</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-chevron-right"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </span>
          </Link>
        </Col>
      </Row>
      {/* books */}
      {!loading ? (
        <div style={{ overflow: "hidden", width: "100%" }}>
          <Slider {...settings} className={Style.slider}>
            {filteredSavedBooks &&
              filteredSavedBooks.trending &&
              filteredSavedBooks.trending
                .slice(0, 15)
                .map((item) => <BookCard key={item.id} item={item} />)}
          </Slider>
        </div>
      ) : (
        cartBookIsNowLoading
      )}
      {/* ============ PRE ORDER LIST =========== */}
      <Row className={`${Style.booksRow}`}>
        <Col>
          <h4 className={Style.item_header}>Pre-Order List</h4>
        </Col>
        <Col>
          <Link to="/Preorder">
            <span>View All</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-chevron-right"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </span>
          </Link>
        </Col>
      </Row>
      {/* books */}
      {!loading ? (
        <div style={{ overflow: "hidden", width: "100%" }}>
          <Slider {...settings} className={Style.slider}>
            {filteredSavedBooks &&
              filteredSavedBooks.preOrders &&
              filteredSavedBooks.preOrders
                .slice(0, 5)
                .map((item) => <BookCard key={item.id} item={item} />)}
          </Slider>
        </div>
      ) : (
        cartBookIsNowLoading
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  savedBooks: state.bookController.books,
  filteredSavedBooks: state.bookController.filteredSavedBooks,
});

const mapDispatchToProps = (dispatch) => {
  return {
    saveBooksToStore: (books) => dispatch(saveBooksToStore(books)),
    saveBooksCategories: (books) => dispatch(saveBooksCategories(books)),
    saveFilteredBooksToStore: (books) =>
      dispatch(saveFilteredBooksToStore(books)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);
