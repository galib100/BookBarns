import React from "react";
import { Row, Col, Card, CardDeck } from "react-bootstrap";
import { RiCloseCircleFill } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import swal from "sweetalert";
import {
  addPublisherModalToggleAction,
  deletePublisher,
  editPublisherModalToggleAction,
} from "../../../Actions/Admin/PublisherActions";
import styles from "./PublisherList.module.css";
import { connect } from "react-redux";
import { BASE_URL } from "../../../Constants/URL";
import loadingImg from "../../../Assets/Admin/loading.gif";

const PublisherList = ({
  addPublisherModalToggleAction,
  deletePublisher,
  editPublisherModalToggleAction,
  data,
  loading,
}) => {
  const addBookHandeler = () => {
    //Add modal toggle action
    addPublisherModalToggleAction();
  };

  const deleteHandeler = (id, title) => {
    swal({
      title: "Are you sure you want to Delete?",
      text: `Publisher : ${title}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        //DELETE ACTION OF THE BOOK USING ID
        let flag = deletePublisher(id);
        if (flag) {
          swal("Publisher Removed!", {
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
      {loading ? (
        <div className="text-center">
          <img src={loadingImg} style={{ width: "30px" }} />
        </div>
      ) : (
        data.map((item) => (
          <Col md={3} key={item._id} className="container-fluid my-3">
            <Card className={`${styles.crd} h-100 `}>
              <div className="p-3">
                <div className={`${styles.img__wrapper} text-center`}>
                  <img
                    src={`${BASE_URL}/${item.image}`}
                    className={`w-100`}
                    alt={item.name}
                  />
                </div>

                <span className={`d-block text-center`}>{item.name}</span>
              </div>
              <Card.Footer className={`${styles.operations} mt-auto`}>
                <div
                  className={styles.icon2}
                  onClick={() => editPublisherModalToggleAction(item._id)}
                >
                  <FaPen className={styles.pen} />
                </div>
                <RiCloseCircleFill
                  className={styles.icon}
                  onClick={() => deleteHandeler(item._id, item.name)}
                />
              </Card.Footer>
            </Card>
          </Col>
        ))
      )}
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
  data: state.auth_publisher.publishers,
  loading: state.admin_book_page.loading,
});

export default connect(mapStateToProps, {
  addPublisherModalToggleAction,
  deletePublisher,
  editPublisherModalToggleAction,
})(PublisherList);
