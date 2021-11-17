import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { Form as BootstrapForm, InputGroup } from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";
import * as Yup from "yup";
import swal from "sweetalert";
import {
  addBlog,
  blogModalToggleAction,
} from "../../../Actions/Admin/BlogActions";
import styles from "./BlogModal.module.css";

const BlogModal = ({ blogModalToggleAction, open, addBlog }) => {
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
    setSelectedFile(e.target.files[0]);
  };

  const handleClose = () => {
    setSelectedFile(undefined);
    setPreview(undefined);
    blogModalToggleAction();
  };

  const onSubmitHandeler = (values) => {
    if (!selectedFile) {
      swal("Please Select Image", "", "error");
    } else {
      //Blog ACTION CALL
      let flag = addBlog(values, selectedFile);
      if (flag) {
        swal("Blog Added!", "", "success");
        setSelectedFile(undefined);
        setPreview(undefined);
        blogModalToggleAction();
      } else {
        swal("Error", "", "error");
      }
    }
    //console.log(values);
  };
  const initVals = {
    title: "",
    description: "",
    image: "",
  };

  const SignupSchema = Yup.object().shape({
    title: Yup.string().required("Title is required!"),
    description: Yup.string().required("Description is required!"),
    image: Yup.mixed()
      .nullable()
      .notRequired()
      .test(
        "Is selected?",
        "Please select a Image",
        (value) => selectedFile && selectedFile
      ),
  });
  return (
    <Modal onHide={handleClose} show={open} backdrop="static" keyboard={false}>
      <Modal.Header className={`${styles.heading}`} closeButton>
        <Modal.Title>Add Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initVals}
          validationSchema={SignupSchema}
          onSubmit={(values) => onSubmitHandeler(values)}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form
              className="py-2 pr-3 pr-md-0"
              id="signup__form"
              as={BootstrapForm}
            >
              <InputGroup className="mb-3 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="title" className="d-block">
                    Blog Title
                  </label>
                  {errors.title && touched.title ? (
                    <small className="text-danger">{errors.title}</small>
                  ) : null}
                </div>
                <Field
                  as={BootstrapForm.Control}
                  placeholder="Blog Name*"
                  name="title"
                  isValid={!errors.title && touched.title}
                  type="text"
                  className={`${styles.input} w-100`}
                  isInvalid={errors.title && touched.title}
                />
              </InputGroup>

              <InputGroup className="mb-3 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="description" className="d-block">
                    Short Description
                  </label>
                  {errors.description && touched.description ? (
                    <small className="text-danger">{errors.description}</small>
                  ) : null}
                </div>
                {/* <Field
                  as="textarea"
                  name="description"
                  placeholder="Short Description"
                  style={{ minHeight: "200px" }}
                  className={`${styles.input} form-control w-100`}
                /> */}
                <MDEditor
                  value={values.description}
                  onChange={(e) => {
                    //console.log(e);
                    setFieldValue("description", e);
                  }}
                  name="description"
                />
              </InputGroup>

              <span className="d-block">Book Cover Image</span>
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
                  Blog Cover Image
                </BootstrapForm.File.Label>
                {errors.image && touched.image ? (
                  <small className="text-danger">{errors.image}</small>
                ) : null}
              </BootstrapForm.File>
              <small className="d-block text-sm pt-2">
                16 by 9 ratio is preferable
              </small>
              <div className="text-center py-3">
                {selectedFile && (
                  <img
                    src={preview}
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
  open: state.admin_blog_page.blog_modal,
});

export default connect(mapStateToProps, { blogModalToggleAction, addBlog })(
  BlogModal
);
