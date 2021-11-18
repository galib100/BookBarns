import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Style from "./Contact.module.css";

// ICONS
import { FaPhone } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FiInstagram } from "react-icons/fi";

//Faorms
import swal from "sweetalert";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Form as BootstrapForm, InputGroup } from "react-bootstrap";
import axios from "axios";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [loading, setLoading] = useState(false);
  const initVals = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const submitHandeler = async (values, { resetForm }) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append(
      "message",
      `Subject:${values.subject} || Message: ${values.message} `
    );

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      await axios.post(`https://formspree.io/f/mjvjlezz`, formData, config);
      swal("Success!", "Message Droped", "success");
      resetForm(initVals);
    } catch (err) {
      swal("Error!", "Something went wrong", "error");
    }
    setLoading(false);
  };

  const ContactSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    email: Yup.string().required("Email is required!"),
    subject: Yup.string().required("Subject is required!"),
    message: Yup.string().required("Message is required!"),
  });

  return (
    <div className={Style.networkContainer}>
      <h1>Explore Our Networks</h1>

      <div className={Style.networks}>
        <div className={Style.networks__name}>
          {/* location name - 1 */}
          <div className={Style.network}>
            <h3>Padma Super Market</h3>
            <p>
              26, Padma Super Market, Road-01, Padma Residential Area, Rajshahi.{" "}
            </p>
          </div>
          {/* location name - 2 */}
          <div className={Style.network}>
            <h3>RUET</h3>
            <p>Talaimari, Rajshahi-6204, Bangladesh.</p>
          </div>
        </div>
        <div className={Style.networks__location}>
          <iframe
            src="https://www.google.com.qa/maps/d/u/0/embed?mid=1owrBWxfnUjYzkAg6uJXtkiJYNRrK6IQh"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </div>

      <div className={Style.getInTouchCont}>
        <h1>Get In Touch</h1>
        <p>
          Integer hendrerit libero turpis, nec gravida lectus scelerisque nec.{" "}
        </p>
        <div className={Style.contactBlock}>
          <div className={Style.leftBlock}>
            <Formik
              initialValues={initVals}
              validationSchema={ContactSchema}
              onSubmit={submitHandeler}
              enableReinitialize={true}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className={Style.inputWrapper}>
                    <div className={Style.contFormContainer}>
                      <InputGroup className="mb-3 d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center">
                          <label htmlFor="name" className="d-block">
                            Name
                          </label>
                          {errors.name && touched.name ? (
                            <small className="text-danger">{errors.name}</small>
                          ) : null}
                        </div>
                        <Field
                          as={BootstrapForm.Control}
                          placeholder="Name"
                          name="name"
                          isValid={!errors.name && touched.name}
                          type="text"
                          className={` w-100`}
                          isInvalid={errors.name && touched.name}
                        />
                      </InputGroup>
                    </div>
                    <div className={Style.contFormContainer}>
                      <InputGroup className="mb-3 d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center">
                          <label htmlFor="email" className="d-block">
                            Email
                          </label>
                          {errors.email && touched.email ? (
                            <small className="text-danger">
                              {errors.email}
                            </small>
                          ) : null}
                        </div>
                        <Field
                          as={BootstrapForm.Control}
                          placeholder="Your Email"
                          name="email"
                          isValid={!errors.email && touched.email}
                          type="email"
                          className={` w-100`}
                          isInvalid={errors.email && touched.email}
                        />
                      </InputGroup>
                    </div>
                  </div>

                  <div
                    className={Style.contFormContainer}
                    style={{ width: "100%", marginTop: "20px" }}
                  >
                    <InputGroup className="mb-3 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="subject" className="d-block">
                          Subject
                        </label>
                        {errors.subject && touched.subject ? (
                          <small className="text-danger">
                            {errors.subject}
                          </small>
                        ) : null}
                      </div>
                      <Field
                        as={BootstrapForm.Control}
                        placeholder="Your Subject"
                        name="subject"
                        isValid={!errors.subject && touched.subject}
                        type="text"
                        className={` w-100`}
                        isInvalid={errors.subject && touched.subject}
                      />
                    </InputGroup>
                  </div>

                  <div
                    className={Style.contFormContainer}
                    style={{ width: "100%", marginTop: "20px" }}
                  >
                    <InputGroup className="mb-3 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="message" className="d-block">
                          Short Description
                        </label>
                        {errors.message && touched.message ? (
                          <small className="text-danger">
                            {errors.message}
                          </small>
                        ) : null}
                      </div>
                      <Field
                        as="textarea"
                        rows={10}
                        cols={30}
                        placeholder="Your Message"
                        id="message"
                        name="message"
                        className={` form-control w-100`}
                      />
                    </InputGroup>
                  </div>
                  <button
                    disabled={loading}
                    className="primary__btn"
                    type="submit"
                  >
                    {loading ? "Submitting" : "Submit"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          <div className={Style.rightBlock}>
            {/* 1 */}
            <div className={Style.contactInfo}>
              <div className={Style.logo}>
                <div>
                  <FaPhone />
                </div>
              </div>
              <div className={Style.text}>
                <h4>+880 1624678366</h4>
                <p>Call Us Now</p>
              </div>
            </div>
            {/* 2 */}
            <div className={Style.contactInfo}>
              <div className={Style.logo}>
                <div>
                  <FaFacebookF />
                </div>
              </div>
              <a
                href="https://www.facebook.com/BookBarns.Books/"
                target="_blank"
                className={Style.text}
              >
                <h4>facebook.com/BookBarns.Books</h4>
                <p>Facebook</p>
              </a>
            </div>
            {/* 3 */}
            <div className={Style.contactInfo}>
              <div className={Style.logo}>
                <div>
                  <SiGmail />
                </div>
              </div>
              <div className={Style.text}>
                <h4>connect.BookBarnsbooks@gmail.com</h4>
                <p>Gmail</p>
              </div>
            </div>
            {/* 4 */}
            <div className={Style.contactInfo}>
              <div className={Style.logo}>
                <div>
                  <FiInstagram />
                </div>
              </div>
              <a
                href="https://www.instagram.com/BookBarns.books/"
                target="_blank"
                className={Style.text}
              >
                <h4>BookBarns.books</h4>
                <p>Instagram</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
