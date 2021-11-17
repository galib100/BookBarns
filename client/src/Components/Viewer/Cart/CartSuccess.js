import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Nav1 } from "../Navbar/";
import { Footer } from "../Footer";

import Style from "./Cart.module.css";
import successImage from "../../../Assets/Viewer/Cart/confirm.png";

function CartSuccess() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  return (
    <>
      <Nav1 />
      <div className={Style.successCartContainer}>
        <img src={successImage} alt="image" />
        <h3>Order successfully placed!</h3>
        <p>
          Our operator will contact you quickly and confirm your order, thank
          you. <Link to="/profile">Go to profile page</Link> to know the current
          status of your order
        </p>
      </div>
      <Footer />
    </>
  );
}

export default CartSuccess;
