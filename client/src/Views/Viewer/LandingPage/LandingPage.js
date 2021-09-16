import React from "react";
import { Carousel_sidebar } from "../../../Components/Viewer/Carousel/Carousel_sidebar";
import { Nav1 } from "../../../Components/Viewer/Navbar/";
import { Items } from "../../../Components/Viewer/Items";
import { Footer } from "../../../Components/Viewer/Footer";
const LandingPage = () => {
  return (
    <div>
      <Nav1 />
      <Carousel_sidebar />
      <Items />
      <Footer />
    </div>
  );
};

export default LandingPage;
