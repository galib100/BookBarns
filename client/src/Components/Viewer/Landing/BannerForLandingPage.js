import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Carousel, Dropdown, Container, Row, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { loginSignupModalToggle } from "../../../Actions/Viewer/LandingPageActions";
// ICONS & STYLE
import { IoMdList } from "react-icons/io";
import Style from "./BannerForLandingPage.module.css";
import axios from "axios";
import { BASE_URL } from "../../../Constants/URL";
// COMPONENTS
import RequestABook from "./RequestABook";
import CategoriesForMobile from "./CategoriesForMobile";
import PublisherForMbile from "./PublisherForMobile";
import rightSideImg from "../../../Assets/Viewer/food.png";

const BannerForLandingPage = ({
  isLogedIn,
  loginSignupModalToggle,
  categoriesOfBooks,
  categeroyLoading,
}) => {
  const [carouselLoading, setCarouselLoading] = useState(false);
  const [showCardForRequest, setShowCardForRequest] = useState(false);
  const [banneradds, setBanneradds] = useState([]);

  // CONTROL MODAL
  const controlModalFunc = () => {
    if (isLogedIn) {
      setShowCardForRequest(true);
    } else {
      loginSignupModalToggle("login");
    }
  };

  // FETCH CAROUSEL
  useEffect(() => {
    setCarouselLoading(true);
    axios
      .get(`${BASE_URL}/api/admin/hero`)
      .then((res) => {
        setBanneradds(res.data);
        setCarouselLoading(false);
      })
      .catch((err) => {
        setCarouselLoading(false);
      });
  }, []);

  return (
    <>
      <Container className={`${Style.bannerContainer}`}>
        <Row className={Style.rowCont}>
          {/* ///////////////////////////////////////////////// */}
          {/* /////////////////// Categories //////////////// */}
          {!categeroyLoading ? (
            <Col xs={3} className={Style.lcategories}>
                <div className={Style.dropDown}>
                  <i className="pr-2 fa-lg"><IoMdList /></i><span>Browse categories</span>
                </div>
                
                <div className={`${Style.scrollablemenu}`}>
                  {categoriesOfBooks &&
                    categoriesOfBooks.map((cata) => {
                      return (
                        <div className={`${Style.dpItem}`}>
                          {/* category name */}
                          <Link to={`/category/${cata.category}`}>
                            <div>{cata.category}</div>
                            <div className={`${Style.logo}`}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-chevron-right"
                              >
                                <polyline points="9 18 15 12 9 6"></polyline>
                              </svg>
                            </div>
                          </Link>
                          {/* sub category name */}
                          <div className={Style.dpItemSubCategory}>
                            {cata.subCategory && cata.subCategory.length > 0
                              ? cata.subCategory.map((subcata) => (
                                  <Link to={`/sub-category/${subcata}`}>
                                    {subcata}
                                  </Link>
                                ))
                              : null}
                          </div>
                        </div>
                      );
                    })}
                </div>
            </Col>
          ) : (
            <Col xs={3} className={Style.lcategories}>
              <Skeleton width={`100%`} height={`520px`} />
            </Col>
          )}

          {/* ///////////////////////////////////////////////// */}
          {/* /////////////////// carousel //////////////// */}
          <Col className={Style.carouselCont}>
            {!carouselLoading ? (
              <Carousel>
                {banneradds.length > 0 &&
                  banneradds.map((add) => (
                    <Carousel.Item interval={2000}>
                      <a
                        href={add.link !== "" ? `${add.link}` : `/`}
                        className={Style.carouselImaageBlock}
                        target="_blank"
                      >
                        <img
                          className="d-block w-100"
                          src={`${BASE_URL}/${add.image}`}
                          alt="First slide"
                        />
                      </a>
                    </Carousel.Item>
                  ))}
              </Carousel>
            ) : (
              <div className={Style.carouselLoading}>
                {window.innerWidth >= 500 ? (
                  <Skeleton width={`100%`} height={`65vh`} />
                ) : (
                  <Skeleton width={`100%`} height={`35vh`} />
                )}
              </div>
            )}
          </Col>

          {/* ///////////////////////////////////////////////// */}
          {/* /////////////////// Cards //////////////// */}
          <Col xs={3} className={Style.trackCardCont}>
            {!carouselLoading ? (
              <Card className={`${Style.trackCard} text-right`}>
                <Card.Img
                  variant="top"
                  src={rightSideImg}
                  className={`${Style.deliverBoyiImg} `}
                />
                <h4>Track You Order</h4>
                <p>FIND YOUR ORDER STATUS</p>
                <button>
                  {isLogedIn ? (
                    <Link to="/profile">Track Now</Link>
                  ) : (
                    <div onClick={() => loginSignupModalToggle("login")}>
                      Track Now
                    </div>
                  )}
                </button>
              </Card>
            ) : (
              <Skeleton
                width={`100%`}
                height={`255px`}
                style={{ marginBottom: "30px" }}
              />
            )}

            {!carouselLoading ? (
              <Card className={`${Style.trackCard} mt-3 pb-4`}>
                <p className={`${Style.simTxt}`}>
                  Can't Find What You Are Looking For ?
                </p>
                <h4> Request A Book </h4>
                <p>ORDER PREFERED BOOKS NOW!</p>
                <button className={`${Style.obtn}`} onClick={controlModalFunc}>
                  Order Now
                </button>
              </Card>
            ) : (
              <Skeleton
                width={`100%`}
                height={`255px`}
                style={{ marginBottom: "30px" }}
              />
            )}
          </Col>
        </Row>
      </Container>

      {showCardForRequest ? (
        <RequestABook setShowCardForRequest={setShowCardForRequest} />
      ) : null}

      {/* ///////////////////////////////////////////////// */}
      {/* /////////////// For mobile devices ///////////// */}
      <CategoriesForMobile bookCategories={categoriesOfBooks} />
      <PublisherForMbile />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogedIn: state.viewer.isLogedIn,
    categoriesOfBooks: state.bookController.categoriesOfBooks,
  };
};

export default connect(mapStateToProps, { loginSignupModalToggle })(
  BannerForLandingPage
);
