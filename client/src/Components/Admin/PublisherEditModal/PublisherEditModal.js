import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";
import {
  editPublisher,
  editPublisherModalToggleAction,
} from "../../../Actions/Admin/PublisherActions";
import styles from "./PublisherEditModal.module.css";
import { Formik, Form, Field } from "formik";
import { Form as BootstrapForm, InputGroup } from "react-bootstrap";
import * as Yup from "yup";
import { BASE_URL } from "../../../Constants/URL";

const PublisherEditModal = ({
  editPublisherModalToggleAction,
  editPublisher,
  open,
  data,
}) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    if (e.target.files[0].size > 2000000) {
      swal("File size is too big", "", "error");
      return;
    }
    setSelectedFile(e.target.files[0]);
  };
  const onSubmitHandeler = (values) => {
    //ADD BOOK SUBMIT ACTION CALL
    let flag = editPublisher(values, selectedFile, data._id);
    //console.log(selectedBook);
    if (flag) {
      swal("Publisher Edited!", "", "success");
      handleClose();
    } else {
      swal("Something went wrong!", "", "error");
    }
  };

  const handleClose = () => {
    setSelectedFile(undefined);
    setPreview(undefined);
    editPublisherModalToggleAction();
  };

  const initVals = {
    name: data.name,
    image: "",
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    image: Yup.mixed().nullable().notRequired(),
  });

  return (
    <Modal onHide={handleClose} show={open} backdrop="static" keyboard={false}>
      <Modal.Header className={`${styles.heading}`} closeButton>
        <Modal.Title>Edit Publisher</Modal.Title>
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
                    Publisher Name
                  </label>
                  {errors.name && touched.name ? (
                    <small className="text-danger">{errors.name}</small>
                  ) : null}
                </div>
                <Field
                  as={BootstrapForm.Control}
                  placeholder=" Name*"
                  name="name"
                  isValid={!errors.name && touched.name}
                  type="text"
                  className={`${styles.input} w-100`}
                  isInvalid={errors.name && touched.name}
                />
              </InputGroup>
              <span className="d-block">Publisher Image</span>
              <BootstrapForm.File id="formcheck-api-custom" custom>
                <Field
                  as={BootstrapForm.File.Input}
                  type="file"
                  name="image"
                  onChange={onSelectFile}
                  style={{ minWidth: "400px" }}
                  isValid={!errors.image && touched.image}
                  isInvalid={errors.image && touched.image}
                />

                <BootstrapForm.File.Label data-browse="Browse">
                  Publisher image
                </BootstrapForm.File.Label>
                {errors.image && touched.image ? (
                  <small className="text-danger">{errors.image}</small>
                ) : null}
              </BootstrapForm.File>
              <small className="d-block text-sm pt-2">
                1:1 ratio is preferable
              </small>
              <div className="text-center py-3">
                {selectedFile && (
                  <img
                    src={preview}
                    style={{ maxWidth: "400px", maxHeight: "300px" }}
                    alt="book cover"
                  />
                )}
                {!selectedFile && (
                  <img
                    src={`${BASE_URL}/${data.image}`}
                    style={{ maxWidth: "400px", maxHeight: "300px" }}
                    alt="book cover"
                  />
                )}
              </div>
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
  open: state.auth_publisher.publisher_edit_modal,
  data: state.auth_publisher.selected_publisher,
});

export default connect(mapStateToProps, {
  editPublisherModalToggleAction,
  editPublisher,
})(PublisherEditModal);
