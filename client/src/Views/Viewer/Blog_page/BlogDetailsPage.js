import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// Styles
import Style from "../../../Components/Viewer/Blog/BlogDetailPage.module.css";
// Components
import { Footer } from "../../../Components/Viewer/Footer";
import { Nav1 } from "../../../Components/Viewer/Navbar";
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

function BlogDetailsPage() {
  const location = useLocation();
  const [blog, setBlog] = useState({});
  const [blogDate, setBlogDate] = useState({});
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString) => {
    let fdate = Date.parse(dateString);
    fdate = new Date(fdate);

    const dd = fdate.getDate();
    const mm = months[fdate.getMonth()];
    const yy = fdate.getYear();

    setBlogDate({ day: dd, month: mm, year: yy });
  };

  useEffect(() => {
    const id = location.pathname.split("/")[2];
    setLoading(true);
    axios
      .get(`${BASE_URL}/api/admin/blog/${id}`)
      .then((res) => {
        // 1. formate date
        formatDate(res.data.date);
        setBlog(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Nav1 />
      <div className={Style.BlogDetailPageContainer}>
        <div className={Style.imageBlock}>
          <img src={`${BASE_URL}/${blog.image}`} alt="" />
        </div>

        <div className={Style.headingBlock}>
          <h1>{blog.title}</h1>
          <p>
            {blogDate.dd} {blogDate.mm} {blogDate.yy}
          </p>
        </div>

        <div className={Style.contentBlock}>
          <MDEditor.Markdown source={blog.short_description} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BlogDetailsPage;
