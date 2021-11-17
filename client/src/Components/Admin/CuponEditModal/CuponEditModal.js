import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { Form as BootstrapForm, InputGroup } from "react-bootstrap";
import * as Yup from "yup";
import swal from "sweetalert";
import styles from "./CuponEditModal.module.css";
import {
  editCuponModalToggleAction,
  editCupon,
} from "../../../Actions/Admin/CuponActions";

const CuponEditModal = ({
  editCuponModalToggleAction,
  open,
  editCupon,
  data,
}) => {
  const handleClose = () => {
    editCuponModalToggleAction();
  };

  const onSubmitHandeler = (values) => {
    //Add Category action
    let flag = editCupon(values, data._id);
    if (flag) {
      swal("Coupon Edited!", "", "success");
      editCuponModalToggleAction();
    } else {
      swal("Something Went Wrong", "", "error");
    }
  };
  const initVals = {
    code: data.cuponcode,
    ammount: data.amount,
    type: data.cupontype,
  };

  const SignupSchema = Yup.object().shape({
    code: Yup.string()
      .required("Code is required!")
      .matches(/^[a-zA-Z0-9_-]*$/, "Code can not contain space"),
    type: Yup.string().required("Type is required!"),
    ammount: Yup.number()
      .test("Is positive?", "Please enter valid amount!", (value) => value > 0)
      .required("Amount is required!"),
  });
  return (
    <Modal onHide={handleClose} show={open} backdrop="static" keyboard={false}>
      <Modal.Header className={`${styles.heading}`} closeButton>
        <Modal.Title>Edit Cupon</Modal.Title>
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
                  <label htmlFor="code" className="d-block">
                    Coupon Code
                  </label>
                  {errors.code && touched.code ? (
                    <small className="text-danger">{errors.code}</small>
                  ) : null}
                </div>
                <Field
                  as={BootstrapForm.Control}
                  placeholder="Coupon code"
                  name="code"
                  isValid={!errors.code && touched.code}
                  type="text"
                  className={`${styles.input} w-100`}
                  isInvalid={errors.code && touched.code}
                />
              </InputGroup>

              <InputGroup className="mb-3 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="type" className="d-block">
                    Select Type
                  </label>
                  {errors.type && touched.type ? (
                    <small className="text-danger">{errors.type}</small>
                  ) : null}
                </div>
                <div className="d-flex align-items-center">
                  <Field
                    name="type"
                    isValid={!errors.type && touched.type}
                    type="radio"
                    className={`${styles.input} `}
                    style={{ height: "20px !important" }}
                    value="flat"
                  />
                  <span className="ml-2">Flat</span>
                </div>
                <div className="d-flex align-items-center">
                  <Field
                    name="type"
                    isValid={!errors.type && touched.type}
                    type="radio"
                    className={`${styles.input} `}
                    style={{ height: "20px !important" }}
                    value="percantage"
                  />
                  <span className="ml-2">Percantage</span>
                </div>
              </InputGroup>

              <InputGroup className="mb-3 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="ammount" className="d-block">
                    Discount Amount
                  </label>
                  {errors.ammount && touched.ammount ? (
                    <small className="text-danger">{errors.ammount}</small>
                  ) : null}
                </div>
                <Field
                  as={BootstrapForm.Control}
                  placeholder="Amount"
                  name="ammount"
                  isValid={!errors.ammount && touched.ammount}
                  type="number"
                  className={`${styles.input} w-100`}
                  isInvalid={errors.ammount && touched.ammount}
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
  open: state.auth_cupon.cupon_edit_modal,
  data: state.auth_cupon.selected_cupon,
});

export default connect(mapStateToProps, {
  editCuponModalToggleAction,
  editCupon,
})(CuponEditModal);
