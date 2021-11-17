import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardDeck } from "react-bootstrap";
import { RiCloseCircleFill } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import swal from "sweetalert";
import {
  deleteAd,
  getAds,
  adModalToggleAction,
} from "../../../Actions/Admin/AdActions";
import styles from "./AdList.module.css";
import { connect } from "react-redux";
import loadingImg from "../../../Assets/Admin/loading.gif";
import { BASE_URL } from "../../../Constants/URL";

const AdList = ({ data, loading, adModalToggleAction, getAds, deleteAd }) => {
  const [ad, setAd] = useState([]);

  useEffect(() => {
    if (!loading) {
      setAd(data);
    } else {
      getAds();
    }
  }, [data]);

  const addBookHandeler = () => {
    //Add modal toggle action
    adModalToggleAction();
  };
  const deleteHandeler = (id, title) => {
    swal({
      title: "Are you sure you want to Delete?",
      text: `AD : ${title}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        //DELETE ACTION OF THE BOOK USING ID
        let result = deleteAd(id);
        if (result) {
          swal("Ad has been deleted!", {
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
        <div className="col-12 py-5 text-center">
          <img src={loadingImg} style={{ width: "100px" }} />
        </div>
      ) : (
        <>
          {ad.map((item) => (
            <Col md={3} key={item._id} className="container-fluid my-3">
              <Card className={`${styles.crd} h-100 `}>
                <div className="">
                  <div className={`${styles.img__wrapper} text-center`}>
                    <img
                      src={`${BASE_URL}/${item.image}`}
                      className={`img-fluid`}
                      alt=""
                    />
                  </div>
                </div>
                <Card.Footer className={`${styles.operations} mt-auto`}>
                  <span className={styles.caption}>{/*item.link*/}</span>
                  <div className=" d-flex justify-content-center align-items-center">
                    <div
                      className={styles.icon2}
                      onClick={() => adModalToggleAction(item._id)}
                    >
                      <FaPen className={styles.pen} />
                    </div>
                    <RiCloseCircleFill
                      className={styles.icon}
                      onClick={() => deleteHandeler(item._id, item.link)}
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
        </>
      )}
    </Row>
  );
};
const mapStateToProps = (state) => ({
  data: state.auth_ad.ads,
  loading: state.auth_ad.loading,
});
export default connect(mapStateToProps, {
  adModalToggleAction,
  getAds,
  deleteAd,
})(AdList);
