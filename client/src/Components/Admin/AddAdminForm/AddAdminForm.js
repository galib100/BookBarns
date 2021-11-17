import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { Form as BootstrapForm, InputGroup } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import swal from "sweetalert";
import styles from "./AddAdminForm.module.css";
import { ShadowCard } from "../../shared/ShadowCard";

import data from "../data/admin";
import { addAdmin } from "../../../Actions/Admin/AdminActions";
import { connect } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ReactPasswordToggleIcon from "react-password-toggle-icon";

const AddAdminForm = ({ edit, addAdmin, admins }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);

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

  const resetlHandeler = () => {
    setSelectedFile(undefined);
    setPreview(undefined);
  };

  const onSubmitHandeler = (values) => {
    if (edit === -1) {
      if (!selectedFile) {
        swal("Please select an image", "", "error");
        return;
      }
      let adminCheck =
        admins.filter((admin) => admin.username === values.username).length > 0;
      if (adminCheck) {
        swal("Admin username already exists", "", "error");
        return;
      }

      swal("Success!", "Admin Added", "success");
      addAdmin(values, selectedFile);
    } else {
      swal("Success!", "Admin Modified", "success");
      console.log(values);
    }
  };
  let initVals = {
    username: "",
    role: "",
    password: "",
    password2: "",
    image: "",
  };

  let selectedAdmin = null;
  if (edit !== -1) {
    selectedAdmin = data.filter((item) => item.id == edit)[0];
    if (!selectedAdmin) {
      return <Redirect to="/admin/all-admin" />;
    }
    initVals = {
      username: selectedAdmin.username,
      role: selectedAdmin.role,
      password: selectedAdmin.password,
      password2: selectedAdmin.password,
      image: "",
    };
  }

  const SignupSchema = Yup.object().shape({
    username: Yup.string().required("Username is required!"),
    role: Yup.string()
      .test(
        "Is selected?",
        "Please select a category",
        (value) => value !== "select"
      )
      .required("Role is required!"),
    password: Yup.string()
      .required("Password is required!")
      .min(6, "Password is too short!"),
    password2: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match!")
      .required("Password is required!"),
    image: Yup.string().nullable().notRequired("Image is required!"),
  });
  return (
    <ShadowCard title="Basic information">
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
                placeholder="Give a unique username"
                name="username"
                isValid={!errors.username && touched.username}
                type="text"
                className={`${styles.input} w-100`}
                isInvalid={errors.username && touched.username}
              />
            </InputGroup>

            <InputGroup className="mb-3 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center">
                <label htmlFor="role" className="d-block">
                  Permission Level
                </label>
                {errors.role && touched.role ? (
                  <small className="text-danger">{errors.role}</small>
                ) : null}
              </div>
              <Field
                as="select"
                placeholder="role Name"
                name="role"
                className={`${styles.input} form-control w-100`}
              >
                <option value="select">Select Premission Level</option>

                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
              </Field>
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
                type={isPasswordVisible ? "text" : "password"}
                className={`${styles.input} w-100`}
                isInvalid={errors.password && touched.password}
                style={{ position: "relative" }}
              />
              {!isPasswordVisible ? (
                <AiOutlineEye
                  className={styles.eyeIcon}
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className={styles.eyeIcon}
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              )}
            </InputGroup>
            <InputGroup className="mb-3 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center">
                <label htmlFor="password2" className="d-block">
                  Re-type Password
                </label>
                {errors.password2 && touched.password2 ? (
                  <small className="text-danger">{errors.password2}</small>
                ) : null}
              </div>
              <Field
                as={BootstrapForm.Control}
                placeholder="Re-type to confirm password"
                name="password2"
                isValid={!errors.password2 && touched.password2}
                type={isPasswordVisible2 ? "text" : "password"}
                className={`${styles.input} w-100`}
                isInvalid={errors.password2 && touched.password2}
                style={{ position: "relative" }}
              />
              {!isPasswordVisible2 ? (
                <AiOutlineEye
                  className={styles.eyeIcon}
                  onClick={() => setIsPasswordVisible2(!isPasswordVisible2)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className={styles.eyeIcon}
                  onClick={() => setIsPasswordVisible2(!isPasswordVisible2)}
                />
              )}
            </InputGroup>

            <div className="d-flex flex-md-row flex-column justify-content-between ">
              <div className="">
                <span className="d-block">Admin Image</span>
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
                    Admin Image
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
                      alt="admin"
                      style={{ maxWidth: "400px", maxHeight: "300px" }}
                    />
                  )}
                  {selectedAdmin && !selectedFile && (
                    <img
                      src={selectedAdmin.image}
                      alt="admin"
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
    </ShadowCard>
  );
};
const mapStateToProps = (state) => ({
  admins: state.admin_page.admins,
});

export default connect(mapStateToProps, { addAdmin })(AddAdminForm);
