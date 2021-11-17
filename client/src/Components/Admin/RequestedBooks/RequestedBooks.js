import React from "react";
import { Table } from "react-bootstrap";
import { VscTrash } from "react-icons/vsc";
import styles from "./RequestedBooks.module.css";
import swal from "sweetalert";
import { connect } from "react-redux";
import loadingImg from "../../../Assets/Admin/loading.gif";
import { deleteRequestedBook } from "../../../Actions/Admin/RequestedBooksActions";

const RequestedBooks = ({ data, loading, deleteRequestedBook }) => {
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
        flag = deleteRequestedBook(id);
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
    <>
      {loading ? (
        <div className="text-center">
          <img src={loadingImg} style={{ width: "100px" }} />
        </div>
      ) : (
        <div className="p-4 mr-md-4 bg-white">
          <div className="d-flex flex-md-row flex-column justify-content-between align-items-center pb-3">
            <div className="">
              <h4>ALL REQUESTED BOOKS</h4>
            </div>
            <div className="d-flex flex-md-row flex-column justify-content-between align-items-center pb-md-0 pb-3"></div>
          </div>
          <div className="table-responsive">
            <Table bordered striped hover className="text-center">
              <thead>
                <tr>
                  <th>
                    <b>#</b>
                  </th>
                  <th>Name</th>
                  <th>Author</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, i) => (
                  <tr key={i}>
                    <td className="text-left">
                      <b>{i + 1}</b>
                    </td>
                    <td className="text-left">{item.name}</td>
                    <td>{item.author}</td>
                    <td>{item.phone}</td>
                    <td>
                      <span
                        className={styles.icons}
                        onClick={() => deleteHandeler(item._id, item.name)}
                      >
                        <VscTrash />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {data.length === 0 && (
              <div className="alert alert-danger text-center">No Books</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.auth_requested.requested_books,
  loading: state.auth_requested.loading,
});

export default connect(mapStateToProps, { deleteRequestedBook })(
  RequestedBooks
);
