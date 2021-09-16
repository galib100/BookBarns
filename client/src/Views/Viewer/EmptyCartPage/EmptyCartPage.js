import React from "react";
import { Empty_Cart } from "../../../Components/Viewer/Empty_Cart";
import { Nav1 } from "../../../Components/Viewer/Navbar";
import { Footer } from "../../../Components/Viewer/Footer";

const EmptyCartPage = () => {
  return (
    <div>
      <Nav1 />
      <Empty_Cart />

      <Footer />
    </div>
  );
};

export default EmptyCartPage;
