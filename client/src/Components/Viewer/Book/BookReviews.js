import React, { useEffect } from "react";
import { connect } from "react-redux";

// COMPONENTS & ACTIONS
import BookReview from "./BookReview";
import { loginSignupModalToggle } from "../../../Actions/Viewer/LandingPageActions";

// STYLES & ASSETS
import Style from "./Book.module.css";
import starImage from "../../../Assets/Viewer/BookDetails/reading.svg";
import readingImage from "../../../Assets/Viewer/BookDetails/reading.png";
import { BsStarFill, BsStarHalf } from "react-icons/bs";

function BookReviews({
  currentUser,
  ratings,
  stars,
  selectedReviews,
  loginSignupModalToggle,
  setShowreviewform,
}) {
  // CONTROL REVIEW FROM OPEN & CLOSE
  const openReviewForm = () => {
    if (currentUser === null) {
      loginSignupModalToggle("login");
    } else {
      setShowreviewform(true);
    }
  };

  useEffect(() => {}, [
    JSON.stringify(selectedReviews),
    JSON.stringify(stars),
    ratings,
  ]);

  return (
    <div className={Style.reviews}>
      <div className={Style.reHeading}>
        <h1>Review</h1>
        <p>See what others say about this book</p>
      </div>

      {selectedReviews && selectedReviews.length > 0 ? (
        <>
          <div className={Style.bookReviews}>
            {/* //////////////////////////////////////////////////////// */}
            {/* ratting & stars */}
            <div className={Style.averageRatting}>
              <h3>Reviews</h3>
              <h4>Average</h4>
              <h1>{ratings}</h1>
              <div className={Style.stars}>
                {stars.map((s) =>
                  s === 0 ? (
                    <div className={Style.plainStar}>
                      <BsStarFill />
                    </div>
                  ) : s === 1 ? (
                    <div className={Style.coloredStar}>
                      <BsStarFill />
                    </div>
                  ) : (
                    <div className={Style.coloredStar}>
                      <BsStarHalf />
                    </div>
                  )
                )}
              </div>
              <p>{selectedReviews && selectedReviews.length} Reviews</p>
            </div>

            {/* ////////////////////////////////////////////////// */}
            {/* all reviews */}
            <div className={Style.allreviews}>
              {/* if there isn't any review show empty page */}
              <div className={Style.addReviewOptionCard}>
                <h3>Add Your Review</h3>
                <p>
                  Share your valuable feedback about the book and help others to
                  know more about the book
                </p>
                <button onClick={openReviewForm}>Add Review</button>
                <img src={starImage} alt="" />
              </div>
              {selectedReviews &&
                selectedReviews.map((review) => <BookReview review={review} />)}
            </div>
          </div>
        </>
      ) : (
        <div className={Style.emptyReview}>
          <img src={readingImage} alt="" />
          <h3>This book has not been reviewed yet.</h3>
          <p>Add your review to be first reviewer</p>
          <button onClick={openReviewForm}>Add Review</button>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser:
      state.viewer.currentUser && state.viewer.currentUser.currentUser,
  };
};

export default connect(mapStateToProps, { loginSignupModalToggle })(
  BookReviews
);
