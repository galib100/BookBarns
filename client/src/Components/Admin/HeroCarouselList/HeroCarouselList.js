import React from "react";
import { Row, Col, Card, CardDeck } from "react-bootstrap";
import { RiCloseCircleFill } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import swal from "sweetalert";
import { heroCarouselModalToggleAction } from "../../../Actions/Admin/HeroCarouselActions";
import styles from "./HeroCarouselList.module.css";
import data from "../data/carousel";
import { connect } from "react-redux";

const HeroCarouselList = ({ heroCarouselModalToggleAction }) => {
  const addBookHandeler = () => {
    //Add modal toggle action
    heroCarouselModalToggleAction();
  };
  const deleteHandeler = (id, title) => {
    swal({
      title: "Are you sure you want to Delete?",
      text: `Carousel : ${title}`,
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
            <div className="">
              <div className={`${styles.img__wrapper} text-center`}>
                <img src={item.image} className={`img-fluid`} alt="" />
              </div>
            </div>
            <Card.Footer className={`${styles.operations} mt-auto`}>
              <span className={styles.caption}>{item.caption}</span>
              <div className=" d-flex justify-content-center align-items-center">
                <div
                  className={styles.icon2}
                  onClick={() => heroCarouselModalToggleAction(item.id)}
                >
                  <FaPen className={styles.pen} />
                </div>
                <RiCloseCircleFill
                  className={styles.icon}
                  onClick={() => deleteHandeler(item.id, item.caption)}
                />
              </div>
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

export default connect(null, { heroCarouselModalToggleAction })(
  HeroCarouselList
);
