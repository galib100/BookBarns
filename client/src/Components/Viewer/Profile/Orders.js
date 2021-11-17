import React from "react";
import { Link } from "react-router-dom";

// STYLES
import Style from "../../../Views/Viewer/Profile/Profile.module.css";
import emptyImage from "../../../Assets/Viewer/Profile/empty.svg";
import { BiCurrentLocation } from "react-icons/bi";

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];


function Orders({ orders }) {
  // FORMAT DATE
  const formatedDate = (date) => {
    let fdate = Date.parse(date);
    fdate = new Date(fdate);

    const dd = fdate.getDate();
    const mm = fdate.getMonth();
    const yy = fdate.getYear() + 1900;
    
    let formatedDate;

    if(dd < 10) {
        formatedDate = `0${dd} ${months[mm]} ${yy}` 
    } else{
      formatedDate = `${dd} ${months[mm]} ${yy}` 
    }
    return formatedDate;
  }


  return (
    <div className={Style.allOrders}>
      <h2>All Your Orders</h2>
      {orders.length === 0 ? (
        <div className={Style.emptyOrder}>
          <img src={emptyImage} alt="" />
          <h3>Empty</h3>
          <p>Look like you are not ordered yet.</p>
        </div>
      ) : (
        <div className={Style.orderTable}>
          {/* table heading */}
          <div className={`${Style.tableItem} ${Style.tableHead}`}>
            <div className={Style.item__id}>Order ID</div>
            <div className={Style.item__address}>Delivery Address</div>
            <div className={Style.item__phone}>Order Date</div>
            <div className={Style.item__status}>Order Status</div>
            <div className={Style.item__button}>Track Your Order</div>
          </div>

          <div className={`${Style.tableHeadForMobile}`}>
            <div className={Style.item__id}>ID</div>
            <div className={Style.item__phone}>Date</div>
            <div className={Style.item__status}>Status</div>
            <div className={Style.item__button}>Track</div>
          </div>

          {orders && orders.map((order) => (
            <div className={Style.tableItem}>
              <div className={Style.item__id}>#{order.id.substring(order.id.length - 10)}</div>
              <div className={Style.item__address}>
                {order.address}
              </div>
              <div className={Style.item__phone}>{formatedDate(order.date)}</div>
              <div className={Style.item__status}>
                {
                  order.status === 'Confirm'
                  ? <div className={Style.statConfirm}>Confirm</div>
                  : order.status === 'Confirm'
                    ? <div className={Style.statProcessing}>Processing</div>
                    : order.status === 'Shipped'
                      ? <div className={Style.statShipped}>Shipped</div>
                      : order.status === 'Delivered'
                        ? <div className={Style.statDelivered}>Delivered</div>
                        : order.status === 'Canceled'
                          ? <div className={Style.statCanceled}>Canceled</div>
                          : <div className={Style.statPlaced}>Placed</div>
                }
              </div>
              <div className={Style.item__button}>
                <Link to={`/order/${order.id}`}><span>Track</span><span><BiCurrentLocation /></span></Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
