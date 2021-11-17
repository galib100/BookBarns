import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, Container, Modal, Row } from "react-bootstrap";
import swal from "sweetalert";
import { BsTrash, BsPlusCircle } from "react-icons/bs";
import styles from "./CategoryEditModal.module.css";
import {
  editCategoryModalToggleAction,
  editCategory,
} from "../../../Actions/Admin/CategoryActions";

const CategoryEditModal = ({
  open,
  editCategory,
  category,
  editCategoryModalToggleAction,
}) => {
  const [input, setInput] = useState([]);
  useEffect(() => {
    if (category !== {} && open) {
      let list = [];
      category.subcategory.map((item, i) => list.push({ name: item, id: i }));
      setInput(list);
    }
  }, [category]);

  const handleClose = () => {
    editCategoryModalToggleAction();
  };

  const onSubmitHandeler = (e) => {
    e.preventDefault();
    let value = input.map((item) => item.name);

    //EDIT CATEGORY ACTION using finalValues
    let flag = true;
    flag = editCategory(value, category._id);
    if (flag) {
      swal("Category Edited!", "", "success");
      editCategoryModalToggleAction();
    } else {
      swal("Something Went Wrong", "", "error");
    }
  };

  const handelChange = (e, id) => {
    setInput(
      input.map((item) => {
        if (id === item.id) {
          return { id: id, name: e.target.value };
        } else {
          return item;
        }
      })
    );
  };

  const addHandeler = () => {
    setInput([...input, { id: input.length, name: "" }]);
  };

  const deleteHandeler = (id) => {
    setInput([...input.filter((item) => item.id !== id)]);
  };

  return (
    <Modal onHide={handleClose} show={open} backdrop="static" keyboard={false}>
      <Modal.Header className={`${styles.heading}`} closeButton>
        <Modal.Title>{category.category}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <form onSubmit={(e) => onSubmitHandeler(e)}>
            {open &&
              input &&
              input.map((inputText) => (
                <Row className="mt-2" key={inputText.id}>
                  <Col xs={11}>
                    <input
                      key={inputText.id}
                      type="text"
                      value={inputText.name}
                      onChange={(e) => handelChange(e, inputText.id)}
                      className="form-control"
                      required
                    />
                  </Col>
                  <Col
                    xs={1}
                    className="d-flex justify-content-end align-items-center"
                  >
                    <span
                      style={{
                        color: "#dc3545",
                        cursor: "pointer",
                        fontSize: "20px",
                      }}
                      onClick={() => deleteHandeler(inputText.id)}
                    >
                      <BsTrash />
                    </span>
                  </Col>
                </Row>
              ))}
            <div className={`text-center pt-4 ${styles.subcat_plus}`}>
              <BsPlusCircle
                onClick={addHandeler}
                style={{ cursor: "pointer" }}
              />{" "}
              <span
                onClick={addHandeler}
                style={{ cursor: "pointer" }}
                className="ml-2"
              >
                Add Subcategory
              </span>
            </div>
            <button
              className={`primary__btn btn-block px-5 py-2 mt-4 ${styles.submit}`}
              type="submit"
            >
              SAVE
            </button>
          </form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  open: state.auth_category.category_edit_modal,
  category: state.auth_category.selected_category,
});

export default connect(mapStateToProps, {
  editCategoryModalToggleAction,
  editCategory,
})(CategoryEditModal);
