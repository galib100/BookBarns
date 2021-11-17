import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import bookImg from "../../../Assets/Admin/Dashboard/open-book.png";
import boxImg from "../../../Assets/Admin/Dashboard/box.png";
import teamImg from "../../../Assets/Admin/Dashboard/team.png";
import { ShadowCard } from "../../shared/ShadowCard";
import styles from "./BookCards.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import kFormat from "../../../Utils/kFormatter";

import loadingImg from "../../../Assets/Admin/loading.gif";

const BookCards = ({ books, orders, users, loading, admin }) => {
  const [bookCount, setBookCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    let bookCountTemp = 0;
    let orderCountTemp = 0;
    books.map((item) => {
      if (item.quantity) {
        bookCountTemp += item.quantity;
      }
    });
    if (books) {
      setBookCount(bookCountTemp);
    }
    if (users) {
      setUserCount(users.length);
    }
    orders.map((item) => {
      if (
        !(
          item.status.toLowerCase() === "delivered" ||
          item.status.toLowerCase() === "canceled"
        )
      ) {
        orderCountTemp += 1;
      }
      return item;
    });
    if (books) {
      setOrderCount(orderCountTemp);
    }
  }, [books, orders]);

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={4}>
          <ShadowCard title="Total Products">
            <div className="d-flex">
              <div className="d-flex justify-content-centet align-items-center">
                <div className={styles.icon2}>
                  <img src={bookImg} className={styles.img} alt="book" />
                </div>
              </div>

              <div className="pl-3">
                <span className={`${styles.card__title} d-block`}>
                  You Have Total
                </span>
                {loading ? (
                  <div className="text-center">
                    <img src={loadingImg} style={{ width: "30px" }} />
                  </div>
                ) : (
                  <span className={`${styles.card__count1} d-block`}>
                    {kFormat(bookCount)}
                  </span>
                )}

                <span className={`${styles.card__text} d-block`}>
                  Products in stock
                </span>
              </div>
            </div>
            <div className="text-right pt-3 pr-2">
              {admin === "admin" && (
                <Link to="/admin/dashboard" className={styles.view__link}>
                  View All
                </Link>
              )}
            </div>
          </ShadowCard>
        </Col>
        <Col md={4}>
          <ShadowCard title="Running Order">
            <div className="d-flex">
              <div className="d-flex justify-content-centet align-items-center">
                <div className={styles.icon}>
                  <img src={boxImg} className={styles.img} alt="box" />
                </div>
              </div>

              <div className="pl-3">
                <span className={`${styles.card__title} d-block`}>
                  You Have Total
                </span>
                {loading ? (
                  <div className="text-center">
                    <img src={loadingImg} style={{ width: "30px" }} />
                  </div>
                ) : (
                  <span className={`${styles.card__count2} d-block`}>
                    {kFormat(orderCount)}
                  </span>
                )}

                <span className={`${styles.card__text} d-block`}>
                  Running Orders
                </span>
              </div>
            </div>
            <div className="text-right pt-3 pr-2">
              {admin === "admin" && (
                <Link to="/admin/orders" className={styles.view__link}>
                  View All
                </Link>
              )}
            </div>
          </ShadowCard>
        </Col>
        <Col md={4}>
          <ShadowCard title="Total Users">
            <div className="d-flex">
              <div className="d-flex justify-content-centet align-items-center">
                <div className={styles.icon3}>
                  <img src={teamImg} className={styles.img} alt="" />
                </div>
              </div>

              <div className="pl-3">
                <span className={`${styles.card__title} d-block`}>
                  You Have Total
                </span>

                {loading ? (
                  <div className="text-center">
                    <img src={loadingImg} style={{ width: "30px" }} />
                  </div>
                ) : (
                  <span className={`${styles.card__count3} d-block`}>
                    {kFormat(userCount)}
                  </span>
                )}

                <span className={`${styles.card__text} d-block`}>
                  Registered Users
                </span>
              </div>
            </div>
            <div className="text-right pt-3 pr-2">
              {admin === "admin" && (
                <Link to="/admin/users" className={styles.view__link}>
                  View All
                </Link>
              )}
            </div>
          </ShadowCard>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  books: state.admin_book_page.books,
  orders: state.admin_orders.orders,
  users: state.user_admin_page.users,
  admin: state.auth_admin.admin.role,
  loading: state.admin_book_page.loading,
});

export default connect(mapStateToProps, null)(BookCards);
