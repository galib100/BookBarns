import React from "react";
import { Row, Col, Card, CardDeck } from "react-bootstrap";
import { RiCloseCircleFill } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import swal from "sweetalert";
import {
  trendingModalToggleAction,
  trendingRemove,
} from "../../../Actions/Admin/TrendingActions";
import styles from "./TrendingList.module.css";
import { connect } from "react-redux";
import { BASE_URL } from "../../../Constants/URL";

const TrendingList = ({
  trendingModalToggleAction,
  trendingRemove,
  data,
  loading,
}) => {
  const addBookHandeler = () => {
    //Add modal toggle action
    trendingModalToggleAction();
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
        let flag = trendingRemove(id);
        if (flag) {
          swal("Book has been removed!", {
            icon: "success",
          });
        } else {
          swal("Something went wrong!", {
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <Row as={CardDeck} className="p-4 p-md-0 ">
      {data
        .filter((item) => item.trending === true)
        .map((item) => (
          <Col md={3} key={item._id} className="container-fluid my-3">
            <Card className={`${styles.crd} h-100 `}>
              <div className="p-3">
                <div className={`${styles.img__wrapper} text-center`}>
                  <img
                    src={`${BASE_URL}/${item.image}`}
                    className={`w-100`}
                    alt=""
                  />
                </div>
                <span className={`d-block pt-2 ${styles.cat}`}>
                  {item.category}
                </span>
                <span className={`d-block ${styles.title}`}>{item.title}</span>
                <span className={`d-block ${styles.author}`}>
                  {item.author}
                </span>
                <span className={`d-block ${styles.price}`}>
                  {item.price}
                  <small>tk.</small>
                </span>
              </div>
              <Card.Footer className={`${styles.operations} mt-auto`}>
                <div
                  className={styles.icon2}
                  onClick={() => trendingModalToggleAction(item._id)}
                >
                  <FaPen className={styles.pen} />
                </div>
                <RiCloseCircleFill
                  className={styles.icon}
                  onClick={() => deleteHandeler(item._id, item.title)}
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

const mapStateToProps = (state) => ({
  data: state.admin_book_page.books,
  loading: state.admin_book_page.loading,
});

export default connect(mapStateToProps, {
  trendingModalToggleAction,
  trendingRemove,
})(TrendingList);
