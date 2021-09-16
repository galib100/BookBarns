import React from "react";
import {
  Container,
  Card,
  Form as BootstrapForm,
  InputGroup,
} from "react-bootstrap";
import logoImg from "../../../Assets/Admin/logoOboshor.png";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import swal from "sweetalert";
import styles from "./LoginForm.module.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const onSubmitHandeler = (values) => {
    swal("Success!", "Login Success", "success");
    console.log(values);
  };

  let initVals = {
    username: "",
    password: "",
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string().required("Username is required!"),

    password: Yup.string()
      .required("Password is required!")
      .min(6, "Password is too short!"),
  });
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <img src={logoImg} style={{ width: "200px" }} alt="" />
      <Card className="p-3 mt-4" style={{ minWidth: "400px" }}>
        <Card.Body>
          <h3 className="text-center pb-3" style={{ color: "#52341E" }}>
            Admin Login
          </h3>
          <Formik
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
                    <label htmlFor="username" className="d-block">
                      Username
                    </label>
                    {errors.username && touched.username ? (
                      <small className="text-danger">{errors.username}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Provide your username"
                    name="username"
                    isValid={!errors.username && touched.username}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.username && touched.username}
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
                    placeholder="Create your own password"
                    name="password"
                    isValid={!errors.password && touched.password}
                    type="password"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.password && touched.password}
                  />
                </InputGroup>

                <button
                  className={`primary__btn w-100 py-2 mt-5 ${styles.submit}`}
                  type="submit"
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
      <Link to="/admin/dashboard" className="mt-5">
        <u> Go ot Oboshor home</u>
      </Link>
    </Container>
  );
};

export default LoginForm;
