import React from "react";
import { ObosorBest } from "../../../Components/Viewer/ObosorBest";
import { Nav1 } from "../../../Components/Viewer/Navbar";
import { Footer } from "../../../Components/Viewer/Footer";

const ObosorBestsPage = () => {
  return (
    <div>
      <Nav1 />
      <ObosorBest />
      <Footer />
    </div>
  );
};

export default ObosorBestsPage;
