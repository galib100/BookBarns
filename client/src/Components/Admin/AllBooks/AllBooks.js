import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Table, Form } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { BiFilterAlt } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { VscTrash } from "react-icons/vsc";
import { BsCloudDownload } from "react-icons/bs";
import styles from "./AllBooks.module.css";
import swal from "sweetalert";
import { connect } from "react-redux";
import loadingImg from "../../../Assets/Admin/loading.gif";
import { deleteBook, getBook } from "../../../Actions/Admin/BooksActions";
import axios from "axios";
import { BASE_URL } from "../../../Constants/URL";
const FileDownload = require("js-file-download");

const AllBooks = ({
  data,
  loading,
  deleteBook,
  getBook,
  publishers,
  categories,
  isAdmin,
}) => {
  const [bookList, setbookList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (!loading) {
      setbookList(data);
    }
  }, [data]);

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
        flag = deleteBook(id);
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

  const searchHandeler = (text) => {
    if (text !== "") {
      setbookList(
        data.filter((item) => {
          return (
            item.title.toLowerCase().includes(text.toLowerCase()) ||
            item.author.toLowerCase().includes(text.toLowerCase()) ||
            item.publisher.toLowerCase().includes(text.toLowerCase()) ||
            item.isbn.toLowerCase().includes(text.toLowerCase()) ||
            item.sku.toLowerCase().includes(text.toLowerCase()) ||
            item.category.toLowerCase().includes(text.toLowerCase())
          );
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
      setbookList(bookList.filter((item) => item.publisher === type));
    }
  };
  const changeCatHandeler = (type) => {
    if (type === "all") {
      setbookList(data);
    } else {
      setbookList(bookList.filter((item) => item.category === type));
    }
  };

  const editHandeler = (id) => {
    getBook(id);
    history.push(`/admin/book/${id}`);
  };

  const downloadFunc = async () => {
    let config = { responseType: "blob" };
    const res = await axios.get(`${BASE_URL}/api/admin/allbookcsv`, config);
    if (res.data) {
      let now = Date.now();
      let date = new Date(now).toISOString();
      date = date.split("T")[0];
      FileDownload(res.data, `books_${date}.csv`);
    }
  };

  return (
    <>
      {loading ? (
        <div className="text-center">
          <img src={loadingImg} style={{ width: "100px" }} />
        </div>
      ) : (
        <div className="p-4 mr-md-4 bg-white">
          <div className="">
            <h4>ALL PRODUCTS</h4>
          </div>
          <div className="pb-3">
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
                  onChange={(e) => changeCatHandeler(e.target.value)}
                >
                  <option value="all">Category</option>
                  {categories.map((cat) => (
                    <option value={cat.category} key={cat._id}>
                      {cat.category}
                    </option>
                  ))}
                </Form.Control>
              </div>
              <div
                className={`d-flex justify-content-between align-items-center ${styles.search__wrapper} mb-md-0 mb-3`}
              >
                <AiOutlineUser size={24} />
                <Form.Control
                  as="select"
                  custom
                  className={styles.select}
                  onChange={(e) => changeHandeler(e.target.value)}
                >
                  <option value="all">Publisher</option>
                  {publishers.map((cat) => (
                    <option value={cat.name} key={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </Form.Control>
              </div>
              {isAdmin && (
                <button
                  className={`primary__btn ${styles.new__book} mr-md-3 px-2 mb-2 mb-md-0`}
                  onClick={downloadFunc}
                >
                  <BsCloudDownload />
                  <span className="pl-2">CSV</span>
                </button>
              )}
              <div className="">
                <Link
                  as="button"
                  to="/admin/new"
                  className={` primary__btn px-2 ${styles.new__book}`}
                >
                  Add New Product
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookList
                  .filter((item) => item.deleted !== true)
                  .map((item, i) => (
                    <tr key={i}>
                      <td className="text-left">{item.title}</td>
                      <td>{item.author}</td>
                      <td>{item.category}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <span
                          onClick={() => editHandeler(item._id)}
                          className={styles.icons}
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
            {bookList.length === 0 && (
              <div className="alert alert-danger text-center">No Books</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.admin_book_page.books,
  loading: state.admin_book_page.loading,
  isAdmin: state.auth_admin.admin.role === "admin",
  publishers: state.auth_publisher.publishers,
  categories: state.auth_category.categories,
});

export default connect(mapStateToProps, { deleteBook, getBook })(AllBooks);
