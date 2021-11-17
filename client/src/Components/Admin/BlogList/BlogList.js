import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { VscTrash } from "react-icons/vsc";
import styles from "./BlogList.module.css";
import {
  blogEditModalToggleAction,
  deleteBlog,
} from "../../../Actions/Admin/BlogActions";
import { connect } from "react-redux";
import loadingImg from "../../../Assets/Admin/loading.gif";
import { BASE_URL } from "../../../Constants/URL";
import Moment from "react-moment";
import swal from "sweetalert";

const BlogList = ({
  data,
  loading,
  deleteBlog,
  blogEditModalToggleAction,
  edit_modal,
}) => {
  const [bookList, setbookList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!loading) {
      setbookList(data);
    }
  }, [data, edit_modal]);

  const searchHandeler = (text) => {
    if (text !== "") {
      setbookList(
        data.filter((item) => {
          return item.title.toLowerCase().includes(text.toLowerCase());
        })
      );
    } else {
      setbookList(data);
    }
    setSearchText(text);
  };

  const deleteHandeler = (id, title) => {
    swal({
      title: "Are you sure you want to Delete?",
      text: `Book : ${title}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        //DELETE ACTION OF THE BOOK USING ID
        let flag = false;
        flag = deleteBlog(id);
        if (flag) {
          swal("Book has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Something Went Wrong", {
            icon: "warning",
          });
        }
      }
    });
  };

  return (
    <div className="p-4 mr-md-4 bg-white">
      <div className="d-flex flex-md-row flex-column justify-content-between align-items-center pb-3">
        <div className="">
          <h4>All Blogs</h4>
        </div>

        <div className="d-flex flex-md-row flex-column justify-content-between align-items-center pb-md-0 pb-3">
          <div className={`${styles.search__wrapper} mb-md-0 mb-3`}>
            <BsSearch />{" "}
            <input
              type="text"
              placeholder="Search"
              className={styles.search}
              value={searchText}
              onChange={(e) => searchHandeler(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="table-responsive">
        {loading ? (
          <div className="text-center">
            <img src={loadingImg} style={{ width: "100px" }} />
          </div>
        ) : (
          <Table bordered striped hover className="text-center">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Short Description</th>
                <th>Publishing Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookList.map((item) => (
                <tr key={item._id}>
                  <td className="text-left">
                    <img
                      src={`${BASE_URL}/${item.image}`}
                      style={{ maxHeight: "40px" }}
                      alt={item.title}
                    />
                  </td>
                  <td>
                    <Link to={`/admin/blog/${item._id}`}>{item.title}</Link>
                  </td>
                  <td>{item.short_description.substring(0, 30)}</td>
                  <td>
                    <Moment fromNow ago>
                      {item.date}
                    </Moment>{" "}
                    ago
                  </td>
                  <td>
                    <span
                      className={styles.icons}
                      onClick={() => blogEditModalToggleAction(item._id)}
                    >
                      <FaRegEdit />
                    </span>
                    <span
                      className={styles.icons}
                      onClick={() => deleteHandeler(item._id, item.title)}
                    >
                      <VscTrash />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {bookList.length === 0 && (
          <div className="alert alert-danger text-center">No Blogs</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.admin_blog_page.blogs,
  loading: state.admin_blog_page.loading,
  edit_modal: state.admin_blog_page.edit_modal,
});

export default connect(mapStateToProps, {
  deleteBlog,
  blogEditModalToggleAction,
})(BlogList);
