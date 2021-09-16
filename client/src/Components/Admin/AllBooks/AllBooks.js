import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { BiFilterAlt } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { VscTrash } from "react-icons/vsc";
import styles from "./AllBooks.module.css";
import data from "./data";
import categoryList from "../data/categoryList";
import swal from "sweetalert";
const AllBooks = () => {
  const [bookList, setbookList] = useState(data);
  const [searchText, setSearchText] = useState("");

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

        console.log(id);
        swal("Book has been deleted!", {
          icon: "success",
        });
      }
    });
  };

  const searchHandeler = (text) => {
    if (text !== "") {
      setbookList(
        data.filter((item) => {
          return item.name.toLowerCase().includes(text.toLowerCase());
        })
      );
    } else {
      setbookList(data);
    }
    setSearchText(text);
  };

  const changeHandeler = (type) => {
    if (type === "all") {
      setbookList(data);
    } else {
      setbookList(data.filter((item) => item.category === type));
    }
  };
  return (
    <div className="p-4 mr-md-4 bg-white">
      <div className="d-flex flex-md-row flex-column justify-content-between align-items-center pb-3">
        <div className="">
          <h4>ALL BOOKS</h4>
        </div>
        <div className="d-flex flex-md-row flex-column justify-content-between align-items-center pb-md-0 pb-3">
          <div className={`${styles.search__wrapper} mb-md-0 mb-3`}>
            <BsSearch />{" "}
            <input
              type="text"
              value={searchText}
              onChange={(e) => searchHandeler(e.target.value)}
              placeholder="Search"
              className={styles.search}
            />
          </div>

          <div
            className={`d-flex justify-content-between align-items-center ${styles.search__wrapper} mb-md-0 mb-3`}
          >
            <BiFilterAlt size={24} />
            <Form.Control
              as="select"
              custom
              className={styles.select}
              onChange={(e) => changeHandeler(e.target.value)}
            >
              <option value="all">Filter</option>
              {categoryList.map((cat) => (
                <option value={cat.name} key={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Form.Control>
          </div>
          <div className="">
            <Link
              as="button"
              to="/admin/new"
              className={` primary__btn ${styles.new__book}`}
            >
              Add New Book
            </Link>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <Table bordered striped hover className="text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Category</th>
              <th>Price</th>
              <th>Available Quantity</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {bookList.map((item) => (
              <tr key={item.id}>
                <td className="text-left">{item.name}</td>
                <td>{item.author}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>{item.available}</td>
                <td>
                  <Link to={`/admin/book/${item.id}`} className={styles.icons}>
                    <FaRegEdit />
                  </Link>
                  <span
                    className={styles.icons}
                    onClick={() => deleteHandeler(item.id, item.name)}
                  >
                    <VscTrash />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {bookList.length === 0 && (
          <div className="alert alert-danger text-center">No Books</div>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
