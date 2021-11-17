import React from "react";
import { Table, Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { BiFilterAlt } from "react-icons/bi";
import { MdDateRange } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { BsCloudDownload } from "react-icons/bs";
import { VscTrash } from "react-icons/vsc";
import styles from "./RunningOrders.module.css";
import { Link } from "react-router-dom";
import { ShadowCard } from "../../shared/ShadowCard";
import { useState } from "react";
import swal from "sweetalert";
import { useEffect } from "react";
import { connect } from "react-redux";
import loadingImg from "../../../Assets/Admin/loading.gif";
import { editOrderStatus } from "../../../Actions/Admin/OrderItemActions";
import Moment from "react-moment";
import axios from "axios";
import { BASE_URL } from "../../../Constants/URL";
const FileDownload = require("js-file-download");

const RunningOrders = ({ data, loading, users, editOrderStatus }) => {
  const [orderList, setOrderList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!loading) {
      setOrderList(data);
    }
  }, [data, loading]);

  //CURRENT DATE
  var currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  const deleteHandeler = (id, title) => {
    swal({
      title: "Are you sure you want to Cancel Order?",
      text: `Client : ${title}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        //DELETE ACTION OF THE BOOK USING ID
        let flag = editOrderStatus("Canceled", id);

        if (flag) {
          swal("Order Canceled!", {
            icon: "success",
          });
        } else {
          swal("Something Went Wrong", {
            icon: "warning",
          });
        }
      }
    });
  };

  const changeFromDateHandeler = (txt) => {
    if (txt) {
      let from = new Date(txt);

      setOrderList([
        ...data.filter((item) => {
          let orderDate = new Date(item.date);
          return orderDate.getTime() >= from.getTime();
        }),
      ]);
    } else {
      setOrderList(data);
    }
  };
  const changeToDateHandeler = (txt) => {
    if (txt) {
      let to = new Date(txt);
      console.log(to.getTime());

      setOrderList([
        ...data.filter((item) => {
          let orderDate = new Date(item.date);
          console.log(orderDate);
          return orderDate.getTime() < to.getTime();
        }),
      ]);
    } else {
      setOrderList(data);
    }
  };

  const searchHandeler = (text) => {
    if (text !== "") {
      if (data.length > 0) {
        setOrderList(
          data.filter((item) => {
            return (
              item.client.username.toLowerCase().includes(text.toLowerCase()) ||
              item.client.phone1.includes(text)
            );
          })
        );
      }
    } else {
      setOrderList(data);
    }
    setSearchText(text);
  };

  const changeHandeler = (type) => {
    if (type === "all") {
      setOrderList(data);
    } else {
      setOrderList(data.filter((item) => item.status.toLowerCase() === type));
    }
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const statusHandeler = (newStatus, item) => {
    let flag = editOrderStatus(capitalizeFirstLetter(newStatus), item.id);
    if (flag) {
      swal("Status Updated!", {
        icon: "success",
      });
    } else {
      swal("Something Went Wrong", {
        icon: "warning",
      });
    }
  };

  const nextStatus = (item) => {
    let status = item.status.toLowerCase();
    let newStatus = "";
    if (status === "placed") {
      newStatus = "pending";
    } else if (status === "pending") {
      newStatus = "confirm";
    } else if (status === "confirm") {
      newStatus = "processing";
    } else if (status === "processing") {
      newStatus = "shipped";
    } else if (status === "shipped") {
      newStatus = "delivered";
    }

    return (
      <div
        className={
          newStatus === "placed"
            ? styles.placed
            : newStatus === "pending"
            ? styles.pending
            : newStatus === "confirm"
            ? styles.confirm
            : newStatus === "processing"
            ? styles.processing
            : newStatus === "shipped"
            ? styles.shipped
            : styles.delivered
        }
        onClick={() => statusHandeler(newStatus, item)}
      >
        {newStatus}
      </div>
    );
  };
  const downloadFunc = async () => {
    let config = { responseType: "blob" };
    const res = await axios.get(`${BASE_URL}/api/admin/allordercsv`, config);
    if (res.data) {
      let now = Date.now();
      let date = new Date(now).toISOString();
      date = date.split("T")[0];
      FileDownload(res.data, `orders_${date}.csv`);
    }
  };

  return (
    <>
      {loading ? (
        <div className="text-center">
          <img src={loadingImg} style={{ width: "100px" }} />
        </div>
      ) : (
        <ShadowCard>
          <div className="p-2 bg-white">
            <div className="d-flex flex-md-row flex-column justify-content-between align-items-center pb-3">
              <div className="">
                <h4>Running Orders</h4>
              </div>
              <div className="d-flex flex-md-row flex-column justify-content-between align-items-center pb-md-0 pb-3">
                <button
                  className={`primary__btn ${styles.new__book} mr-md-3 px-2 mb-2 mb-md-0`}
                  onClick={downloadFunc}
                >
                  <BsCloudDownload />
                  <span className="pl-2">CSV</span>
                </button>
                <div className={`${styles.search__wrapper} mb-md-0 mb-3`}>
                  <BsSearch />{" "}
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => searchHandeler(e.target.value)}
                    className={styles.search}
                  />
                </div>

                <div
                  className={`d-flex justify-content-between align-items-center ${styles.search__wrapper} mb-md-0 mb-3`}
                >
                  <BiFilterAlt size={24} />
                  <Form.Control
                    as="select"
                    onChange={(e) => changeHandeler(e.target.value)}
                    custom
                    className={styles.select}
                  >
                    <option value="all">Filter</option>
                    <option value="placed">Placed</option>
                    <option value="confirm">Confirm</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                  </Form.Control>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-arount align-items-center pb-3">
              <div
                className={`d-flex justify-content-around align-items-center ${styles.date__wrapper} mb-md-0 mb-3`}
              >
                From
                <Form.Control
                  type="date"
                  onChange={(e) => changeFromDateHandeler(e.target.value)}
                  className={styles.select}
                  placeholder="From Date"
                />
              </div>
              <div
                className={`d-flex justify-content-between align-items-center ${styles.date__wrapper} mb-md-0 mb-3`}
              >
                To
                <Form.Control
                  max={new Date(currentDate).toISOString().split("T")[0]}
                  type="date"
                  format="yyyy-MM-dd"
                  onChange={(e) => changeToDateHandeler(e.target.value)}
                  className={styles.select}
                  placeholder="From Date"
                />
              </div>
            </div>

            <div className="table-responsive">
              <Table bordered hover className="text-center">
                <thead>
                  <tr>
                    <th className="px-1">ID</th>
                    <th className="px-1">Client Name</th>
                    <th className="px-1">Address</th>
                    <th className="px-1">Time</th>
                    <th className="px-1">Phone</th>
                    <th className="px-1">Order Status</th>
                    <th className="px-1">Update Status</th>
                    <th className="px-1">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orderList
                    .filter(
                      (item) =>
                        item.status.toLowerCase() !== "delivered" &&
                        item.status.toLowerCase() !== "canceled"
                    )
                    .map((item, i) => (
                      <tr key={item.id}>
                        <td className="text-left font-weight-bold px-2">
                          #{++i}
                        </td>
                        <td className="px-1">
                          <Link to={`/admin/orders/${item.id}`}>
                            {item.client.username}
                          </Link>
                        </td>
                        <td className="px-1">{item.address}</td>
                        <td className="px-1">
                          <Moment subtract={{ hours: 6 }} fromNow ago>
                            {item.date}
                          </Moment>{" "}
                          ago
                        </td>
                        <td>{item.phone}</td>
                        <td style={{ textTransform: "capitalize" }}>
                          {item.status}
                        </td>
                        <td>{nextStatus(item)}</td>
                        <td>
                          <div className="d-block">
                            <Link
                              to={`/admin/orders/${item.id}`}
                              className={styles.icons}
                            >
                              <FaRegEdit />
                            </Link>
                            <span
                              className={styles.icons}
                              onClick={() =>
                                deleteHandeler(item.id, item.client.username)
                              }
                            >
                              <VscTrash />
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              {orderList.length === 0 && (
                <div className="alert alert-danger text-center">No Orders</div>
              )}
            </div>
          </div>
        </ShadowCard>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.admin_orders.orders,
  loading: state.admin_orders.loading,
  users: state.user_admin_page.users,
});

export default connect(mapStateToProps, { editOrderStatus })(RunningOrders);
