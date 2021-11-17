import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { BsTrash, BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import Style from "./Cart.module.css";
import { BASE_URL } from "../../../Constants/URL";

function CartBook({ book, increaseItem, decreaseItem, deleteItem }) {
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    setAmount(book.amount);
  });

  const inCreaseBookItem = () => {
    increaseItem(book._id);
  };
  const decreaseBookItem = () => {
    decreaseItem(book._id);
  };
  const removeBookFromCart = () => {
    deleteItem(book._id);
  };

  return (
    <Row className={`${Style.selectedBook} my-2`}>
      {/* image */}
      <Col className={Style.imageContainer}>
        <img src={`${BASE_URL}/${book.image}`} className={`${Style.imgcart}`} />
      </Col>
      {/* name & author */}
      <Col className={Style.infoContainer}>
        <h3> {book.title}</h3>
        <p>{book.author}</p>
        <p className={Style.priceForMobile}>
          <strike>{book.price}Tk</strike>
          {Math.ceil(book.price - (book.price * book.discount) / 100)}Tk
        </p>
        <i className="float-left" onClick={removeBookFromCart}>
          <BsTrash />
        </i>
      </Col>
      {/* button box */}
      <Col className={Style.buttonContainer}>
        <div className={Style.incrementButton}>
          <div onClick={decreaseBookItem}>
            <BiMinus />
          </div>
          <div>{amount}</div>
          <div onClick={inCreaseBookItem}>
            <BsPlus />
          </div>
        </div>
      </Col>
      <Col className={Style.priceContainer}>
        <div>
          <div className={Style.text}>
            <strike>{book.price}Tk</strike>
          </div>
          <div className={Style.textBold}>
            <h5>
              {book.discounttype === "flat" ? (
                <>{book.price - book.discount}Tk </>
              ) : (
                <>
                  {book.price - Math.ceil((book.price * book.discount) / 100)}Tk
                </>
              )}
            </h5>
          </div>
        </div>
      </Col>

      <div className={Style.incBtnForMobile}>
        <div className={Style.buttton} onClick={decreaseBookItem}>
          {" "}
          -{" "}
        </div>
        <div className={Style.buttton}>{amount}</div>
        <div className={Style.buttton} onClick={inCreaseBookItem}>
          {" "}
          +{" "}
        </div>
      </div>
    </Row>
  );
}

export default CartBook;
