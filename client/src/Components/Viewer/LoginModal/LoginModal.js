import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { Form as BootstrapForm, InputGroup } from "react-bootstrap";
import * as Yup from "yup";
import swal from "sweetalert";
import { loginSignupModalToggle } from "../../../Actions/Viewer/LandingPageActions";
import styles from "./LoginModal.module.css";
import { Link } from "react-router-dom";

const LoginModal = ({ loginSignupModalToggle, open }) => {
  const handleClose = () => {
    loginSignupModalToggle("");
  };

  const signupModal = () => {
    loginSignupModalToggle("signup");
  };

  const onSubmitHandeler = (values) => {
    //Blog ACTION CALL
    swal("Login Success!", "", "success");
    console.log(values);
  };

  const initVals = {
    phone: "",
    password: "",
  };

  const SignupSchema = Yup.object().shape({
    phone: Yup.string().required("Phone number is required!"),
    password: Yup.string().required("Password is required!"),
  });
  return (
    <Modal
      onHide={() => handleClose()}
      show={open === "login" ? true : false}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className={`${styles.heading}`} closeButton>
        <Modal.Title>Sign In</Modal.Title>
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
                  <label htmlFor="phone" className="d-block">
                    Phone
                  </label>
                  {errors.phone && touched.phone ? (
                    <small className="text-danger">{errors.phone}</small>
                  ) : null}
                </div>
                <Field
                  as={BootstrapForm.Control}
                  placeholder="Phone"
                  name="phone"
                  isValid={!errors.phone && touched.phone}
                  type="text"
                  className={`${styles.input} w-100`}
                  isInvalid={errors.phone && touched.phone}
                />
              </InputGroup>

              <InputGroup className="mb-3 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="password" className="d-block">
                    Password
                  </label>
                  {errors.password && touched.password ? (
                    <small className="text-danger">{errors.password}</small>
                  ) : null}
                </div>
                <Field
                  as={BootstrapForm.Control}
                  placeholder="Password"
                  name="password"
                  isValid={!errors.password && touched.password}
                  type="password"
                  className={`${styles.input} w-100`}
                  isInvalid={errors.password && touched.password}
                />
              </InputGroup>

              <div className="text-center py-4">
                <Link
                  to="/"
                  style={{
                    color: "#4E5BFF",
                    fontWeight: "bold",
                  }}
                >
                  Forget Password
                </Link>
              </div>

              <button
                className={`primary__btn btn-block px-5 py-2 mt-4 w-100 ${styles.submit}`}
                type="submit"
              >
                LOGIN
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center lead">
          <span>
            Need an account?{" "}
            <span
              style={{
                color: "#4E5BFF",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => signupModal()}
            >
              Sign up
            </span>
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  open: state.pages.login_signup_modal,
});

export default connect(mapStateToProps, { loginSignupModalToggle })(LoginModal);
