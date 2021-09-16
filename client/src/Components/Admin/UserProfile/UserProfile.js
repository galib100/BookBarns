import React, { useState } from "react";
import { Col, Container, Row, Card, CardDeck } from "react-bootstrap";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { connect } from "react-redux";
import StarRatings from "react-star-ratings";
import styles from "./UserProfile.module.css";
import { Link } from "react-router-dom";

const UserProfile = ({ user, loading }) => {
  return (
    <>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.user__info}>
            <Container className="p-md-5 p-3">
              <Row>
                <Col md={4}>
                  <img
                    src={user.image}
                    className="img-fluid rounded-circle p-5"
                    alt="User"
                  />
                </Col>
                <Col
                  md={8}
                  className="d-flex flex-column justify-content-center align-items-start"
                >
                  <h2>{user.name}</h2>
                  <Row className="pt-4 w-100">
                    <Col
                      md={6}
                      className="py-2  d-flex justify-content-start align-items-start"
                    >
                      <div className={styles.icon}>
                        <FaPhoneAlt />
                      </div>{" "}
                      <span>{user.phone}</span>
                    </Col>
                    <Col
                      md={6}
                      className="py-2  d-flex justify-content-start align-items-start"
                    >
                      <div className={styles.icon}>
                        <SiGmail />
                      </div>{" "}
                      <span>{user.email}</span>
                    </Col>
                    <Col
                      md={6}
                      className="py-2  d-flex justify-content-start align-items-start"
                    >
                      <div className={styles.icon}>
                        <FaPhoneAlt />
                      </div>{" "}
                      <span>{user.phone2}</span>
                    </Col>
                    <Col
                      md={6}
                      className="py-2  d-flex justify-content-start align-items-start"
                    >
                      <div className={styles.icon}>
                        <FaMapMarkerAlt />
                      </div>{" "}
                      <span>{user.address}</span>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <h2 className="pt-4">Reviews:</h2>
              <Row as={CardDeck} className="pt-2">
                {user.reviews.map((item) => (
                  <Col md={4} key={item.id} className="container-fluid my-3">
                    <Card className={`${styles.crd} h-100 p-3`}>
                      <div className={`d-flex align-items-center`}>
                        <span className={`${styles.crd__img__section}`}>
                          <img
                            src={item.image}
                            className={`rounded-circle h-100`}
                            alt=""
                          />
                          <span className={`${styles.reviewer} my-auto pr-2`}>
                            {item.name}
                          </span>
                        </span>
                      </div>
                      <div className="">
                        <StarRatings
                          rating={item.star}
                          numberOfStars={5}
                          name="rating"
                          starDimension="20px"
                          starSpacing="0"
                          starRatedColor="#FDBC00"
                        />
                      </div>
                      <span className={`d-block pt-2 ${styles.title}`}>
                        {item.title}
                      </span>
                      <span className={`d-block pt-2 ${styles.description}`}>
                        {item.description}
                      </span>
                      <span className={`d-block ${styles.time}`}>
                        {item.time}
                      </span>
                      <div className="">
                        <span className="pr-3">
                          <AiOutlineLike />
                          {item.like}
                        </span>
                        <span className="">
                          <AiOutlineDislike /> {item.dislike}
                        </span>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
              <div className="text-center pt-5">
                <Link to="/admin/users" className="primary__btn">
                  Go Back
                </Link>
              </div>
            </Container>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user_admin_page.selected_user_profile,
  loading: state.user_admin_page.loading,
});

export default connect(mapStateToProps, {})(UserProfile);
