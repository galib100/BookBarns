import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Style from "./BannerForLandingPage.module.css";
import book from "../../../Assets/Viewer/Landing/book.svg";

function CategoriesForMobile({ bookCategories }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fourCat = bookCategories.slice(0, 4);
    setCategories(fourCat);
  }, [bookCategories]);

  return (
    <div className={Style.categoriesCont}>
      <div className={Style.heading}>
        <h3>Categories</h3>
        <Link to="/categories">view all</Link>
      </div>
      <div className={Style.categories}>
        {categories.map((cat) => (
          <div className={Style.category}>
            <div className={Style.category__image}>
              <img src={book} alt="" />
            </div>
            <div className={Style.category__name}>
              <Link to={`/category/${cat.category}`}>
                {cat.category.length > 10
                  ? `${cat.category.slice(0, 9)}..`
                  : cat.category}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesForMobile;
