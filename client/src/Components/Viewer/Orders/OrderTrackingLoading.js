import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import Style from "./Orders.module.css";
import StepperLoading from "./StepperLoading";

function OrderTrackingLoading() {
  return (
    <div className={Style.OrderTrackingContainer}>
      <div className={Style.orders}>
        <h2 className={Style.heading}>
          <Skeleton height={20} width={50} />
        </h2>
        <div className={Style.orderList}>
          <div className={Style.book}>
            <div className={Style.book__image}>
              <Skeleton height={160} width={120} />
            </div>
            <div className={Style.book__desc}>
              <h3>
                <Skeleton height={40} width={200} />
              </h3>
              <p>
                <Skeleton height={20} width={100} />
              </p>
              <p>
                <Skeleton height={20} width={80} />
              </p>
            </div>
          </div>
          <div className={Style.book}>
            <div className={Style.book__image}>
              <Skeleton height={160} width={120} />
            </div>
            <div className={Style.book__desc}>
              <h3>
                <Skeleton height={40} width={200} />
              </h3>
              <p>
                <Skeleton height={20} width={100} />
              </p>
              <p>
                <Skeleton height={20} width={80} />
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={Style.tracking}>
        <h2 className={Style.heading}>Track Your Order</h2>
        <div className="stepper-container-vertical">
          <StepperLoading />
        </div>
      </div>

      <div className={Style.details}>
        <div className={Style.detail}>
          <h2 className={Style.heading}>Order Details</h2>

          <div className={Style.detailContainer}>
            <div className={Style.bookSpecInfo}>
              <div className={Style.bookSpecInfoName}>
                <Skeleton width={`90%`} height={30} />
              </div>
              <div className={Style.bookSpecInfoValue}>
                <Skeleton width={`100%`} height={30} />
              </div>
            </div>
            <div className={Style.bookSpecInfo}>
              <div className={Style.bookSpecInfoName}>
                <Skeleton width={`90%`} height={30} />
              </div>
              <div className={Style.bookSpecInfoValue}>
                <Skeleton width={`100%`} height={30} />
              </div>
            </div>
            <div className={Style.bookSpecInfo}>
              <div className={Style.bookSpecInfoName}>
                <Skeleton width={`90%`} height={30} />
              </div>
              <div className={Style.bookSpecInfoValue}>
                <Skeleton width={`100%`} height={30} />
              </div>
            </div>
            <div className={Style.bookSpecInfo}>
              <div className={Style.bookSpecInfoName}>
                <Skeleton width={`90%`} height={30} />
              </div>
              <div className={Style.bookSpecInfoValue}>
                <Skeleton width={`100%`} height={30} />
              </div>
            </div>
            <div className={Style.bookSpecInfo}>
              <div className={Style.bookSpecInfoName}>
                <Skeleton width={`90%`} height={30} />
              </div>
              <div className={Style.bookSpecInfoValue}>
                <Skeleton width={`100%`} height={30} />
              </div>
            </div>
            <div className={Style.bookSpecInfo}>
              <div className={Style.bookSpecInfoName}>
                <Skeleton width={`90%`} height={30} />
              </div>
              <div className={Style.bookSpecInfoValue}>
                <Skeleton width={`100%`} height={30} />
              </div>
            </div>
          </div>
        </div>
        <div className={Style.additional}>
          <h3>Back To Shop</h3>
          <p>PLACE ANOTHER ORDER NOW!</p>
          <Link to="/">Explore</Link>
        </div>
      </div>
    </div>
  );
}

export default OrderTrackingLoading;
