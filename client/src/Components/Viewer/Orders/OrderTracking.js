import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// COMPONENTS
import { Nav1 } from "../Navbar/";
import { Footer } from "../Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../Constants/URL";
import swal from "sweetalert";
// STYLES
import Style from "./Orders.module.css";
// COMPONENTS
import Stepper from "./Stepper";
import OrderTrackingLoading from "./OrderTrackingLoading";

const stepsArray = [
  // "Create your account",
  "Add personal info",
  "Add payment details",
  "Complete registration",
  "Registration complete",
];

function OrderTracking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sorder, setOrder] = useState({});
  const { id } = useParams();

  // SETUP STATUS
  const setupStatus = (status) => {
    if (status === "Placed") {
      setCurrentStep(1);
    } else if (status === "Confirm") {
      setCurrentStep(2);
    } else if (status === "Processing") {
      setCurrentStep(3);
    } else if (status === "Shipped") {
      setCurrentStep(4);
    } else if (status === "Delivered") {
      setCurrentStep(5);
    } else{
      setCurrentStep(-1);
    }
  };

  // FORMAT DATE
  const formatedDate = (date) => {
    let fdate = Date.parse(date);
    fdate = new Date(fdate);

    const dd = fdate.getDate();
    const mm = fdate.getMonth();
    const yy = fdate.getYear() + 1900;

    let formatedDate;

    if (dd < 10) {
      if (mm < 10) {
        formatedDate = `0${dd}-0${mm}-${yy}`;
      } else {
        formatedDate = `0${dd}-${mm}-${yy}`;
      }
    } else {
      if (mm < 10) {
        formatedDate = `${dd}-0${mm}-${yy}`;
      } else {
        formatedDate = `${dd}-${mm}-${yy}`;
      }
    }
    return formatedDate;
  };

  // CALCULATE TOTAL PRICE
  const calculatePrice = (orders) => {
    let totalPrice = 0;
    orders && orders.forEach((order) => {
      let discountPrice =
        order.quantity *
        (order.book.price - (order.book.discount / 100) * order.book.price);
      totalPrice += discountPrice;
    });
    return totalPrice;
  };

  // CALCULATE NUMBER OF BOOKS
  const calculateNoOfBooks = (orders) => {
    let numberOfbooks = 0;
    orders && orders.forEach((order) => {
      numberOfbooks += order.quantity;
    });
    return numberOfbooks;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    // 1. get token from local storage
    const viewer_saved_token = { token: localStorage.getItem("viewer_token") };
    const viewer = JSON.parse(localStorage.getItem("viewer"));
    // 2. check token is varified or session timeout
    axios
      .post(`${BASE_URL}/api/verify-user-token`, viewer_saved_token)
      .then((res) => {
        if (res.data.verified) {
          // 3. setup config and value to send a post request for review
          const config = {
            headers: { "auth-token": viewer_saved_token.token },
          };
          // 4. make a request to fetch order
          axios
            .get(`${BASE_URL}/api/order/${id}`, config)
            .then((res) => {
              // 1. save response data
              setOrder(res.data);
              // 2. setup status
              setupStatus(res.data.status);
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
            });
        } else {
          // 7. If session time out. then swal a message
          swal("Session Timeout", "Please reload and login again.", "error");
          setLoading(false);
        }
      })
      .catch((err) => {
        // 8. if token not varified or session timeout, remove all data from local storage
        localStorage.removeItem("viewer");
        localStorage.removeItem("viewer_token");
        swal("Session Timeout", "Please reload and login again.", "error");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Nav1 />
      {!loading ? (
        <div className={Style.OrderTrackingContainer}>
          {/* /////////////////////////////////////////////////////////// */}
          {/* ====================== Ordered books ====================== */}
          <div className={Style.orders}>
            <h2 className={Style.heading}>Ordered Books</h2>
            <div className={Style.orderList}>
              {sorder.order && sorder.order.map((order) => (
                <div className={Style.book}>
                  <div className={Style.book__image}>
                    <img src={`${BASE_URL}/${order.book.image}`} alt={order.book.title} />
                  </div>
                  <div className={Style.book__desc}>
                    <h3>{order.book.title}</h3>
                    <p>{order.book.author}</p>
                    <p>Quantity: <span>{order.quantity}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* /////////////////////////////////////////////////////////// */}
          {/* ========================= Tracking ========================= */}
          <div className={Style.tracking}>
            <h2 className={Style.heading}>Track Your Order</h2>
            <div className="stepper-container-vertical">
              <Stepper
                direction="vertical"
                currentStepNumber={currentStep}
                steps={stepsArray}
                stepColor="#ee5253"
              />
            </div>
          </div>

          {/* /////////////////////////////////////////////////////////// */}
          {/* ========================= Details ========================= */}
          <div className={Style.details}>
            {/* detail block */}
            <div className={Style.detail}>
              <h2 className={Style.heading}>Order Details</h2>
              <div className={Style.detailContainer}>
                <div className={Style.bookSpecInfo}>
                  <div className={Style.bookSpecInfoName}>Order ID</div>
                  <div className={Style.bookSpecInfoValue}>
                    #{" "}
                    {sorder &&
                      sorder.id &&
                      sorder.id.substring(sorder.id && sorder.id.length - 10)}
                  </div>
                </div>
                <div className={Style.bookSpecInfo}>
                  <div className={Style.bookSpecInfoName}>Status</div>
                  <div className={Style.bookSpecInfoValue}>
                    {sorder && sorder.status}
                  </div>
                </div>
                <div className={Style.bookSpecInfo}>
                  <div className={Style.bookSpecInfoName}>Total Books</div>
                  <div className={Style.bookSpecInfoValue}>
                    {calculateNoOfBooks(sorder.order)}
                  </div>
                </div>
                <div className={Style.bookSpecInfo}>
                  <div className={Style.bookSpecInfoName}>Total Bill</div>
                  <div className={Style.bookSpecInfoValue}>
                    {sorder.totalprice} Tk
                  </div>
                </div>
                <div className={Style.bookSpecInfo}>
                  <div className={Style.bookSpecInfoName}>Ordering Date</div>
                  <div className={Style.bookSpecInfoValue}>
                    {formatedDate(sorder && sorder.date)}
                  </div>
                </div>
                <div className={Style.bookSpecInfo}>
                  <div className={Style.bookSpecInfoName}>Contact No.</div>
                  <div className={Style.bookSpecInfoValue}>
                    {sorder && sorder.phone}
                  </div>
                </div>
                {/* <div className={Style.bookSpecInfo}>
                <div className={Style.bookSpecInfoName}>Alt Contact No.</div>
                <div className={Style.bookSpecInfoValue}>+88-01812-345678</div>
              </div> */}
                <div className={Style.bookSpecInfo}>
                  <div className={Style.bookSpecInfoName}>Shipping Address</div>
                  <div className={Style.bookSpecInfoValue}>
                    {sorder && sorder.address}
                  </div>
                </div>
              </div>
            </div>

            {/* additional block */}
            <div className={Style.additional}>
              <h3>Back To Shop</h3>
              <p>PLACE ANOTHER ORDER NOW!</p>
              <Link to="/">Explore</Link>
            </div>
          </div>

          {/* ====================== Ordered books for mobile ====================== */}
          <div className={`${Style.orders} ${Style.ordersForMobile}`}>
            <h2 className={Style.heading}>Ordered Books</h2>
            <div className={Style.orderList}>
              {sorder.order && sorder.order.map((order) => (
                <div className={Style.book}>
                  <div className={Style.book__image}>
                    <img src={`${BASE_URL}/${order.book.image}`} alt={order.book.title} />
                  </div>
                  <div className={Style.book__desc}>
                    <h3>{order.book.title}</h3>
                    <p>{order.book.author}</p>
                    <p>Quantity: <span>{order.quantity}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : <OrderTrackingLoading />}
      <Footer />
    </>
  );
}

export default OrderTracking;
