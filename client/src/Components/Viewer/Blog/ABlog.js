import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Style from "./Blog.module.css";
import MDEditor from "@uiw/react-md-editor";
import { BASE_URL } from "../../../Constants/URL";

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

function ABlog({ id, banner, title, content, date }) {
  const [formatedDate, setFormatedDate] = useState(false);

  useEffect(() => {
    let fdate = Date.parse(date);
    fdate = new Date(fdate);

    const dd = fdate.getDate();
    const mm = months[fdate.getMonth()];
    const yy = fdate.getYear();

    setFormatedDate({ day: dd, month: mm, year: yy });
  }, []);

  return (
    <div className={Style.ablog}>
      {/* --------- banner ----------- */}
      <div
        className={Style.ablog__banner}
        style={{
          background: `url(${BASE_URL}/${banner}) no-repeat center center / cover`,
        }}
      >
          <img src={`${BASE_URL}/${banner}`} />
      </div>

      {/* --------- content ----------- */}
      <div className={Style.ablog__content}>
        {/* content-date */}
        <div className={Style.content__date}>
          <div className={Style.date__box}>
            <div className={Style.date__day}>{formatedDate.day}</div>
            <div className={Style.date__month}>{formatedDate.month}</div>
          </div>
        </div>
        {/* content-text */}
        <div className={Style.content__text}>
          <Link to={`/blog/${id}`}>{title}</Link>
          <div className={Style.content__info}>
            {/* <MDEditor.Markdown source={content} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ABlog;
