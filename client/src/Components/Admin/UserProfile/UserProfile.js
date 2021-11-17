import React from "react";
import { Col, Container, Row, Card, CardDeck } from "react-bootstrap";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { connect } from "react-redux";
import StarRatings from "react-star-ratings";
import styles from "./UserProfile.module.css";
import { Link, Redirect } from "react-router-dom";
import { getUserProfile } from "../../../Actions/Admin/UserProfileActions";
import { BASE_URL } from "../../../Constants/URL";
import Moment from "react-moment";
import loadingImg from "../../../Assets/Admin/loading.gif";

const UserProfile = ({ user, loading, id, getUserProfile, users }) => {
  const getName = (id) => {
    return users.filter((item) => item.id === id)[0].name;
  };
  getUserProfile(id);
  if (!user) {
    return <Redirect to="/admin/users" />;
  }
  return (
    <>
      {loading ? (
        <div className="text-center">
          <img src={loadingImg} alt="profile" style={{ width: "30px" }} />
        </div>
      ) : (
        <div className={styles.wrapper}>
          {
            <div className={styles.user__info}>
              <Container className="p-md-5 p-3">
                <Row>
                  <Col md={4}>
                    <img
                      // src={`${BASE_URL}/${user.image}`}
                      src="data:image/png;base64,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"
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
                    <Col md={4} key={item._id} className="container-fluid my-3">
                      <Card className={`${styles.crd} h-100 p-3`}>
                        <div className={`d-flex align-items-center`}>
                          <span className={`${styles.crd__img__section}`}>
                            <img
                              src={`${BASE_URL}/${user.image}`}
                              className={`rounded-circle h-100`}
                              alt=""
                            />
                            <span className={`${styles.reviewer} my-auto pr-2`}>
                              {getName(item.userId)}
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
                          <Moment fromNow ago>
                            {item.time}
                          </Moment>{" "}
                          ago
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
                  {!loading && user.reviews.length === 0 && (
                    <span className="lead d-block text-center">
                      No Review Available
                    </span>
                  )}
                </Row>
                <div className="text-center pt-5">
                  <Link to="/admin/users" className="primary__btn">
                    Go Back
                  </Link>
                </div>
              </Container>
            </div>
          }
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user_admin_page.selected_user_profile,
  users: state.user_admin_page.users,
  loading: state.user_admin_page.loading,
});

export default connect(mapStateToProps, { getUserProfile })(UserProfile);
