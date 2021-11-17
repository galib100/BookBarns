import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loginSignupModalToggle } from "../../../Actions/Viewer/LandingPageActions";
import Style from "./Book.module.css";
// ICONS
import { BsStarFill } from "react-icons/bs";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
// API
import axios from "axios";
import { BASE_URL } from "../../../Constants/URL";
// COMPONENTS
import BookReviewDetail from "./BookReviewDetail";

function BookReview({ review, currentUser, loginSignupModalToggle}) {
  const [formatedDesc, setFormatedDesc] = useState("");
  const [likes, setLikes] = useState();
  const [dislikes, setDislikes] = useState();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [detailShow, setDetailShow] = useState(false);

  //   DATA FETCHING & FORMATTING
  useEffect(() => {
    // 1. set like & dislike length
    const newStr = review.description.replace(/\r?\n|\r/g, " ");
    const desc = newStr.replace(/(([^\s]+\s\s*){10})(.*)|(\n)/, "$1....");
    setFormatedDesc(desc);
    setLikes(review.like.length);
    setDislikes(review.dislike.length);
    // 2. find user and set liked and disliked
    if(currentUser){
      const ulf =  review.like.filter(l => l === currentUser._id);
      if(ulf.length  >= 1) { setLiked(true); }
      const udf =  review.like.filter(l => l === currentUser._id);
      if(udf.length  >= 1) { setDisliked(true); }
    }
  }, []);

  // LIKE FUNC
  const likeFunc = () => {
    //   1. setup token, value & config
    const viewer_saved_token = { token: localStorage.getItem("viewer_token") };
    const value = { reviewId: review._id, userId:  currentUser && currentUser._id};
    const config = { headers: { "auth-token": viewer_saved_token.token } };
    // 2. update ui first - ⚠️ update needed
    
    // 3. verify token
    axios
      .post(`${BASE_URL}/api/verify-user-token`, viewer_saved_token)
      .then((res) => {
        if (res.data.verified) {
          // 4. if verified call api for like
          axios
            .patch(`${BASE_URL}/api/user/review/like`, value, config)
            .then((res) => {setLikes(res.data[0].like.length); setDislikes(res.data[0].dislike.length);})
            .catch(() => {setLikes(likes - 1);});
        } else{
          loginSignupModalToggle("login");
        }
      })
      .catch((err) => {
        localStorage.removeItem("viewer");
        localStorage.removeItem("viewer_token");
        loginSignupModalToggle("login");
      });
  };
  
  // DISLIKE FUNC
  const dislikeFunc = () => {
    //   1. setup token, value & config
    const viewer_saved_token = { token: localStorage.getItem("viewer_token") };
    const value = { reviewId: review._id, userId:  currentUser && currentUser._id};
    const config = { headers: { "auth-token": viewer_saved_token.token } };
    // 2. update ui first - ⚠️ update needed
    
    // 3. verify token
    axios
      .post(`${BASE_URL}/api/verify-user-token`, viewer_saved_token)
      .then((res) => {
        if (res.data.verified) {
          // 4. if verified call api for like
          axios
            .patch(`${BASE_URL}/api/user/review/dislike`, value, config)
            .then((res) => {setLikes(res.data[0].like.length); setDislikes(res.data[0].dislike.length);})
            .catch(() => {setLikes(likes - 1);});
        } else{
          loginSignupModalToggle("login");
        }
      })
      .catch((err) => {
        localStorage.removeItem("viewer");
        localStorage.removeItem("viewer_token");
        loginSignupModalToggle("login");
      });
  };

  return (
    <>
      <div className={Style.areview}>
        <div className={Style.client}>
          <div className={Style.client__image}>
            <h6>M</h6>
          </div>
          <div className={Style.client__name}>{review.username}</div>
        </div>
        <div className={Style.clientstars}>
          {Array(parseInt(review.star))
            .fill()
            .map(() => (
              <div className={Style.coloredStar}>
                <BsStarFill />
              </div>
            ))}
          {Array(5 - parseInt(review.star))
            .fill()
            .map(() => (
              <div className={Style.plainStar}>
                <BsStarFill />
              </div>
            ))}
        </div>
        <h3>{review.title}</h3>
        <p>{formatedDesc}</p>
        <p className={Style.readmore} onClick={() => setDetailShow(true)}>
          Read More
        </p>
        <div className={Style.vote}>
          <div className={Style.upvote} onClick={likeFunc}>
            <AiOutlineLike /> {likes}
          </div>
          <div className={Style.downvote} onClick={dislikeFunc}>
            <AiOutlineDislike /> {dislikes}
          </div>
        </div>
      </div>
      {detailShow ? (
        <BookReviewDetail
          review={review}
          setDetailShow={setDetailShow}
          likes={likes}
          dislikes={dislikes}
          likeFunc={likeFunc}
          dislikeFunc={dislikeFunc}
        />
      ) : null}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser:
      state.viewer.currentUser && state.viewer.currentUser.currentUser,
  };
};

export default connect(mapStateToProps, { loginSignupModalToggle })(BookReview);
