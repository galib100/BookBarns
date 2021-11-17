import React from "react";
import { Helmet } from "react-helmet";
import About from "../../../Components/Viewer/AboutUs/About";

const About_us = () => {
  return (
    <div>
      <Helmet>
        <title>Obosor</title>
        <meta name="desciption" content="Online book shop" />
      </Helmet>
      <About />
    </div>
  );
};

export default About_us ;
