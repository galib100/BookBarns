import React from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { Form as BootstrapForm, InputGroup } from "react-bootstrap";
import * as Yup from "yup";
import swal from "sweetalert";
import styles from "./AuthorAddModal.module.css";
import {
  addAuthor,
  addAuthorModalToggleAction,
} from "../../../Actions/Admin/AuthorActions";

const AuthorAddModal = ({
  addAuthorModalToggleAction,
  open,
  addAuthor,
  data,
}) => {
  const handleClose = () => {
    addAuthorModalToggleAction();
  };

  const onSubmitHandeler = (values) => {
    const check = data.filter((item) => item.author === values.name).length;
    if (check > 0) {
      swal("Author Already Exists", "", "error");
      return;
    }
    //Add Author action
    let flag = addAuthor(values.name);
    if (flag) {
      swal("Author Added!", "", "success");
      addAuthorModalToggleAction();
    } else {
      swal("Something Went Wrong", "", "error");
    }
  };
  const initVals = {
    name: "",
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Author name is required!"),
  });
  return (
    <Modal onHide={handleClose} show={open} backdrop="static" keyboard={false}>
      <Modal.Header className={`${styles.heading}`} closeButton>
        <Modal.Title>Add Author</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initVals}
          validationSchema={SignupSchema}
          onSubmit={(values) => onSubmitHandeler(values)}
        >
          {({ errors, touched }) => (
            <Form
              className="py-2 pr-3 pr-md-0"
              id="signup__form"
              as={BootstrapForm}
            >
              <InputGroup className="mb-3 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="name" className="d-block">
                    Author Name
                  </label>
                  {errors.name && touched.name ? (
                    <small className="text-danger">{errors.name}</small>
                  ) : null}
                </div>
                <Field
                  as={BootstrapForm.Control}
                  placeholder="Name of the Author"
                  name="name"
                  isValid={!errors.name && touched.name}
                  type="text"
                  className={`${styles.input} w-100`}
                  isInvalid={errors.name && touched.name}
                />
              </InputGroup>

              <button
                className={`primary__btn btn-block px-5 py-2 mt-4 ${styles.submit}`}
                type="submit"
              >
                SAVE
              </button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  open: state.auth_author.author_add_modal,
  data: state.auth_author.authors,
});

export default connect(mapStateToProps, {
  addAuthorModalToggleAction,
  addAuthor,
})(AuthorAddModal);
