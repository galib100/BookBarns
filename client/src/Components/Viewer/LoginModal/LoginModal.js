import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { Form as BootstrapForm, InputGroup } from "react-bootstrap";
import * as Yup from "yup";
import swal from "sweetalert";
import { setUser, clearUser } from "../../../Actions/Viewer/userAction";
import { loginSignupModalToggle } from "../../../Actions/Viewer/LandingPageActions";
import axios from "axios";
import { BASE_URL } from "../../../Constants/URL";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// STYLES
import styles from "./LoginModal.module.css";


const LoginModal = ({ loginSignupModalToggle, open, setUser }) => {
  const [loading, setLoading] = useState(false);
  const [watch, setWatch] = useState(false);
  const [error, setError] = useState("");

  // Control Modal
  const handleClose = () => { loginSignupModalToggle(""); };
  const signupModal = () => { loginSignupModalToggle("signup"); };

   // Set to local storage (temporary)
   const saveToLocalStorage = (user, token) => {
    localStorage.setItem('viewer', JSON.stringify(user));
    localStorage.setItem('viewer_token', token);
  }

  const onSubmitHandeler = (values) => {
    setLoading(true);
    // API CALL
    axios
      .post(`${BASE_URL}/api/login`, values)
      .then((res) => {
        setUser(res.data) // save to redux
        saveToLocalStorage(res.data.currentUser, res.data.token); // save to local storage
        swal("Login Success!", "", "success"); // popup success message
        setLoading(false);
        handleClose();
      })
      .catch(() => {
        setError("Phone number or password is wrong.");
        setLoading(false);
      });
  };

  // MANAGING YUP SCHEMA
  const initVals = { phone: "", password: "" };
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
      className={styles.modal}
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

              <InputGroup className={`${styles.inputGroup} mb-3 d-flex flex-column`}>
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
                  type={watch ? "text" : "password"}
                  className={`${styles.input} w-100`}
                  isInvalid={errors.password && touched.password}
                />
                <span className={styles.watchpass} onClick={() => setWatch(!watch)}>
                  {
                    watch 
                    ? < AiOutlineEye />
                    : < AiOutlineEyeInvisible />
                  }
                </span>
              </InputGroup>

              {/* <div className="text-center py-4">
                <Link
                  to="/"
                  style={{
                    color: "#4E5BFF",
                    fontWeight: "bold",
                  }}
                >
                  Forget Password
                </Link>
              </div> */}
              <small style={{color: "red"}}>{error}</small>
              {
                !loading
                ? <button className={styles.submit} type="submit">Sign in</button>
                : <div className={styles.submit}>Loading ...</div>
              }
            </Form>
          )}
        </Formik>
        <p className={styles.notHaveAccoun}>Need an account?{" "}
          <span onClick={() => signupModal()}>Sign up</span>
        </p>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  open: state.pages.login_signup_modal,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (data) => dispatch(setUser(data)),
    clearUser: (data) => dispatch(clearUser(data)),
    loginSignupModalToggle: (type) => dispatch(loginSignupModalToggle(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
