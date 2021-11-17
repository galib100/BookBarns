import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Style from "./Book.module.css";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

function BookReviewDetail({
  review,
  setDetailShow,
  likeFunc,
  dislikeFunc,
  likes,
  dislikes,
}) {
  useEffect(() => {}, [likes, dislikes]);

  return (
    <div className={Style.reviewDetailModalContiner}>
      <div className={Style.reviewDetailModal}>
        <h3>Review</h3>
        <div className={Style.icon} onClick={() => setDetailShow(false)}>
          <IoMdClose />
        </div>

        {/* name & like-dislike */}
        <div className={Style.nameandresponses}>
          <div>by {review.username}</div>
          {/* like & dislike */}
          <div className={Style.vote}>
            <div className={Style.upvote} onClick={likeFunc}>
              <AiOutlineLike /> {likes}
            </div>
            <div className={Style.downvote} onClickCapture={dislikeFunc}>
              <AiOutlineDislike /> {dislikes}
            </div>
          </div>
        </div>

        {/* reiview */}
        <h4>{review.title}</h4>
        <div className={Style.reviewDescBlock}>
          <p className={Style.reviewDesc}>{review.description}</p>
        </div>
      </div>
    </div>
  );
}

export default BookReviewDetail;
