import React from "react";
import { Row, Col, Card, CardDeck } from "react-bootstrap";
import { RiCloseCircleFill } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import swal from "sweetalert";
import { newArrivalsModalToggleAction } from "../../../Actions/Admin/NewArrivalsActions";
import styles from "./NewArrivalsList.module.css";
import data from "../data/bestSellerBook";
import { connect } from "react-redux";

const NewArrivalsList = ({ newArrivalsModalToggleAction }) => {
  const addBookHandeler = () => {
    //Add modal toggle action
    newArrivalsModalToggleAction();
  };
  const deleteHandeler = (id, title) => {
    swal({
      title: "Are you sure you want to Delete?",
      text: `Book : ${title}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        //DELETE ACTION OF THE BOOK USING ID

        console.log(id);
        swal("Book has been deleted!", {
          icon: "success",
        });
      }
    });
  };
  return (
    <Row as={CardDeck} className="p-4 p-md-0 ">
      {data.map((item) => (
        <Col md={3} key={item.id} className="container-fluid my-3">
          <Card className={`${styles.crd} h-100 `}>
            <div className="p-3">
              <div className={`${styles.img__wrapper} text-center`}>
                <img src={item.image} className={`w-100`} alt="" />
              </div>
              <span className={`d-block pt-2 ${styles.cat}`}>
                {item.category}
              </span>
              <span className={`d-block ${styles.title}`}>{item.title}</span>
              <span className={`d-block ${styles.author}`}>{item.author}</span>
              <span className={`d-block ${styles.price}`}>
                {item.price}
                <small>tk.</small>
              </span>
            </div>
            <Card.Footer className={`${styles.operations} mt-auto`}>
              <div
                className={styles.icon2}
                onClick={() => newArrivalsModalToggleAction(item.id)}
              >
                <FaPen className={styles.pen} />
              </div>
              <RiCloseCircleFill
                className={styles.icon}
                onClick={() => deleteHandeler(item.id, item.title)}
              />
            </Card.Footer>
          </Card>
        </Col>
      ))}
      <Col md={3} sm={6} className="my-3">
        <Card
          className={` ${styles.crd} ${styles.add__crd}`}
          onClick={addBookHandeler}
        >
          <AiOutlinePlusCircle className={styles.plus} />
          <span className={styles.add__text}>Add New</span>
        </Card>
      </Col>
    </Row>
  );
};

export default connect(null, { newArrivalsModalToggleAction })(NewArrivalsList);
