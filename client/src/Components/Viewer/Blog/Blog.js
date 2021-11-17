import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components & Styles
import { Nav1 } from "../Navbar/";
import { Footer } from "../Footer";
import Style from "./Blog.module.css";
import ABlog from "./ABlog";
import { getAdsFrontend } from "../../../Actions/Admin/AdActions";
import { connect } from "react-redux";
import Ad from "./Ad";
import useQuery from "../../../Utils/useQuery";
import { getBlogs } from "../../../Actions/Admin/BlogActions";

const Blog = ({ getAdsFrontend, data, getBlogs, blogs }) => {
  //const [blogs, setblogs] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    // const getBlogItems = async () => {
    //   await axios
    //     .get(`${BASE_URL}/api/admin/blog`)
    //     .then((res) => {
    //       setblogs(res.data);
    //     })
    //     .catch((err) => {
    //       console.log(err.message);
    //     });
    // };
    // getBlogItems();
    getBlogs();
    getAdsFrontend();
  }, []);

  let query = useQuery();

  const pagination = () => {
    let count = blogs.length;
    let elementPagination = [];
    console.log(query.get("page"));

    for (let i = 0; i < count / 5; i++) {
      if (!query.get("page") && i === 0) {
        elementPagination.push(
          <li key={i} class="page-item active">
            <Link class="page-link active" to={`/blog?page=${i + 1}`}>
              {i + 1}
            </Link>
          </li>
        );
      } else if (parseInt(query.get("page")) === i + 1) {
        elementPagination.push(
          <li key={i} class="page-item active">
            <Link class="page-link" to={`/blog?page=${i + 1}`}>
              {i + 1}
            </Link>
          </li>
        );
      } else {
        elementPagination.push(
          <li key={i} class="page-item">
            <Link class="page-link" to={`/blog?page=${i + 1}`}>
              {i + 1}
            </Link>
          </li>
        );
      }
    }
    return elementPagination;
  };

  const blogList = () => {
    if (blogs.length === 0) {
      return;
    }
    let element = [];
    let lowerLimit =
      query.get("page") === null ? 0 : parseInt(query.get("page")) * 5 - 5;
    for (let i = lowerLimit; i < lowerLimit + 5 && i < blogs.length; i++) {
      element.push(
        <ABlog
          key={blogs[i]._id}
          id={blogs[i]._id}
          banner={blogs[i].image}
          title={blogs[i].title}
          content={blogs[i].short_description}
          date={blogs[i].date}
        />
      );
    }

    return element;
  };

  return (
    <div>
      {/* ==================== Navigation =================== */}
      <Nav1 />

      {/* ==================== Top Text =================== */}
      <div className={Style.topText}>
        <Link to="/">Home</Link>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-right"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
        <Link to="/blog">Blog</Link>
      </div>

      <div className={`${Style.contentContainer}`}>
        {/* ==================== BLOG POSTS =================== */}
        <div className={`${Style.blogContainer}`}>
          {blogs !== [] && blogList()}

          {/* {   blogs.map((blog) => (
            <ABlog
              key={blog._id}
              id={blog._id}
              banner={blog.image}
              title={blog.title}
              content={blog.short_description}
              date={blog.date}
            />
          ))} */}
        </div>

        {/* ==================== ADDS =================== */}
        <div className={`${Style.addContainer}`}>
          {/* add - 1 */}
          {/* AD IMPLEMANTATION HERE */}
          {data.map((item) => (
            <Ad key={item._id} {...item} />
          ))}
        </div>
      </div>

      {/* ==================== Pagination =================== */}
      <div className={`${Style.pagination}`}>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            {pagination()}

            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.auth_ad.ads,
  blogs: state.admin_blog_page.blogs,
});

export default connect(mapStateToProps, { getAdsFrontend, getBlogs })(Blog);
