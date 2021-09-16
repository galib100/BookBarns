import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import bookImg from "../../../Assets/Admin/Dashboard/open-book.png";
import boxImg from "../../../Assets/Admin/Dashboard/box.png";
import teamImg from "../../../Assets/Admin/Dashboard/team.png";
import { ShadowCard } from "../../shared/ShadowCard";
import styles from "./BookCards.module.css";
import { Link } from "react-router-dom";

const BookCards = () => {
  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={4}>
          <ShadowCard title="Total Books">
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
                <span className={`${styles.card__count1} d-block`}>2.5K</span>
                <span className={`${styles.card__text} d-block`}>
                  Books in stock
                </span>
              </div>
            </div>
            <div className="text-right pt-3 pr-2">
              <Link to="/admin/dashboard" className={styles.view__link}>
                View All
              </Link>
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
                <span className={`${styles.card__count2} d-block`}>12</span>
                <span className={`${styles.card__text} d-block`}>
                  Running Orders
                </span>
              </div>
            </div>
            <div className="text-right pt-3 pr-2">
              <Link to="/admin/orders" className={styles.view__link}>
                View All
              </Link>
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
                <span className={`${styles.card__count3} d-block`}>1.5K</span>
                <span className={`${styles.card__text} d-block`}>
                  Registered Users
                </span>
              </div>
            </div>
            <div className="text-right pt-3 pr-2">
              <Link to="/admin/users" className={styles.view__link}>
                View All
              </Link>
            </div>
          </ShadowCard>
        </Col>
      </Row>
    </Container>
  );
};

export default BookCards;
