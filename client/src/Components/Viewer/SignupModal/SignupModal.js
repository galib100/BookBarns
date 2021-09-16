import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, Modal, Row } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { Form as BootstrapForm, InputGroup } from "react-bootstrap";
import * as Yup from "yup";
import swal from "sweetalert";
import { loginSignupModalToggle } from "../../../Actions/Viewer/LandingPageActions";
import styles from "./SignupModal.module.css";
import { Link } from "react-router-dom";

const SignupModal = ({ loginSignupModalToggle, open }) => {
  const handleClose = () => {
    loginSignupModalToggle("");
  };

  const signupModal = () => {
    loginSignupModalToggle("login");
  };

  const onSubmitHandeler = (values) => {
    //Blog ACTION CALL
    swal("Sign Up Success!", "", "success");
    console.log(values);
  };

  const initVals = {
    username: "",
    email: "",
    phone: "",
    phone2: "",
    password: "",
    password2: "",
    address: "",
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string().required("Username is required!"),
    email: Yup.string().required("Email is required!"),
    phone: Yup.string().required("Phone number is required!"),
    phone2: Yup.string().required("Alt. Phone number is required!"),
    password: Yup.string().required("Password is required!"),
    password2: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match!")
      .required("Password is required!"),
    address: Yup.string().required("Address is required!"),
  });
  return (
    <Modal
      onHide={handleClose}
      show={open === "signup" ? true : false}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className={`${styles.heading}`} closeButton>
        <Modal.Title>Sign Up</Modal.Title>
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
                  <label htmlFor="username" className="d-block">
                    User name
                  </label>
                  {errors.username && touched.username ? (
                    <small className="text-danger">{errors.username}</small>
                  ) : null}
                </div>
                <Field
                  as={BootstrapForm.Control}
                  placeholder="Username"
                  name="username"
                  isValid={!errors.username && touched.username}
                  type="text"
                  className={`${styles.input} w-100`}
                  isInvalid={errors.username && touched.username}
                />
              </InputGroup>

              <InputGroup className="mb-3 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="email" className="d-block">
                    Email
                  </label>
                  {errors.email && touched.email ? (
                    <small className="text-danger">{errors.email}</small>
                  ) : null}
                </div>
                <Field
                  as={BootstrapForm.Control}
                  placeholder="Email Address"
                  name="email"
                  isValid={!errors.email && touched.email}
                  type="text"
                  className={`${styles.input} w-100`}
                  isInvalid={errors.email && touched.email}
                />
              </InputGroup>

              <Row>
                <Col xs={6}>
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
                      placeholder="Phone number"
                      name="phone"
                      isValid={!errors.phone && touched.phone}
                      type="text"
                      className={`${styles.input} w-100`}
                      isInvalid={errors.phone && touched.phone}
                    />
                  </InputGroup>
                </Col>
                <Col xs={6}>
                  <InputGroup className="mb-3 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center">
                      <label htmlFor="phone2" className="d-block">
                        Alternative Phone No.
                      </label>
                      {errors.phone2 && touched.phone2 ? (
                        <small className="text-danger">{errors.phone2}</small>
                      ) : null}
                    </div>
                    <Field
                      as={BootstrapForm.Control}
                      placeholder="Alternative Phone No."
                      name="phone2"
                      isValid={!errors.phone2 && touched.phone2}
                      type="text"
                      className={`${styles.input} w-100`}
                      isInvalid={errors.phone2 && touched.phone2}
                    />
                  </InputGroup>
                </Col>
              </Row>

              <Row>
                <Col xs={6}>
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
                </Col>
                <Col xs={6}>
                  <InputGroup className="mb-3 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center">
                      <label htmlFor="password2" className="d-block">
                        Confirm Password
                      </label>
                      {errors.password2 && touched.password2 ? (
                        <small className="text-danger">
                          {errors.password2}
                        </small>
                      ) : null}
                    </div>
                    <Field
                      as={BootstrapForm.Control}
                      placeholder="Confirm Password"
                      name="password2"
                      isValid={!errors.password2 && touched.password2}
                      type="password2"
                      className={`${styles.input} w-100`}
                      isInvalid={errors.password2 && touched.password2}
                    />
                  </InputGroup>
                </Col>
              </Row>

              <InputGroup className="mb-3 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="address" className="d-block">
                    Address
                  </label>
                  {errors.address && touched.address ? (
                    <small className="text-danger">{errors.address}</small>
                  ) : null}
                </div>
                <Field
                  as="textarea"
                  name="address"
                  placeholder="Type your full address"
                  style={{ minHeight: "100px" }}
                  className={`${styles.input} form-control w-100`}
                />
              </InputGroup>

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
            Already have an account?{" "}
            <span
              style={{
                color: "#4E5BFF",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => signupModal()}
            >
              Sign in
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

export default connect(mapStateToProps, { loginSignupModalToggle })(
  SignupModal
);
