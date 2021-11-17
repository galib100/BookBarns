import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Form as BootstrapForm, InputGroup } from "react-bootstrap";
import swal from "sweetalert";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  addHeroCarousel,
  editHeroCarousel,
  heroCarouselModalToggleAction,
} from "../../../Actions/Admin/HeroCarouselActions";
import styles from "./HeroCarouselModal.module.css";
import { BASE_URL } from "../../../Constants/URL";

const HeroCarouselModal = ({
  heroCarouselModalToggleAction,
  open,
  book,
  addHeroCarousel,
  editHeroCarousel,
}) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleClose = () => {
    setSelectedFile(undefined);
    setPreview(undefined);
    heroCarouselModalToggleAction();
  };

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const resetlHandeler = () => {
    setSelectedFile(undefined);
    setPreview(undefined);
    handleClose();
  };

  const onSubmitHandeler = (values) => {
    if (book._id) {
      //Carousel EDIT ACTION CALL
      let flag = editHeroCarousel(values, selectedFile, book._id);
      if (flag) {
        swal("Success!", "Carousel Item Modified", "success");
        resetlHandeler();
      } else {
        swal("Error!", "Something went wrong", "error");
      }
    } else {
      //Carousel Add SUBMIT ACTION CALL
      if (selectedFile) {
        addHeroCarousel(values, selectedFile);
        swal("Success!", "Carousel Item Added", "success");

        resetlHandeler();
      } else {
        swal("Error!", "Select an Image", "warning");
      }
    }

    //console.log(values);
  };
  let initCaption = book.link || "";

  const initVals = {
    caption: initCaption,
    image: "",
  };

  const SignupSchema = Yup.object().shape({
    caption: Yup.string().url("Enter valid URL").nullable().notRequired(),
    image: Yup.mixed().nullable().notRequired("Image is required!"),
  });

  return (
    <Modal onHide={handleClose} show={open} backdrop="static" keyboard={false}>
      <Modal.Header className={`${styles.heading}`} closeButton>
        <Modal.Title>Add Item In Carousel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize
          initialValues={initVals}
          validationSchema={SignupSchema}
          onSubmit={(values) => onSubmitHandeler(values)}
        >
          {({ errors, touched }) => (
            <Form
              className={`py-2 pr-3 pr-md-0 ${styles.form}`}
              id="signup__form"
              as={BootstrapForm}
            >
              <InputGroup className="mb-3 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="caption" className="d-block">
                    Link
                  </label>
                  {errors.caption && touched.caption ? (
                    <small className="text-danger">{errors.caption}</small>
                  ) : null}
                </div>
                <Field
                  as={BootstrapForm.Control}
                  placeholder="Link for the Carousel Item"
                  name="caption"
                  isValid={!errors.caption && touched.caption}
                  type="text"
                  className={`${styles.input} w-100`}
                  isInvalid={errors.caption && touched.caption}
                />
              </InputGroup>

              <div className="">
                <div className="">
                  <span className="d-block">Carousel Item </span>
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
                      Carousel Item
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
                      />
                    )}
                    {!selectedFile && book.image && (
                      <img
                        src={`${BASE_URL}/${book.image}`}
                        style={{ maxWidth: "400px", maxHeight: "300px" }}
                      />
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-end align-items-end">
                  <button
                    className={`primary__btn px-5 py-2 mt-3 mr-3 ${styles.submit}`}
                    type="reset"
                    onClick={resetlHandeler}
                  >
                    Cancel
                  </button>
                  <button
                    className={`primary__btn px-5 py-2 mt-3 ${styles.submit}`}
                    type="submit"
                  >
                    SAVE
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  open: state.auth_hero.hero_carousel_modal,
  book: state.auth_hero.hero_carousel_item,
});

export default connect(mapStateToProps, {
  heroCarouselModalToggleAction,
  addHeroCarousel,
  editHeroCarousel,
})(HeroCarouselModal);
