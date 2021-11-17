import React, { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { Form as BootstrapForm, InputGroup } from "react-bootstrap";
import * as Yup from "yup";
import swal from "sweetalert";
// API
import axios from "axios";
import { BASE_URL } from "../../../Constants/URL";
import styles from "./SignupModal.module.css";

function SignupForm({ loginSignupModalToggle, open, mobileNumber, setUser }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordWatch, setPasswordWatch] = useState(false);
  const [password2Watch, setPassword2Watch] = useState(false);

  const handleClose = () => {
    loginSignupModalToggle("");
  };

  // Set to local storage (temporary)
  const saveToLocalStorage = (user, token) => {
    localStorage.setItem("viewer", JSON.stringify(user));
    localStorage.setItem("viewer_token", token);
  };

  // API CALL
  const onSubmitHandeler = (values) => {
    // validation & get neccessary data
    if (values.password === values.password2) {
      setLoading(true);
      const userData = {
        username: values.username,
        email: values.email,
        phone1: values.phone,
        phone2: values.phone2,
        address: values.address,
        password: values.password,
      };

      // register user
      axios
        .post(`${BASE_URL}/api/signup`, userData)
        .then((res) => {
          // after registration login
          axios
            .post(`${BASE_URL}/api/login`, {
              phone: userData.phone1,
              password: userData.password,
            })
            .then((res) => {
              setUser(res.data); // save to redux
              saveToLocalStorage(res.data.currentUser, res.data.token); // save to local storage
              swal("Register Success!", "", "success"); // popup success message
              setLoading(false);
              handleClose();
            })
            .catch((err) => {
              swal(`Now you can login.`, "", "success"); // popup success message
              setLoading(false);
            });
        })
        .catch((err) => {
          // swal(`Registration failed.`, "", "error"); // popup success message
          console.log(err.message);
          setError("Registration failed, try diffrent number.");
          setLoading(false);
        });
    }
  };

  // FORMIK SCHEMA
  const initVals = {
    username: "",
    email: "",
    phone: mobileNumber,
    phone2: "",
    password: "",
    password2: "",
    address: "",
  };
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(7, "Username must be 7 character long")
      .max(200, "Username must be less than 200 character long")
      .required("Username is required!"),
    email: Yup.string()
      .min(7, "Email must be 7 character long")
      .max(200, "Email must be less than 200 character long")
      .required("Email is required!"),
    phone2: Yup.string().min(11, "Must be 11 character."),
    password: Yup.string()
      .min(7, "Password must be 7 character long")
      .max(1000, "Password must be less than 1000 character long")
      .required("Password is required!"),
    password2: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match!")
      .min(7, "Must be 7 character long")
      .max(1000, "Must be less than 1000 character long")
      .required("Password is required!"),
    address: Yup.string()
      .min(5, "Address must be greater or equal than 5 character long")
      .max(1000, "Address must be less than 1000 character long")
      .required("Address is required!"),
  });

  return (
    <Modal
      onHide={handleClose}
      show={open === "signup" ? true : false}
      backdrop="static"
      keyboard={false}
      className={styles.modal}
    >
      <Modal.Header className={`${styles.heading}`} closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Stepper */}
        <div className={styles.stepperDiv}>
          <div className={`${styles.block}`}>
            <div>1</div>
            <p>Send otp</p>
          </div>
          <div className={`${styles.block}`}>
            <div>2</div>
            <p>Verify otp</p>
          </div>
          <div className={`${styles.block} ${styles.activeBlock}`}>
            <div>3</div>
            <p>Registration</p>
          </div>
        </div>
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
                {errors.username && touched.username ? (
                  <small className="text-danger">{errors.username}</small>
                ) : null}
              </InputGroup>

              <InputGroup className="mb-3 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="email" className="d-block">
                    Email
                  </label>
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
                {errors.email && touched.email ? (
                  <small className="text-danger">{errors.email}</small>
                ) : null}
              </InputGroup>

              <Row>
                <Col xs={6}>
                  <InputGroup className="mb-3 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center">
                      <label htmlFor="phone" className="d-block">
                        Phone
                      </label>
                    </div>
                    <Field
                      as={BootstrapForm.Control}
                      placeholder="Phone number"
                      name="phone"
                      // isValid={!errors.phone && touched.phone}
                      type="text"
                      className={`${styles.input} w-100`}
                      // isInvalid={errors.phone && touched.phone}
                      disabled
                    />
                  </InputGroup>
                </Col>
                <Col xs={6}>
                  <InputGroup className="mb-3 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center">
                      <label htmlFor="phone2" className="d-block">
                        Alternative Phone No.
                      </label>
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
                    {errors.phone2 && touched.phone2 ? (
                      <small className="text-danger">{errors.phone2}</small>
                    ) : null}
                  </InputGroup>
                </Col>
              </Row>

              <Row>
                <Col xs={6}>
                  <InputGroup
                    className="mb-3 d-flex flex-column"
                    style={{ position: "relative" }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <label htmlFor="password" className="d-block">
                        Password
                      </label>
                    </div>
                    <Field
                      as={BootstrapForm.Control}
                      placeholder="Password"
                      name="password"
                      isValid={!errors.password && touched.password}
                      type={passwordWatch ? "text" : "password"}
                      className={`${styles.input} w-100`}
                      isInvalid={errors.password && touched.password}
                    />
                    {errors.password && touched.password ? (
                      <small className="text-danger">{errors.password}</small>
                    ) : null}
                    <div
                      className={styles.passwordWatch}
                      onClick={() => {
                        setPasswordWatch(!passwordWatch);
                      }}
                    >
                      {passwordWatch ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-eye"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-eye-off"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      )}
                    </div>
                  </InputGroup>
                </Col>
                <Col xs={6}>
                  <InputGroup
                    className="mb-3 d-flex flex-column"
                    style={{ position: "relative" }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <label htmlFor="password2" className="d-block">
                        Confirm Password
                      </label>
                    </div>
                    <Field
                      as={BootstrapForm.Control}
                      placeholder="Confirm Password"
                      name="password2"
                      isValid={!errors.password2 && touched.password2}
                      type={password2Watch ? "text" : "password"}
                      className={`${styles.input} w-100`}
                      isInvalid={errors.password2 && touched.password2}
                      id="custom-input"
                    />
                    <div
                      className={styles.passwordWatch}
                      onClick={() => {
                        setPassword2Watch(!password2Watch);
                      }}
                    >
                      {password2Watch ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-eye"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-eye-off"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      )}
                    </div>
                    {errors.password2 && touched.password2 ? (
                      <small className="text-danger">{errors.password2}</small>
                    ) : null}
                  </InputGroup>
                </Col>
              </Row>

              <InputGroup className="mb-3 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="address" className="d-block">
                    Address
                  </label>
                </div>
                <Field
                  as="textarea"
                  name="address"
                  placeholder="Type your full address"
                  style={{ minHeight: "100px" }}
                  className={`${styles.input} form-control w-100`}
                />
                {errors.address && touched.address ? (
                  <small className="text-danger">{errors.address}</small>
                ) : null}
              </InputGroup>
              <small style={{ color: "red" }}>{error}</small>
              {!loading ? (
                <button
                  className={`primary__btn btn-block px-5 py-2 mt-4 w-100 ${styles.submit}`}
                  type="submit"
                >
                  Sign up
                </button>
              ) : (
                <button
                  className={`primary__btn btn-block px-5 py-2 mt-4 w-100 ${styles.submit}`}
                  type="submit"
                >
                  Loading..
                </button>
              )}
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}
export default SignupForm;
