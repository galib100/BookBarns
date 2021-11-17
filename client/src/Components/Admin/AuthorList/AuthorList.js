import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { VscTrash } from "react-icons/vsc";
import styles from "./AuthorList.module.css";
import { connect } from "react-redux";
import loadingImg from "../../../Assets/Admin/loading.gif";
import swal from "sweetalert";

import { deleteAuthor } from "../../../Actions/Admin/AuthorActions";

const AuthorList = ({ data, loading, deleteAuthor, books }) => {
  const [bookList, setbookList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!loading) {
      setbookList(data);
    }
  }, [data]);

  const searchHandeler = (text) => {
    if (text !== "") {
      setbookList(
        data.filter((item) => {
          return item.author.toLowerCase().includes(text.toLowerCase());
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
      text: `Author : ${title}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        //DELETE ACTION OF THE BOOK USING ID
        let flag = false;
        flag = deleteAuthor(id);
        if (flag) {
          swal("Author has been deleted!", {
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

  const totalBookCount = (item) => {
    let count = 0;
    books
      .filter((bookItem) => bookItem.author === item.author)
      .map((bookFiltered) => (count += bookFiltered.quantity));
    return count;
  };

  return (
    <div className="p-4 mr-md-4 bg-white">
      <div className="d-flex flex-md-row flex-column justify-content-between align-items-center pb-3">
        <div className="">
          <h4>All Authors</h4>
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
                <th>Name</th>
                <th>Total Books</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {bookList.map((item) => (
                <tr key={item._id}>
                  <td>{item.author}</td>
                  <td>{totalBookCount(item)}</td>
                  <td>
                    <span
                      className={styles.icons}
                      onClick={() => deleteHandeler(item._id, item.author)}
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
          <div className="alert alert-danger text-center">No Author</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.auth_author.authors,
  loading: state.auth_author.loading,
  books: state.admin_book_page.books,
});

export default connect(mapStateToProps, {
  deleteAuthor,
})(AuthorList);
