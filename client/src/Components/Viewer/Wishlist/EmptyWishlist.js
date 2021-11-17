import React from "react";
import { Link } from "react-router-dom";

// Style & Image
import Style from "../../../Views/Viewer/Wishlist/Wishlist.module.css";
import emptybox from "../../../Assets/Viewer/Wishlist/box.png";

function EmptyWishlist() {
  return (
    <div className={Style.emptyList}>
      <div>
        <img src={emptybox} alt="" />
        <h1>Your wishlist is empty</h1>
        <p>Look like you didn't added any book in your wishlist.</p>
        <Link to="/">Back to home page</Link>
      </div>
    </div>
  );
}

export default EmptyWishlist;
