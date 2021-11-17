import React, { useState } from "react";
import { connect } from "react-redux";
import swal from "sweetalert";
import {
  addToCart,
  removeFromWishlist,
} from "../../../Actions/Viewer/BookRelated";
// Style
import Style from "../../../Views/Viewer/Wishlist/Wishlist.module.css";
import Item from "./Item";

function SelectedWishlist({ booklist, addToCart, removeFromWishlist }) {
  // ADD A BOOK TO CART
  const addBookToCart = (book) => {
    const item = { ...book, amount: 1 };
    addToCart(item);
    deleteItem(book._id);
    swal("Book is added successfully", "", "success");
  };

  // DELTE FROM WISHLIST
  const deleteItem = (id) => {
    removeFromWishlist(id);
  };

  return (
    <div className={Style.bookListContainer}>
      <div className={Style.bookListHeading}>
        <h1>
          Wishlist{" "}
          <span>({booklist && booklist.length > 1 ? "items" : "item"})</span>
        </h1>
      </div>

      <div className={Style.books}>
        {booklist && booklist.map((book) => (
          <Item
            book={book}
            addBookToCart={addBookToCart}
            deleteItem={deleteItem}
          />
        ))}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (book) => dispatch(addToCart(book)),
    removeFromWishlist: (id) => dispatch(removeFromWishlist(id)),
  };
};

export default connect(null, mapDispatchToProps)(SelectedWishlist);
