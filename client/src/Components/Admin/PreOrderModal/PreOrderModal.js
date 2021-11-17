import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";
import {
  preOrderAdd,
  preOrderEdit,
  preOrderModalToggleAction,
} from "../../../Actions/Admin/PreOrderActions";
import styles from "./PreOrderModal.module.css";

const PreOrderModal = ({
  preOrderModalToggleAction,
  preOrderAdd,
  open,
  book,
  data,
  preOrderEdit,
}) => {
  const [selectedBook, setSelectedBook] = useState(book ? book : {});
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    if (book) {
      setSelectedBook(book);
    }
  }, [book]);

  const onSubmitHandeler = (e) => {
    e.preventDefault();
    if (book) {
      //Edit BOOK SUBMIT ACTION CALL
      preOrderEdit(book._id, selectedBook._id);
      swal("Book Modified!", "", "success");
      handleClose();
    } else {
      if (selectedBook._id) {
        //ADD BOOK SUBMIT ACTION CALL
        preOrderAdd(selectedBook._id);
        //console.log(selectedBook);
        swal("Book Added!", "", "success");
        handleClose();
      } else {
        swal("Please select a book", "", "info");
      }
    }
  };

  const onChangeHandeler = (text) => {
    setSearch(text);
    if (text) {
      setList(
        data.filter(
          (item) => item.title.toLowerCase().indexOf(text.toLowerCase()) !== -1
        )
      );
    } else {
      setList([]);
    }
  };

  const selectItem = (id) => {
    setSelectedBook(...data.filter((item) => item._id === id));
    setList([]);
    setSearch(data.filter((item) => item._id === id)[0].title);
  };

  const handleClose = () => {
    preOrderModalToggleAction();
    setSelectedBook({});
    setSearch("");
  };

  return (
    <Modal onHide={handleClose} show={open} backdrop="static" keyboard={false}>
      <Modal.Header className={`${styles.heading}`} closeButton>
        <Modal.Title>Add New Book In This List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={(e) => onSubmitHandeler(e)}>
          <label htmlFor="search">Search by Title</label>
          <input
            type="text"
            value={search}
            onChange={(e) => onChangeHandeler(e.target.value)}
            id="search"
            className="form-control"
          />
          <div className="list-group">
            {list.map((item) => (
              <div key={item._id} className={`${styles.item} list-group-item`}>
                <span onClick={() => selectItem(item._id)}>{item.title}</span>
              </div>
            ))}
          </div>
          {!selectedBook ? null : (
            <div className="py-3">
              <span className="d-block">What we find from your search</span>
              <div className={`${styles.item__wrapper} mt-2`}>
                <div className={styles.key}>Name</div>
                <div className={styles.value}>{selectedBook.title}</div>
              </div>
              <div className={`${styles.item__wrapper} mt-2`}>
                <div className={styles.key}>Author</div>
                <div className={styles.value}>{selectedBook.author}</div>
              </div>
              <div className={`${styles.item__wrapper} mt-2`}>
                <div className={styles.key}>Publisher</div>
                <div className={styles.value}>{selectedBook.publisher}</div>
              </div>
            </div>
          )}
          <div className="py-3">
            <span className="d-block">Uploaded To</span>
            <div className={`${styles.item__wrapper} mt-2`}>
              <div className={styles.key}>Category</div>
              <div className={styles.value}>On Pre-Order</div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-3 btn-block">
            Save
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  open: state.admin_book_page.pre_order_modal,
  book: state.admin_book_page.pre_order_book,
  data: state.admin_book_page.books,
});

export default connect(mapStateToProps, {
  preOrderModalToggleAction,
  preOrderAdd,
  preOrderEdit,
})(PreOrderModal);
