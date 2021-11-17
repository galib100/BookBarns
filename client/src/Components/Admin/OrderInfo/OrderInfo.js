import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import styles from "./OrderInfo.module.css";
import BookList from "./BookList";
import OrderStatus from "./OrderStatus";
import { BsCloudDownload } from "react-icons/bs";
import ClientInfo from "./ClientInfo";
import { ShadowCard } from "../../shared/ShadowCard";
import OrderDetails from "./OrderDetails";
import { Link, useHistory } from "react-router-dom";
import { savePDF } from "@progress/kendo-react-pdf";
import { useRef } from "react";
import brandLogo from "../../../Assets/watermark.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const OrderInfo = ({ order, loading }) => {
  const history = useHistory();
  useEffect(() => {
    if (!order) {
      history.push("/admin/dashboard");
    }

    document.querySelector("#hidezone__PDF").style.display = "none";
  }, []);
  const [totalBook, setTotalBook] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const [visiable, setVisiable] = useState(true);
  const [down, setDown] = useState(false);
  const content = useRef(null);

  const downloadFunc = () => {
    setVisiable(false);
    // setTimeout(() => {
    //   //console.log("Download Clicked");
    //   savePDF(content.current, {
    //     paperSize: "auto",
    //     fileName: `Order_${order.id}`,
    //     margin: 40,
    //   });
    //   setVisiable(true);
    // }, 500);
    document.querySelector("#cancel__btn").style.opacity = 0;
    document.querySelector("#dwnBtn__PDF").style.opacity = 0;
    document.querySelector("#hidezone__PDF").style.display = "block";
    html2canvas(document.querySelector("#capture"), {
      imageTimeout: 2000,
      useCORS: true,
      width: window.innerWidth,
      height: document.querySelector("#capture").offsetHeight + 800,
      scale: 0.7,
    }).then((canvas) => {
      //document.body.appendChild(canvas); // if you want see your screenshot in body.
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({});
      pdf.addImage(imgData, "PNG", 1, 1);
      pdf.save("download.pdf");
      document.querySelector("#cancel__btn").style.opacity = 1;
      document.querySelector("#dwnBtn__PDF").style.opacity = 1;
      document.querySelector("#hidezone__PDF").style.display = "none ";
    });
  };
  return (
    <>
      {order && (
        <>
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <>
              <Row ref={content} id="capture" className={styles.wrapper}>
                <Col
                  id="hidezone__PDF"
                  md={12}
                  className="text-center d-flex flex-column justify-content-center align-items-center py-3"
                >
                  <img
                    src={brandLogo}
                    alt="logo obosor"
                    style={{ height: 90, width: 90 }}
                  />
                  <span className="h3">Full Details</span>
                </Col>
                <Col md={6}>
                  <BookList
                    setTotalBook={setTotalBook}
                    setTotalBill={setTotalBill}
                  />
                </Col>
                <Col md={6}>
                  <ShadowCard>
                    <Row className="px-4 py-2">
                      <Col
                        xs={12}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span className="h3">Order Details</span>

                        <button
                          className="btn btn-primary"
                          onClick={downloadFunc}
                          id="dwnBtn__PDF"
                        >
                          <BsCloudDownload />
                          <span className="pl-2">PDF</span>
                        </button>
                      </Col>
                      <Col xs={12} className={styles.border2}></Col>
                      <Col xs={12}>
                        <OrderDetails
                          totalBook={totalBook}
                          totalBill={totalBill}
                        />
                      </Col>
                    </Row>
                  </ShadowCard>
                  <div className="pt-3">
                    <ShadowCard>
                      <Row className="px-4 py-2">
                        <Col xs={12}>
                          <h3>Client Details</h3>
                        </Col>
                        <Col xs={12} className={styles.border2}></Col>
                        <Col xs={12}>
                          {order.client && <ClientInfo client={order.client} />}
                        </Col>
                      </Row>
                    </ShadowCard>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="pt-5">
                  <h3 className="pt-3">Ordered Status</h3>
                  {order.status === "Canceled" ? (
                    <span className="alert alert-danger text-center d-block ">
                      Order is canceled
                    </span>
                  ) : (
                    <OrderStatus status={order.status.toLowerCase()} />
                  )}
                </Col>
              </Row>
            </>
          )}
          <div className="text-center pt-5">
            <Link to="/admin/orders" className="primary__btn">
              Go Back
            </Link>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  order: state.admin_orders.selected_order_admin,
  loading: state.admin_orders.loading,
});

export default connect(mapStateToProps, {})(OrderInfo);
