import React from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import swal from "sweetalert";
import { editOrderStatus } from "../../../Actions/Admin/OrderItemActions";
import { BASE_URL } from "../../../Constants/URL";
import { ShadowCard } from "../../shared/ShadowCard";
import styles from "./OrderInfo.module.css";

const BookList = ({ order, setTotalBook, setTotalBill, editOrderStatus }) => {
  let totalDiscountPrice = 0;
  let totalPrice = 0;
  let book_count = 0;
  const list = order.order.map((item, i) => {
    totalDiscountPrice += item.discounted_price * item.quantity;
    totalPrice += item.book.price * item.quantity;
    book_count += item.quantity;
    return (
      <>
        <Row key={i} className="py-2 px-4">
          <Col xs={2} className="text-center">
            <img
              src={`${BASE_URL}/${item.book.image}`}
              className={styles.book__img}
              alt={item.book.title}
            />
          </Col>
          <Col xs={7} className="d-flex flex-column justify-content-center">
            <span
              className={styles.book_title}
              style={{ fontFamily: "Hind Siliguri" }}
            >
              {item.book.title}
            </span>
            <small>
              <span
                className="d-block text-secondary"
                style={{ fontFamily: "Hind Siliguri" }}
              >
                {item.book.author}
              </span>
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

  const deleteHandeler = () => {
    swal({
      title: "Are you sure you want to Cancel Order?",
      text: `Client : ${order.client.username}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        //DELETE ACTION OF THE BOOK USING ID
        let flag = editOrderStatus("Canceled", order.id);

        if (flag) {
          swal("Order Canceled!", {
            icon: "success",
          });
        } else {
          swal("Something Went Wrong", {
            icon: "warning",
          });
        }
      }
    });
  };

  setTotalBook(book_count);
  setTotalBill(totalDiscountPrice);
  return (
    <ShadowCard>
      <Row className="p-4">
        <Col md={6}>
          <h3>Ordered Books</h3>
        </Col>
        <Col md={6} className="text-right">
          <span className="d-block">
            <span>Sub Total: {order.bookprice}Tk</span>
          </span>
          <span className="d-block">
            <span>Shipping Cost: {order.totalprice - order.bookprice}Tk</span>
          </span>
          {/* <span className="d-block">
            After a discount of total TK.{totalPrice - totalDiscountPrice}
          </span> */}
          <span className="d-block h5">
            {/* {order.totalprice !== order.bookPrice ? (
              <strike className="text-secondary">{`${totalDiscountPrice}Tk.`}</strike>
            ) : (
              `${totalDiscountPrice}Tk.`
            )}{" "} */}
            <span>{order.totalprice && `Total: ${order.totalprice}Tk`}</span>
          </span>
        </Col>
        <Col xs={12} className={styles.border2}></Col>
      </Row>
      {list}

      <div
        id="delete__btn__PDF"
        className="d-flex justify-content-end align-item center p-3"
      >
        <button
          className={styles.cancel}
          id="cancel__btn"
          onClick={() => deleteHandeler()}
        >
          Cancel Order
        </button>
      </div>
    </ShadowCard>
  );
};
const mapStateToProps = (state) => ({
  order: state.admin_orders.selected_order_admin,
});

export default connect(mapStateToProps, { editOrderStatus })(BookList);
