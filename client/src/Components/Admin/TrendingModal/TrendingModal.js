import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";
import { trendingModalToggleAction } from "../../../Actions/Admin/TrendingActions";
import styles from "./TrendingModal.module.css";
import data from "../data/bestSellerBook";

const TrendingModal = ({ trendingModalToggleAction, open, book }) => {
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
      swal("Book Modified!", "", "success");
    } else {
      //ADD BOOK SUBMIT ACTION CALL
      swal("Book Added!", "", "success");
    }
    trendingModalToggleAction();
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
    setSelectedBook(...data.filter((item) => item.id === id));
    setList([]);
  };

  const handleClose = () => {
    trendingModalToggleAction();
    setSelectedBook({});
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
              <div key={item.id} className={`${styles.item} list-group-item`}>
                <span onClick={() => selectItem(item.id)}>{item.title}</span>
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
              <div className={styles.value}>Trending</div>
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
  open: state.admin_page.trending_modal,
  book: state.admin_page.trending_book,
});

export default connect(mapStateToProps, { trendingModalToggleAction })(
  TrendingModal
);
