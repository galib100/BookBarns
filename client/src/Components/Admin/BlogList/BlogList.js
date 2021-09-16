import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { VscTrash } from "react-icons/vsc";
import styles from "./BlogList.module.css";
import data from "./data";
const BlogList = () => {
  const [bookList, setbookList] = useState(data);
  const [searchText, setSearchText] = useState("");

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
        <Table bordered striped hover className="text-center">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Short Description</th>
              <th>Publishing Date</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {bookList.map((item) => (
              <tr key={item.id}>
                <td className="text-left">
                  <img
                    src={item.image}
                    style={{ maxHeight: "40px" }}
                    alt={item.title}
                  />
                </td>
                <td>
                  <Link to={`/admin/blog/${item.id}`}>{item.title}</Link>
                </td>
                <td>{item.short_description}</td>
                <td>{item.date}</td>
                <td>
                  <span className={styles.icons}>
                    <FaRegEdit />
                  </span>
                  <span className={styles.icons}>
                    <VscTrash />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {bookList.length === 0 && (
          <div className="alert alert-danger text-center">No Blogs</div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
