import React, { useState } from "react";
import { BASE_URL } from "../../../Constants/URL";
import { BsTrash } from "react-icons/bs";
import Style from "../../../Views/Viewer/Wishlist/Wishlist.module.css";

function Item({ book, addBookToCart, deleteItem }) {

  return (
    <div className={Style.book}>
      {/* image */}
      <div className={Style.book__image}>
        <img src={`${BASE_URL}/${book.image}`} alt="" />
      </div>
      {/* info */}
      <div className={Style.book__info}>
        <h5>{book.title}</h5>
        <p>{book.author}</p>
        <p className={Style.priceForMobile}>
          <strike>{book.price}Tk</strike>{" "}
          {Math.ceil(book.price - (book.price * book.discount) / 100)}Tk
        </p>
        <div className={Style.i}>
          <div
            onClick={() => {
              deleteItem(book._id);
            }}
            style={{ cursor: "pointer" }}
          >
            <BsTrash />
          </div>
          <div
            className={Style.btnForMobileOnly}
            onClick={() => addBookToCart(book)}
          >
            Add to cart
          </div>
        </div>
      </div>

      <div className={Style.book__price}>
        <div>
          <b>Tk. {book.price}</b>
          <strike>Tk. 125</strike>
        </div>
      </div>
      <div className={Style.book__button}>
        <button onClick={() => addBookToCart(book)}>Add to cart</button>
      </div>
    </div>
  );
}

export default Item;
