import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateStoreForWishlist } from "../../../Actions/Viewer/BookRelated";

// Components
import { Nav1 } from "../../../Components/Viewer/Navbar/";
import { Footer } from "../../../Components/Viewer/Footer";
import EmptyWishlist from "../../../Components/Viewer/Wishlist/EmptyWishlist";
import SelectedWishlist from "../../../Components/Viewer/Wishlist/SelectedWishlist";

// Styles
import Style from "./Wishlist.module.css";

function WishlistPage({savedWishlist, updateStoreForWishlist}) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("viewer_wishlist")) {
      const wishlistArray = JSON.parse(localStorage.getItem("viewer_wishlist"));
      setWishlist(wishlistArray);
      updateStoreForWishlist();
    }
  }, [savedWishlist.length]);

  return (
    <>
      <Nav1 />
      <div className={Style.wishlist}>
        {wishlist && wishlist.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <SelectedWishlist booklist={wishlist} />
        )}
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    savedWishlist: state.bookController.wishlist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStoreForWishlist: () => dispatch(updateStoreForWishlist()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WishlistPage);
