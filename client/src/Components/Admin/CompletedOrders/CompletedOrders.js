import React, { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { BiFilterAlt } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { VscTrash } from "react-icons/vsc";
import styles from "./CompletedOrders.module.css";
import { ShadowCard } from "../../shared/ShadowCard";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { connect } from "react-redux";
import loadingImg from "../../../Assets/Admin/loading.gif";

const CompeletedOrders = ({ data, loading, users }) => {
  const [orderList, setOrderList] = useState(
    data.filter(
      (item) =>
        item.status.toLowerCase() === "delivered" ||
        item.status.toLowerCase() === "canceled"
    )
  );

  //CURRENT DATE
  var currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  useEffect(() => {
    if (!loading) {
      setOrderList(
        data.filter(
          (item) =>
            item.status.toLowerCase() === "delivered" ||
            item.status.toLowerCase() === "canceled"
        )
      );
    }
  }, [data, loading]);
  const [searchText, setSearchText] = useState("");

  const getPrice = (id) => {
    let price = 0;
    data
      .filter((i) => i.id === id)[0]
      .order.map((item) => {
        price += item.discounted_price * item.quantity;
      });
    return price;
  };

  const changeFromDateHandeler = (txt) => {
    if (txt) {
      let from = new Date(txt);

      setOrderList([
        ...data.filter((item) => {
          let orderDate = new Date(item.date);
          return (
            orderDate.getTime() >= from.getTime() &&
            (item.status.toLowerCase() === "delivered" ||
              item.status.toLowerCase() === "canceled")
          );
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
          return (
            orderDate.getTime() < to.getTime() &&
            (item.status.toLowerCase() === "delivered" ||
              item.status.toLowerCase() === "canceled")
          );
        }),
      ]);
    } else {
      setOrderList(data);
    }
  };

  const searchHandeler = (text) => {
    if (text !== "") {
      setOrderList(
        data.filter((item) => {
          return item.client.username
            .toLowerCase()
            .includes(text.toLowerCase());
        })
      );
    } else {
      setOrderList(data);
    }
    setSearchText(text);
  };

  const changeHandeler = (type) => {
    if (type === "all") {
      setOrderList(
        data.filter(
          (item) =>
            item.status.toLowerCase() === "delivered" ||
            item.status.toLowerCase() === "canceled"
        )
      );
    } else {
      setOrderList(data.filter((item) => item.status.toLowerCase() === type));
    }
  };

  const nextStatus = (status) => {
    let newStatus = "";
    if (status.toLowerCase() === "delivered") {
      newStatus = "delivered";
    } else {
      newStatus = "canceled";
    }

    return (
      <span
        className={
          newStatus === "delivered" ? styles.delivered : styles.canceled
        }
      >
        {status}
      </span>
    );
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
                <h4>Compeleted Orders</h4>
              </div>
              <div className="d-flex flex-md-row flex-column justify-content-between align-items-center pb-md-0 pb-3">
                <div className={`${styles.search__wrapper} mb-md-0 mb-3`}>
                  <BsSearch />{" "}
                  <input
                    type="text"
                    placeholder="Search"
                    className={styles.search}
                    value={searchText}
                    onChange={(e) => searchHandeler(e.target.value)}
                  />
                </div>

                <div
                  className={`d-flex justify-content-between align-items-center ${styles.search__wrapper} mb-md-0 mb-3`}
                >
                  <BiFilterAlt size={24} />
                  <Form.Control
                    as="select"
                    custom
                    className={styles.select}
                    onChange={(e) => changeHandeler(e.target.value)}
                  >
                    <option value="all">Filter</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
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
                    <th>ID</th>
                    <th>Client Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Total Price</th>
                    <th>Order Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orderList.map((item, key) => (
                    <tr key={item.id}>
                      <td className="text-left font-weight-bold">#{key + 1}</td>
                      <td>
                        <Link to={`/admin/orders/${item.id}`}>
                          {item.client.username}
                        </Link>
                      </td>
                      <td>{item.address}</td>
                      <td>{item.phone}</td>
                      <td>{getPrice(item.id)}</td>
                      <td>{nextStatus(item.status)}</td>
                      <td>
                        <div className="">
                          <Link
                            to={`/admin/orders/${item.id}`}
                            className={styles.icons}
                          >
                            <FaRegEdit />
                          </Link>
                          {/* <span
                            className={styles.icons}
                            onClick={() =>
                              deleteHandeler(item.id, item.client.username)
                            }
                          >
                            <VscTrash />
                          </span> */}
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

export default connect(mapStateToProps, null)(CompeletedOrders);
