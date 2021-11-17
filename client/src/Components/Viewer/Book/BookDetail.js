import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

// ASSETS
import { FiPlus, FiMinus } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from "react-icons/ai";

// COMPONENTS & ACTIONS
import { Nav1 } from "../Navbar/";
import { Footer } from "../Footer";
import BookReviews from "./BookReviews";
import BookDetailLoading from "./BookDetailLoading";
import { addToCart, addToWishlist } from "../../../Actions/Viewer/BookRelated";

// STYLE & IMAGES
import Style from "./Book.module.css";
import { BASE_URL } from "../../../Constants/URL";
import BookReviewForm from "./BookReviewForm ";
import { Helmet } from "react-helmet";
import BookShareOptions from "./BookShareOptions";
import MDEditor from "@uiw/react-md-editor";

function BookDetail({ addToCart, cart, addToWishlist }) {
  const [fetchedBook, setFetchedBook] = useState({});
  const [amount, setAmount] = useState(1);
  const [ratings, setRatings] = useState(0);
  const [stars, setStars] = useState([0, 0, 0, 0, 0]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToWishList, setAddedToWishlist] = useState(false);
  const [showreviewform, setShowreviewform] = useState(false);
  const [showShareOption, setShowShareOption] = useState(false);
  const [pageUrl, setPageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { bookID } = useParams();

  // ADD A BOOK TO CART
  const addBookToCart = () => {
    const item = { ...fetchedBook, amount };
    addToCart(item);
    setAddedToCart(true);
  };

  // ADD A BOOK TO WISHLIST
  const addBookToWishList = () => {
    addToWishlist(fetchedBook);
    setAddedToWishlist(true);
  };

  // CHECK THIS BOOK IS INCLUDED IN CART OR NOT
  const findBookToCart = (bookId) => {
    const found = cart && cart.find((book) => book._id === bookId);
    if (found) {
      setAddedToCart(true);
    }
  };

  // AMOUNT CONTROLLER FUNC
  const itemIncrement = () => {
    setAmount(amount + 1);
  };
  const itemDecreament = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  // CALCULATE RATTING
  const calculateRating = (reviews) => {
    let stars = 0;
    if (reviews.length > 0) {
      reviews.map((review) => {
        stars += review.star;
      });
      stars = (stars / reviews.length).toFixed(1);
    }
    setRatings(stars);
    calculateStars(stars);
  };

  // SETUP STARS
  const calculateStars = (ratting) => {
    const tempStars = [0, 0, 0, 0, 0];
    // 1. fill stars according to ratting
    const starFill = Math.floor(ratting);
    for (let i = 0; i < starFill; i++) {
      tempStars[i] = 1;
    }
    // 2. fill half star, if there is a fraction
    const fraction = ratting - starFill;
    if (fraction !== 0) {
      tempStars[starFill] = -1;
    }
    setStars(tempStars);
  };

  // UPDATE REVIEWS WHEN A USER POST A REVIEW
  const updateReview = (review) => {
    const newRatting = (
      (ratings * fetchedBook.reviews.length + review.star) /
      (fetchedBook.reviews.length + 1)
    ).toFixed(1);
    calculateStars(newRatting);
    setRatings(newRatting);
    setFetchedBook({
      ...fetchedBook,
      reviews: [...fetchedBook.reviews, review],
    });
  };

  // FETCH DATA
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    axios
      .get(`${BASE_URL}/api/admin/book/${bookID}`)
      .then((res) => {
        // 1. Save book details
        setFetchedBook(res.data);
        // 2. Check whether it is added to cart or not
        findBookToCart(res.data._id);
        // 3. Calculate ratting from reviews
        calculateRating(res.data.reviews);
        // 4. set page url for share option
        setPageUrl(`https://obosor.shop/Book/${res.data._id}`);
        // 5. Set loading to false
        setLoading(false);
      })
      .catch((err) => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  }, [bookID]);

  return (
    <>
      <Helmet>
        <title>{fetchedBook.title}</title>
        <meta name="title" content={fetchedBook.title} />
        <meta
          name="author"
          content={`Written by ${fetchedBook.author}: ${fetchedBook.description}`}
        />

        {fetchedBook &&
          fetchedBook.tags &&
          fetchedBook.tags.length > 0 &&
          fetchedBook.tags.map((tag) => {
            <meta name="keyword" content={tag} />;
          })}
        <meta name="description" content={fetchedBook.title} />
      </Helmet>
      {/* ==================== Navigation =================== */}
      <Nav1 />

      {/* ==================== Top Text =================== */}
      <div className={Style.topText}>
        <div>Books</div>
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
        <Link to="/">{fetchedBook && fetchedBook.title}</Link>
      </div>

      {!loading ? (
        <div className={Style.bookDetailContainer}>
          {/* ==================== BOOK INFO =================== */}
          <div className={Style.bookdetails}>
            {/* book image */}
            <div className={Style.bookImage}>
              <img src={`${BASE_URL}/${fetchedBook.image}`} alt="" />
            </div>

            {/* book - basic info */}
            <div className={Style.bookInfo}>
              <h2 className={Style.title}>{fetchedBook.title}</h2>
              <h4 className={Style.author}>
                By (author):{" "}
                <span>
                  <Link
                    to={`/author/${fetchedBook.author}`}
                    style={{
                      color: "var(--color-brown)",
                      textDecoration: "none",
                    }}
                    className="custom__link"
                  >
                    {fetchedBook.author}
                  </Link>
                </span>
              </h4>
              <div className={Style.priceContainer}>
                <h1>
                  {fetchedBook.discounttype === "flat" ? (
                    <>
                      {fetchedBook.price - fetchedBook.discount}
                      <span>tk</span>
                    </>
                  ) : (
                    <>
                      {fetchedBook.price -
                        Math.ceil(
                          (fetchedBook.price * fetchedBook.discount) / 100
                        )}
                      <span>tk</span>
                    </>
                  )}
                </h1>
                <h5>
                  {fetchedBook.discount !== 0 ? (
                    <strike>{fetchedBook.price} tk</strike>
                  ) : null}
                </h5>
                {fetchedBook.discount !== 0 ? (
                  <h4>
                    {fetchedBook.discounttype === "flat"
                      ? `(${fetchedBook.discount} Tk off)`
                      : `(${fetchedBook.discount}% off)`}
                  </h4>
                ) : null}
              </div>
              <p>
                <MDEditor.Markdown source={fetchedBook.description} />
              </p>
              <div className={Style.btncont}>
                <div className={Style.incrementalButton}>
                  <div onClick={itemDecreament}>
                    <FiMinus />
                  </div>
                  <div>{amount}</div>
                  <div onClick={itemIncrement}>
                    <FiPlus />
                  </div>
                </div>
                {!addedToCart ? (
                  <button onClick={addBookToCart}>Add to cart</button>
                ) : (
                  <button className={Style.addedToCartLine}>
                    Added to cart
                  </button>
                )}
              </div>

              {/* Add to wishlist */}
              <div className={Style.options}>
                {addedToWishList ? (
                  <div className={Style.option} style={{ color: "red" }}>
                    <div>
                      <AiFillHeart />
                    </div>
                    Add to wishlist
                  </div>
                ) : (
                  <div className={Style.option} onClick={addBookToWishList}>
                    <div>
                      <AiOutlineHeart />
                    </div>
                    Add to wishlist
                  </div>
                )}

                {/* Share button */}
                <div
                  className={Style.option}
                  onClick={() => setShowShareOption(!showShareOption)}
                >
                  <div>
                    <AiOutlineShareAlt />
                  </div>
                  Share
                </div>
              </div>
              {/* Share options */}
              <div
                className={
                  showShareOption
                    ? `${Style.shareOptions}`
                    : `${Style.fromshareOptions}`
                }
              >
                <BookShareOptions pageUrl={pageUrl} />
              </div>
            </div>

            {/* book - spec info */}
            <div className={Style.bookSpec}>
              <div className={Style.specheading}>Specifications</div>

              <div className={Style.bookSpecCont}>
                <div className={Style.bookSpecInfo}>
                  <div className={Style.bookSpecInfoName}>Book Name</div>
                  <div className={Style.bookSpecInfoValue}>
                    {fetchedBook.title}
                  </div>
                </div>
                <div className={Style.bookSpecInfo}>
                  <div className={Style.bookSpecInfoName}>Author</div>
                  <div className={Style.bookSpecInfoValue}>
                    <Link to={`/author/${fetchedBook.author}`}>
                      {fetchedBook.author}
                    </Link>
                  </div>
                </div>
                <div className={Style.bookSpecInfo}>
                  <div className={Style.bookSpecInfoName}>Publisher</div>
                  <div className={Style.bookSpecInfoValue}>
                    <Link to={`/publisher/${fetchedBook.publisher}`}>
                      {fetchedBook.publisher}
                    </Link>
                  </div>
                </div>
                <div className={Style.bookSpecInfo}>
                  <div className={Style.bookSpecInfoName}>Category</div>
                  <div className={Style.bookSpecInfoValue}>
                    <Link to={`/category/${fetchedBook.category}`}>
                      {fetchedBook.category}
                    </Link>
                  </div>
                </div>
                <div className={Style.bookSpecInfo}>
                  <div className={Style.bookSpecInfoName}>Pages</div>
                  <div className={Style.bookSpecInfoValue}>
                    {fetchedBook.pages}
                  </div>
                </div>
                <div className={Style.bookSpecInfo}>
                  <div className={Style.bookSpecInfoName}>Price</div>
                  <div className={Style.bookSpecInfoValue}>
                    {fetchedBook.price}
                  </div>
                </div>
                <div className={Style.bookSpecInfo}>
                  <div className={Style.bookSpecInfoName}>Publishing Year</div>
                  <div className={Style.bookSpecInfoValue}>
                    {fetchedBook.year}
                  </div>
                </div>
                <div className={Style.bookSpecInfo}>
                  <div className={Style.bookSpecInfoName}>Edition</div>
                  <div className={Style.bookSpecInfoValue}>
                    {fetchedBook.edition}
                    {fetchedBook.edition == 1 ? (
                      <span>st</span>
                    ) : fetchedBook.edition == 2 ? (
                      <span>nd</span>
                    ) : fetchedBook.edition == 3 ? (
                      <span>rd</span>
                    ) : (
                      <span>th</span>
                    )}
                  </div>
                </div>
                {fetchedBook.isbn && fetchedBook.isbn !== "" ? (
                  <div className={Style.bookSpecInfo}>
                    <div className={Style.bookSpecInfoName}>ISBN</div>
                    <div className={Style.bookSpecInfoValue}>
                      {fetchedBook.isbn}
                    </div>
                  </div>
                ) : null}
                <div className={Style.bookSpecInfo}>
                  <div className={Style.bookSpecInfoName}>Quality</div>
                  <div className={Style.bookSpecInfoValue}>
                    {fetchedBook.quality}
                  </div>
                </div>
                <div className={Style.bookSpecInfo}>
                  <div className={Style.bookSpecInfoName}>Stock</div>
                  <div className={Style.bookSpecInfoValue}>
                    {fetchedBook.quantity === 0 ? (
                      <span style={{ color: "red", fontWeight: "500" }}>
                        Out of stock
                      </span>
                    ) : (
                      <span style={{ color: "#32CD32", fontWeight: "500" }}>
                        In Stock
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==================== BOOK REVIEW =================== */}
          <BookReviews
            selectedReviews={fetchedBook.reviews}
            ratings={ratings}
            stars={stars}
            setShowreviewform={setShowreviewform}
          />
        </div>
      ) : (
        <BookDetailLoading />
      )}

      {/* control review form */}
      {showreviewform ? (
        <BookReviewForm
          bookId={bookID}
          setShowreviewform={setShowreviewform}
          updateReview={updateReview}
        />
      ) : null}

      {/* ==================== Footer =================== */}
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.bookController.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (book) => dispatch(addToCart(book)),
    addToWishlist: (book) => dispatch(addToWishlist(book)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
