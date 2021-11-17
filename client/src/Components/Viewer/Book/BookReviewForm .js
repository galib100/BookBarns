import React, { useState } from "react";
import { connect } from "react-redux";
import { Rating } from "react-simple-star-rating";

// STYLES & ASSETS
import Style from "./Book.module.css";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { BASE_URL } from "../../../Constants/URL";
import swal from "sweetalert";

function BookReviewForm({ bookId, setShowreviewform, updateReview, user }) {
  const [feelings, setFeelings] = useState("");
  const [thought, setThought] = useState("");
  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  // FORM VALIDATION
  const validation = () => {
    if (feelings && thought && rating) {
      if(feelings.length <= 35){
        return true;
      } else{
        setError("Feelings shouldn't be greater than 20 characters.")
      }
    } else {
      setError("Required all fields.");
      return false;
    }
  };

  // CLEAR FIELDS
  const clearFields = () => {
    setFeelings("");
    setThought("");
    setRating(0);
  }

  // const update UI
  const updateUi = () => {
    const newReview = {
      username: user.username,
      star: rating,
      title: feelings,
      description: thought,
      like: [],
      dislike: [],
    };
    updateReview(newReview);
    setShowreviewform(false);
  }

  // ADD NEW REVIEW
  const addNewReview = (event) => {
    event.preventDefault();

    if (validation()) {
      setLoading(true);
      // 1. get token from local storage
      const viewer_saved_token = { token: localStorage.getItem("viewer_token") };
      // 2. check token is varified or session timeout
      axios
        .post(`${BASE_URL}/api/verify-user-token`, viewer_saved_token)
        .then((res) => {
          if (res.data.verified) {
            // 3. setup config and value to send a post request for review
            const config = { headers: { "auth-token": viewer_saved_token.token }, };
            const value = {
              star: rating,
              title: feelings,
              description: thought,
              bookId: bookId,
              userId: user._id,
              username: user.username,
            };
            // 4. make a request to submit a review
            axios
              .post(`${BASE_URL}/api/user/review`, value, config)
              .then((res) => {
                //  5. if success then clear fields, update UI & swal
                console.log(res.data);
                clearFields();
                updateUi();
                swal("Review Added", "Your review is added for this book.", "success");
                setLoading(false);
              })
              .catch(() => {
                // 6. if error occurs swal a message
                swal("We are sorry", "Something went wrong! Please try again.", "error");
                setLoading(false);
              });
          } else{
            // 7. If session time out. then swal a message
            swal("Session Timeout", "Please reload and login again.", "error");
          }
        })
        .catch(() => {
          // 8. if token not varified or session timeout, remove all data from local storage
          localStorage.removeItem("viewer");
          localStorage.removeItem("viewer_token");
          setLoading(false);
        });
    }
  };

  // HANDLE RATTING FOR UPDATING UI WITHOUT RELOAD
  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div className={Style.reviewFormBlock}>
      <div className={Style.reviewForm}>
        <h3>Add Your Review</h3>
        <div className={Style.icon} onClick={() => setShowreviewform(false)}>
          <IoMdClose />
        </div>
        <form>
          <div className={Style.inputContainer}>
            <label>Your feelings</label>
            <input
              type="text"
              placeholder="Your feelings about this book"
              value={feelings}
              onChange={(e) => setFeelings(e.target.value)}
            />
          </div>
          <div className={Style.inputContainer}>
            <label>Your thoughts</label>
            <textarea
              type="text"
              placeholder="Tell Your Thoughts"
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              rows={8}
            />
          </div>
          <label>How many stars will you give?</label>
          <div className={Style.rattingContainer}>
            <Rating
              onClick={handleRating}
              ratingValue={rating}
              size={50}
              fillColor="#FDBC00"
            />
          </div>
          <small style={{ color: "red", marginTop: "35px" }}>{error}</small>
          <button className={Style.submit} onClick={addNewReview}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.viewer.currentUser.currentUser,
  };
};

export default connect(mapStateToProps, null)(BookReviewForm);
