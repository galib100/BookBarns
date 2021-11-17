import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Form as BootstrapForm, Row, Col, InputGroup } from "react-bootstrap";
import * as Yup from "yup";
import swal from "sweetalert";
import styles from "./AddBookForm.module.css";
import { ShadowCard } from "../../shared/ShadowCard";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { BASE_URL } from "../../../Constants/URL";
import { addBook, editBook } from "../../../Actions/Admin/BooksActions";
import MDEditor from "@uiw/react-md-editor";

const AddBookForm = ({
  data,
  edit,
  addBook,
  editBook,
  publishers,
  categories,
  authors,
  books,
}) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [subcat, setSubcat] = useState(["First Select a Category"]);

  useEffect(() => {
    const cat = () => {
      if (data.category) {
        subcatHandeler(data.category);
      }
    };
    cat();
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
    let skuCheck = books.filter(
      (item) => item.sku === values.sku && data._id !== item._id
    ).length;

    if (skuCheck > 0) {
      swal("Book with same SKU exists", "Change the SKU", "error");
      return;
    }
    //Book Form SUBMIT ACTION CALL
    if (data._id) {
      let flag = false;
      flag = editBook(values, selectedFile, data._id);
      if (flag) {
        swal("Success!", "Book Modified", "success");
      } else {
        swal("Something Went Wrong!", "Book Modification failed", "error");
      }
    } else {
      let flag = false;
      flag = addBook(values, selectedFile);
      if (flag) {
        swal("Success!", "Book Added", "success");
      } else {
        swal("Something Went Wrong!", "Book Add failed", "error");
      }
    }

    //console.log(selectedFile);
  };

  const subcatHandeler = (id) => {
    if (id === "select") {
      setSubcat(["First Select a Category"]);
    } else {
      setSubcat(
        categories.filter((item) => item.category === id)[0].subcategory
      );
    }
  };

  let initVals = {
    title: "",
    author: "",
    quantity: 0,
    category: "",
    subcategory: "",
    genre: "",
    price: 0,
    discount: 0,
    type: "percantage",
    page: 0,
    publisher: "",
    edition: 1,
    year: 2021,
    description: "",
    image: "",
    isbn: "",
    sku: "",
    quality: "",
    tags: "",
  };

  if (data && edit !== -1) {
    if (!data) {
      return <Redirect to="/admin/add" />;
    }

    initVals = {
      title: data.title,
      author: data.author,
      quantity: parseInt(data.quantity),
      category: data.category,
      subcategory: data.subcategory,
      genre: data.genre,
      price: parseInt(data.price),
      discount: parseInt(data.discount),
      type: data.discounttype,
      page: parseInt(data.pages),
      publisher: data.publisher,
      edition: parseInt(data.edition),
      year: parseInt(data.year),
      description: data.description,
      image: "",
      isbn: data.isbn,
      sku: data.sku,
      quality: data.quality,
      tags: data.tags.join(),
    };
  }

  const SignupSchema = Yup.object().shape({
    title: Yup.string().required("Title is required!"),
    author: Yup.string().required("Author Name is required!"),
    quantity: Yup.number()
      .test("Is positive?", "Quantity >= 0", (value) => value >= 0)
      .required("Quantity is required!"),
    category: Yup.string()
      .test(
        "Is selected?",
        "Please select a category",
        (value) => value !== "select"
      )
      .required("Category is required!"),
    type: Yup.string().required("Discount Type is required!"),
    subcategory: Yup.string()
      .test(
        "Is selected?",
        "Please select a sub category",
        (value) => value !== "select"
      )
      .required("Sub Category is required!"),

    price: Yup.number()
      .test(
        "Is positive?",
        "Price must be greater than 0",
        (value) => value > 0
      )
      .required("Price is required!"),
    discount: Yup.number()
      .test(
        "Is positive?",
        "Discount must be between 0 to 100",
        (value) => value >= 0
      )
      .required("Discount is required!"),
    page: Yup.string()
      .test("Is positive?", "Page must be greater than 0", (value) => value > 0)
      .required("Genre is required!"),

    publisher: Yup.string().required("Publisher is required!"),
    edition: Yup.number()
      .test(
        "Is positive?",
        "Edition must be greater than 0",
        (value) => value > 0
      )
      .required("Edition is required!"),
    year: Yup.number()
      .test(
        "Is positive?",
        "Please enter valid year",
        (value) => value > 1000 && value < 3000
      )
      .required("Year is required!"),
    image: Yup.mixed().notRequired("Image is required!"),
    sku: Yup.string().required("SKU code is required!"),
    quality: Yup.string().required("Quality is required!"),
    tags: Yup.string().required("Tag is required!"),
  });
  return (
    <ShadowCard title="Basic information">
      <Formik
        enableReinitialize
        initialValues={initVals}
        validationSchema={SignupSchema}
        onSubmit={(values) => onSubmitHandeler(values)}
      >
        {({ errors, touched, handleChange, values, setFieldValue }) => (
          <Form
            className={`py-2 pr-3 pr-md-0 ${styles.form}`}
            id="signup__form"
            as={BootstrapForm}
          >
            <InputGroup className="mb-3 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center">
                <label htmlFor="title" className="d-block">
                  Book Title
                </label>
                {errors.title && touched.title ? (
                  <small className="text-danger">{errors.title}</small>
                ) : null}
              </div>
              <Field
                as={BootstrapForm.Control}
                placeholder="Book Name*"
                name="title"
                isValid={!errors.title && touched.title}
                type="text"
                className={`${styles.input} w-100`}
                isInvalid={errors.title && touched.title}
              />
            </InputGroup>
            <Row>
              {/* <Col md={4}>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="author" className="d-block">
                      Author
                    </label>
                    {errors.author && touched.author ? (
                      <small className="text-danger">{errors.author}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Author Name"
                    name="author"
                    isValid={!errors.author && touched.author}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.author && touched.author}
                  />
                </InputGroup>
              </Col> */}
              <Col md={4}>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="author" className="d-block">
                      Author Name
                    </label>
                    {errors.author && touched.author ? (
                      <small className="text-danger">{errors.author}</small>
                    ) : null}
                  </div>
                  <Field
                    as="select"
                    placeholder="author Name"
                    name="author"
                    className={`${styles.input} form-control w-100`}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <option value="select">Select Author</option>
                    {authors.map((item) => (
                      <option key={item._id} value={item.author}>
                        {item.author}
                      </option>
                    ))}
                  </Field>
                </InputGroup>
              </Col>
              <Col md={4}>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="quantity" className="d-block">
                      Available Quantity
                    </label>
                    {errors.quantity && touched.quantity ? (
                      <small className="text-danger">{errors.quantity}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Quantity in Stock"
                    name="quantity"
                    isValid={!errors.quantity && touched.quantity}
                    type="number"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.quantity && touched.quantity}
                  />
                </InputGroup>
              </Col>
              <Col md={4}>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="tags" className="d-block">
                      Tags
                    </label>
                    {errors.tags && touched.tags ? (
                      <small className="text-danger">{errors.tags}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Tag list separeted with comma"
                    name="tags"
                    isValid={!errors.tags && touched.tags}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.tags && touched.tags}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="category" className="d-block">
                      Category
                    </label>
                    {errors.category && touched.category ? (
                      <small className="text-danger">{errors.category}</small>
                    ) : null}
                  </div>
                  <Field
                    as="select"
                    placeholder="category Name"
                    name="category"
                    className={`${styles.input} form-control w-100`}
                    onChange={(e) => {
                      subcatHandeler(e.target.value);
                      handleChange(e);
                    }}
                  >
                    <option value="select">Select Category</option>
                    {categories.map((item) => (
                      <option key={item._id} value={item.category}>
                        {item.category}
                      </option>
                    ))}
                  </Field>
                </InputGroup>
              </Col>
              <Col md={6}>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="subcategory" className="d-block">
                      Sub Category
                    </label>
                    {errors.subcategory && touched.subcategory ? (
                      <small className="text-danger">
                        {errors.subcategory}
                      </small>
                    ) : null}
                  </div>
                  <Field
                    as="select"
                    placeholder="Sub Category Name"
                    name="subcategory"
                    className={`${styles.input} form-control w-100`}
                  >
                    <option value="select">Select Subcategory</option>
                    {subcat.map((item, i) => (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    ))}
                  </Field>
                </InputGroup>
              </Col>
              {/* <Col md={4}>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="genre" className="d-block">
                      Genre
                    </label>
                    {errors.genre && touched.genre ? (
                      <small className="text-danger">{errors.genre}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Genre"
                    name="genre"
                    isValid={!errors.genre && touched.genre}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.genre && touched.genre}
                  />
                </InputGroup>
              </Col> */}
            </Row>
            <Row>
              <Col md={3} xs={6}>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="price" className="d-block">
                      Price
                    </label>
                    {errors.price && touched.price ? (
                      <small className="text-danger">{errors.price}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Price"
                    name="price"
                    isValid={!errors.price && touched.price}
                    type="number"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.price && touched.price}
                  />
                </InputGroup>
              </Col>
              <Col md={3} xs={6}>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="discount" className="d-block">
                      Discount <small>(Amount)</small>
                    </label>
                    {errors.discount && touched.discount ? (
                      <small className="text-danger">{errors.discount}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Discount"
                    name="discount"
                    isValid={!errors.discount && touched.discount}
                    type="number"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.discount && touched.discount}
                  />
                </InputGroup>
              </Col>
              <Col md={3} xs={6}>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="type" className="d-block">
                      Type of Discount
                    </label>
                    {errors.type && touched.type ? (
                      <small className="text-danger">{errors.type}</small>
                    ) : null}
                  </div>
                  <Field
                    as="select"
                    placeholder="Type of discount"
                    name="type"
                    className={`${styles.input} form-control w-100`}
                  >
                    <option value="percantage">Percantage</option>
                    <option value="flat">Flat</option>
                  </Field>
                </InputGroup>
              </Col>
              <Col md={3} xs={6}>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="page" className="d-block">
                      Total pages
                    </label>
                    {errors.page && touched.page ? (
                      <small className="text-danger">{errors.page}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Total pages"
                    name="page"
                    isValid={!errors.page && touched.page}
                    type="number"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.page && touched.page}
                  />
                </InputGroup>
              </Col>
            </Row>

            <Row>
              <Col md={4} xs={6}>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="publisher" className="d-block">
                      Publisher
                    </label>
                    {errors.publisher && touched.publisher ? (
                      <small className="text-danger">{errors.publisher}</small>
                    ) : null}
                  </div>
                  <Field
                    as="select"
                    placeholder="publisher Name"
                    name="publisher"
                    className={`${styles.input} form-control w-100`}
                  >
                    <option value="select">Select publisher</option>
                    {publishers.map((item) => (
                      <option key={item._id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </Field>
                </InputGroup>
              </Col>
              <Col md={4} xs={6}>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="year" className="d-block">
                      Publishing Year
                    </label>
                    {errors.year && touched.year ? (
                      <small className="text-danger">{errors.year}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Publishing Year"
                    name="year"
                    isValid={!errors.year && touched.year}
                    type="number"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.year && touched.year}
                  />
                </InputGroup>
              </Col>
              <Col md={4} xs={6}>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="edition" className="d-block">
                      Edition
                    </label>
                    {errors.edition && touched.edition ? (
                      <small className="text-danger">{errors.edition}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Edition"
                    name="edition"
                    isValid={!errors.edition && touched.edition}
                    type="number"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.edition && touched.edition}
                  />
                </InputGroup>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="isbn" className="d-block">
                      ISBN
                    </label>
                    {errors.isbn && touched.isbn ? (
                      <small className="text-danger">{errors.isbn}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="ISBN number"
                    name="isbn"
                    isValid={!errors.isbn && touched.isbn}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.isbn && touched.isbn}
                  />
                </InputGroup>
              </Col>
              <Col md={4}>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="sku" className="d-block">
                      SKU
                    </label>
                    {errors.sku && touched.sku ? (
                      <small className="text-danger">{errors.sku}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="SKU number"
                    name="sku"
                    isValid={!errors.sku && touched.sku}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.sku && touched.sku}
                  />
                </InputGroup>
              </Col>
              <Col md={4}>
                <InputGroup className="mb-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="quality" className="d-block">
                      Quality
                    </label>
                    {errors.quality && touched.quality ? (
                      <small className="text-danger">{errors.quality}</small>
                    ) : null}
                  </div>
                  <Field
                    as={BootstrapForm.Control}
                    placeholder="Quality"
                    name="quality"
                    isValid={!errors.quality && touched.quality}
                    type="text"
                    className={`${styles.input} w-100`}
                    isInvalid={errors.quality && touched.quality}
                  />
                </InputGroup>
              </Col>
            </Row>
            <InputGroup className="mb-3 d-flex flex-column">
              {/* <div className="d-flex justify-content-between align-items-center">
                <label htmlFor="description" className="d-block">
                  Short Description
                </label>
                {errors.description && touched.description ? (
                  <small className="text-danger">{errors.description}</small>
                ) : null}
              </div>
              <Field
                as="textarea"
                name="description"
                placeholder="Short Description"
                style={{ minHeight: "200px" }}
                className={`${styles.input} form-control w-100`}
              /> */}
              <MDEditor
                value={values.description}
                onChange={(e) => {
                  console.log(e);
                  setFieldValue("description", e);
                }}
                name="description"
              />
            </InputGroup>

            <div className="d-flex flex-md-row flex-column justify-content-between ">
              <div className="">
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
                    Book Cover Image
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
                  {data.image && !selectedFile && (
                    <img
                      src={`${BASE_URL}/${data.image}`}
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
  data: state.admin_book_page.selected_book,
  loading: state.admin_book_page.loading,
  publishers: state.auth_publisher.publishers,
  categories: state.auth_category.categories,
  authors: state.auth_author.authors,
  books: state.admin_book_page.books,
});

export default connect(mapStateToProps, { addBook, editBook })(AddBookForm);
