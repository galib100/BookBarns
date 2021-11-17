import React, { useEffect } from "react";
import { Nav1 } from "../Navbar/";
import { Footer } from "../Footer";
import Style from "./Cart.module.css";
import errorImage from "../../../Assets/Viewer/Cart/error.png";

function CartFailed({ setOrderStatus }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
  return (
    <>
      <Nav1 />
      <div className={Style.failedCartContainer}>
        <img src={errorImage} alt="image" />
        <h3>Order failed!</h3>
        <p>
          Sorry! We could not take your order due to unwanted problems. Please{" "}
          <span
            onClick={() => {
              setOrderStatus("");
            }}
          >
            Click here
          </span>{" "}
          to go to cart and try again.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default CartFailed;
