import React from "react";
import { Row, Col } from "react-bootstrap";
import { ShadowCard } from "../../shared/ShadowCard";
import styles from "./OrderInfo.module.css";

const BookList = ({ order, setTotalBook, setTotalBill }) => {
  let totalDiscountPrice = 0;
  let totalPrice = 0;
  let book_count = 0;
  const list = order.map((item) => {
    totalDiscountPrice += item.discounted_price;
    totalPrice += item.book.price;
    book_count += item.quantity;
    return (
      <>
        <Row className="py-2 px-4">
          <Col xs={2} className="text-center">
            <img
              src={item.book.image}
              className={styles.book__img}
              alt={item.book.title}
            />
          </Col>
          <Col xs={7} className="d-flex flex-column justify-content-center">
            <span className={styles.book_title}>{item.book.title}</span>
            <small>
              <span className="d-block text-secondary">{item.book.author}</span>
            </small>
            <small>
              <span className="d-block text-secondary">
                Quantity: {item.quantity}
              </span>
            </small>
          </Col>
          <Col
            xs={3}
            className="d-flex flex-column justify-content-center align-items-end"
          >
            <span className="h4 d-block">
              {item.discounted_price.toFixed(0)}
            </span>
            <small>
              <span className="text-secondary d-block">
                {item.book.discount}% OFF
              </span>
            </small>
          </Col>
          <Col xs={12} className={styles.border}></Col>
        </Row>
      </>
    );
  });

  setTotalBook(book_count);
  setTotalBill(totalDiscountPrice);
  return (
    <ShadowCard>
      <Row className="p-4">
        <Col md={6}>
          <h3>Ordered Books</h3>
        </Col>
        <Col md={6} className="text-right">
          <span className="d-block h5">Total: {totalDiscountPrice}Tk.</span>
          <span className="d-block">
            After a discount of total TK.{totalPrice - totalDiscountPrice}
          </span>
        </Col>
        <Col xs={12} className={styles.border2}></Col>
      </Row>
      {list}
      <div className="d-flex justify-content-end align-item center p-3">
        <button className={styles.cancel}>Cancel Order</button>
      </div>
    </ShadowCard>
  );
};

export default BookList;
