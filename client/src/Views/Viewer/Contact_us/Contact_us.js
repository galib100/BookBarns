import React from "react";
import { ContactUs } from "../../../Components/Viewer/ContactUs";
import { Nav1 } from "../../../Components/Viewer/Navbar";
import { Footer } from "../../../Components/Viewer/Footer";

const Contact_us = () => {
  return (
    <div>
      <Nav1 />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Contact_us;
