import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Nav1 } from "../Navbar/";
import { Footer } from "../Footer";

// STYLES & ASSERS
import Style from "./About.module.css";
import oboshorlogo from "../../../Assets/Viewer/About/Obosor.jpg";
import offer from "../../../Assets/Viewer/About/offer.png";
import cashOnDeliver from "../../../Assets/Viewer/About/cash-on-delivery.png";
import group from "../../../Assets/Viewer/About/Group 843.png";
import process from "../../../Assets/Viewer/About/process.png";
import shipped from "../../../Assets/Viewer/About/shipped.png";
import test10 from "../../../Assets/Viewer/About/testomonials/10.jpg";
import test11 from "../../../Assets/Viewer/About/testomonials/11.jpg";
import test12 from "../../../Assets/Viewer/About/testomonials/12.jpg";
import { BsArrowRight } from "react-icons/bs";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <Nav1 />
      <div className={Style.profileContainer}>
        {/* ====================== Story ====================== */}
        <div className={Style.story}>
          <div className={Style.story__image}>
            <img src={oboshorlogo} alt="Oboshor" />
          </div>
          <div className={Style.story__text}>
            <h3>Our Story</h3>
            <p>
              Obosor is a community-based book shop founded by a group of
              enthusiasts from RUET, which won the Bangabandhu Innovation Grant
              2019.
            </p>
            <p>
              Obosor started its journey from the green campus of RUET in 2018.
              Since its establishment, Obosor has been trying to deliver
              happiness packed in books. With the progression of time, Obosor
              has expanded its service all over the country and has already
              served thousands of book lovers.
            </p>
            <p>
              Through creating university and campus-based student community
              networks, Obosor aims to promote reading and create readers who
              will lead Bangladesh in the future with their knowledge and
              creativity.
            </p>
            <Link to="/">
              Social Media{" "}
              <span>
                <BsArrowRight />
              </span>
            </Link>
          </div>
        </div>

        {/* ====================== OFFERS ====================== */}
        <div className={Style.offer}>
          <h3>What we offer</h3>
          <div className={Style.allOffers}>
            {/* 1 */}
            <div className={Style.aOffer}>
              <div className={Style.aoffer__logo}>
                <img src={offer} alt="" />
              </div>
              <div className={Style.aoffer__text}>
                <h4>Reasonable Price</h4>
                <p>
                  We offer all of your favorite books at a very reasonable
                  price.
                </p>
              </div>
            </div>
            {/* 2 */}
            <div className={Style.aOffer}>
              <div className={Style.aoffer__logo}>
                <img src={group} alt="" />
              </div>
              <div className={Style.aoffer__text}>
                <h4>Online Payment</h4>
                <p>
                  Those who prefer contactless payment can pay online with
                  exciting deals.
                </p>
              </div>
            </div>
            {/* 3 */}
            <div className={Style.aOffer}>
              <div className={Style.aoffer__logo}>
                <img src={shipped} alt="" />
              </div>
              <div className={Style.aoffer__text}>
                <h4>Fast Delivery</h4>
                <p>
                  We try to deliver your pack of happiness at the soonest
                  possible time.
                </p>
              </div>
            </div>
            {/* 4 */}
            <div className={Style.aOffer}>
              <div className={Style.aoffer__logo}>
                <img src={process} alt="" />
              </div>
              <div className={Style.aoffer__text}>
                <h4>Customer Support</h4>
                <p>
                  For any queries and help, our customer helpline is always in
                  your service
                </p>
              </div>
            </div>
            {/* 5 */}
            <div className={Style.aOffer}>
              <div className={Style.aoffer__logo}>
                <img src={cashOnDeliver} alt="" />
              </div>
              <div className={Style.aoffer__text}>
                <h4>Cash on Delivery</h4>
                <p>
                  You can enjoy Cash on Delivery in all 64 districts with
                  convenient rates.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ====================== POLICIES ====================== */}
        <div className={Style.ourPolicies}>
          <h3>Our Policies</h3>

          <div className={Style.allPolicies}>
            {/* 1 */}
            <div className={Style.apolicy}>
              <div className={Style.apolicy__numb}>
                <div>01</div>
              </div>
              <div className={Style.apolicy__text}>
                <h4>Legal</h4>
                <p>
                  Obosor operates abiding by all the law and regulations for
                  E-commerce businesses imposed by Ministry of Commerce,
                  Bangladesh. Obosor team doesn’t wish to sell or promote
                  anything that is not supported by the government law of
                  Bangladesh
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className={Style.apolicy}>
              <div className={Style.apolicy__numb}>
                <div>02</div>
              </div>
              <div className={Style.apolicy__text}>
                <h4>Refund Policy</h4>
                <p>
                  Obosor operates abiding by all the law and regulations for
                  E-commerce businesses imposed by Ministry of Commerce,
                  Bangladesh. Obosor team doesn’t wish to sell or promote
                  anything that is not supported by the government law of
                  Bangladesh
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className={Style.apolicy}>
              <div className={Style.apolicy__numb}>
                <div>03</div>
              </div>
              <div className={Style.apolicy__text}>
                <h4>Privacy</h4>
                <p>
                  Obosor doesn’t share your personal data with any third party,
                  your data is only used to fulfill your order.
                </p>
              </div>
            </div>

            {/* 4 */}
            <div className={Style.apolicy}>
              <div className={Style.apolicy__numb}>
                <div>04</div>
              </div>
              <div className={Style.apolicy__text}>
                <h4>Happy Return</h4>
                <p>
                  You can return your order if there’s anything wrong or
                  products gets damaged for any unexpected circumstances. Obosor
                  doesn’t charge customers in such cases
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ====================== SHIPPING MODEL ====================== */}
        <div className={Style.shippingModal}>
          <h3>Shipping Rates</h3>
          <div className={Style.modals}>
            <div className={Style.modal}>
              <h4>Pre-Payment</h4>
              <h2>
                <span>TK</span>50.<span>00</span>
              </h2>
              <p>Inside Dhaka</p>
              <h2>
                <span>TK</span>70.<span>00</span>
              </h2>
              <p>Outside Dhaka</p>
              <Link to="/">Shop Now</Link>
            </div>
            <div className={Style.modal}>
              <h4>Cash on Delivary</h4>
              <h2>
                <span>TK</span>70.<span>00</span>
              </h2>
              <p>Inside Dhaka</p>
              <h2>
                <span>TK</span>100.<span>00</span>
              </h2>
              <p>Outside Dhaka</p>
              <Link to="/">Shop Now</Link>
            </div>
          </div>
        </div>

        {/* ====================== TESTOMONIALS ====================== */}
        <div className={Style.testomonials}>
          <h3>Customer testomonials</h3>
          <p>
            Please take a look below at some of the recent testimonials we have
            received from our customers. We welcome customers feedback to let us
            know how we can improve – please send us details of your experience
            after a happy shopping.
          </p>
          <div className={Style.allTestomonials}>
            <div className={Style.aTesto}>
              <img src={test10} alt="" />
            </div>
            <div className={Style.aTesto}>
              <img src={test11} alt="" />
            </div>
            <div className={Style.aTesto}>
              <img src={test12} alt="" />
            </div>
          </div>
        </div>
      </div>
      {/* footer is here */}
      <Footer />
    </div>
  );
};

export default About;
