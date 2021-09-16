import React from "react";
import { ObosorBest } from "../ObosorBest";
import { Nav1 } from "../Navbar";
import { Footer } from "../Footer";
const NewArrivals = () => {
  return (
    <div>
      <Nav1 />
      <ObosorBest title="New Arrivals" />
      <Footer />
    </div>
  );
};

export default NewArrivals;
