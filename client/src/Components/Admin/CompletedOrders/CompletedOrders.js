import React, { useState } from "react";
import { Table, Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { BiFilterAlt } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { VscTrash } from "react-icons/vsc";
import styles from "./CompletedOrders.module.css";
import data from "./data";
import { ShadowCard } from "../../shared/ShadowCard";
import { Link } from "react-router-dom";
import swal from "sweetalert";
const RunningOrders = () => {
  const [orderList, setOrderList] = useState(data);
  const [searchText, setSearchText] = useState("");

  const deleteHandeler = (id, title) => {
    swal({
      title: "Are you sure you want to Delete?",
      text: `Client : ${title}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        //DELETE ACTION OF THE BOOK USING ID

        console.log(id);
        swal("Order has been deleted!", {
          icon: "success",
        });
      }
    });
  };

  const searchHandeler = (text) => {
    if (text !== "") {
      setOrderList(
        data.filter((item) => {
          return item.client.toLowerCase().includes(text.toLowerCase());
        })
      );
    } else {
      setOrderList(data);
    }
    setSearchText(text);
  };

  const changeHandeler = (type) => {
    if (type === "all") {
      setOrderList(data);
    } else {
      setOrderList(data.filter((item) => item.status === type));
    }
  };

  const nextStatus = (status) => {
    let newStatus = "";
    if (status === "delivered") {
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
                <th>Modify or Cancel</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((item) => (
                <tr key={item.id}>
                  <td className="text-left font-weight-bold">#{item.id}</td>
                  <td>
                    <Link to={`/admin/orders/${item.id}`}>{item.client}</Link>
                  </td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>
                  <td>{item.price}</td>
                  <td>{nextStatus(item.status)}</td>
                  <td>
                    <Link
                      to={`/admin/orders/${item.id}`}
                      className={styles.icons}
                    >
                      <FaRegEdit />
                    </Link>
                    <span
                      className={styles.icons}
                      onClick={() => deleteHandeler(item.id, item.client)}
                    >
                      <VscTrash />
                    </span>
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
  );
};

export default RunningOrders;
