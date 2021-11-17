import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Style from "./BannerForLandingPage.module.css";
import axios from "axios";
import { BASE_URL } from "../../../Constants/URL";

function PublisherForMbile() {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/admin/allPublishers`)
      .then((res) => {
        setPublishers(res.data);
        setLoading(false);
      })
      .catch(() => {});
  }, []);
  return (
    <div className={Style.categoriesCont} style={{ marginTop: "30px" }}>
      <div className={Style.heading}>
        <h3>Publisher</h3>
        <Link to="/publisher">view all</Link>
      </div>
      <div className={Style.categories}>
        {publishers.length > 0 && publishers.slice(0, 4).map((publisher) => (
          <div className={`${Style.category} ${Style.categoryWhite}`}>
            <div className={Style.category__image}>
              <img src={`${BASE_URL}/${publisher.image}`} alt="" />
            </div>
            <div className={Style.category__name}>
              <Link to={`/publisher/${publisher.name}`}>
                {publisher.name.length > 10
                  ? `${publisher.name.slice(0, 9)}..`
                  : publisher.name}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PublisherForMbile;
