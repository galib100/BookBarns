import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// COMPONENTS
import { Nav1 } from "../../../Components/Viewer/Navbar/";
import { Footer } from "../../../Components/Viewer/Footer";

// STYLES & ASSETS
import Style from "./Publisher.module.css";
import axios from "axios";
import { BASE_URL } from "../../../Constants/URL";

function Publisher() {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/api/admin/allPublishers`)
      .then((res) => {
        setPublishers(res.data);
        setLoading(false);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Nav1 />
      <div className={Style.publisherContainer}>
        <h1>Publisher</h1>

        <div className={Style.publishers}>
          {publishers.map((pub) => (
            <div className={Style.publisher}>
              <div className={Style.publisher__image}>
                <img src={`${BASE_URL}/${pub.image}`} alt="" />
              </div>
              <Link
                to={`/publisher/${pub.name}`}
                className={Style.publisher__info}
              >
                <h6>{pub.name}</h6>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Publisher;
