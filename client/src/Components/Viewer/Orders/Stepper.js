import React from "react";
import Style from "./Stepper.module.css";

import { IoBagCheckOutline, IoHourglassOutline } from "react-icons/io5";
import { FiTruck } from "react-icons/fi";
import { AiOutlineRise } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { MdNotInterested } from "react-icons/md";

function Stepper({ currentStepNumber }) {
  return (
    <div className={Style.stepperWrapper}>
      {/* ////////////////////////////////////////////////////////////////////////////// */}
      {/* step - 1 */}
      <div
        className={
          currentStepNumber === 1
            ? `${Style.step} ${Style.stepActive}`
            : `${Style.step} ${Style.stepComplete}`
        }
      >
        <div className={Style.circle}>
          <div>
            <BsCheckCircle />
          </div>
        </div>
        <div className={Style.step__desc}>
          <h4>Order Placed</h4>
          <p>Your order placed successfully.</p>
        </div>
      </div>

      {/* ////////////////////////////////////////////////////////////////////////////// */}
      {/* Step = -2 (canceled) */}
      {currentStepNumber === -1 ? (
        <div
          className={
            currentStepNumber === -1
              ? `${Style.step} ${Style.stepLast} ${Style.stepActive}`
              : `${Style.step} ${Style.stepLast} ${Style.stepComplete}`
          }
        >
          <div className={Style.circle}>
            <div>
              <MdNotInterested />
            </div>
          </div>
          <div className={Style.step__desc}>
            <h4>Order Cancel</h4>
            <p>Order is canceled successfully.</p>
          </div>
        </div>
      ) : null}

      {/* if order is not cancelled show other steppers. */}
      {currentStepNumber !== -1 ? (
        <>
        {/* ////////////////////////////////////////////////////////////////////////////// */}
        {/* step = 2 */}
          <div
            className={
              currentStepNumber === 2
                ? `${Style.step} ${Style.stepActive}`
                : currentStepNumber < 2
                ? `${Style.step} ${Style.stepPending}`
                : `${Style.step} ${Style.stepComplete}`
            }
          >
            <div className={Style.circle}>
              <div>
                <IoBagCheckOutline />
              </div>
            </div>
            {currentStepNumber === 2 ? (
              <div className={Style.step__desc}>
                <h4>Order Confirmation</h4>
                <p>Order confirmation is in progress.</p>
              </div>
            ) : currentStepNumber < 2 ? (
              <div className={Style.step__desc}>
                <h4>Order Confirmation</h4>
                <p>Order confirmation pending.</p>
              </div>
            ) : (
              <div className={Style.step__desc}>
                <h4>Order Confirmation</h4>
                <p>Order confirmation completed.</p>
              </div>
            )}
          </div>

          {/* ////////////////////////////////////////////////////////////////////////////// */}
          {/* Step = 3 */}
          <div
            className={
              currentStepNumber === 3
                ? `${Style.step} ${Style.stepActive}`
                : currentStepNumber < 3
                ? `${Style.step} ${Style.stepPending}`
                : `${Style.step} ${Style.stepComplete}`
            }
          >
            <div className={Style.circle}>
              <div>
                <IoHourglassOutline />
              </div>
            </div>
            {currentStepNumber === 3 ? (
              <div className={Style.step__desc}>
                <h4>Order Processing</h4>
                <p>Your order is processing.</p>
              </div>
            ) : currentStepNumber < 3 ? (
              <div className={Style.step__desc}>
                <h4>Order Processing</h4>
                <p>Order processing pending.</p>
              </div>
            ) : (
              <div className={Style.step__desc}>
                <h4>Order Processing</h4>
                <p>Order processing completed.</p>
              </div>
            )}
          </div>

          {/* ////////////////////////////////////////////////////////////////////////////// */}
          {/* step = 4 */}
          <div
            className={
              currentStepNumber === 4
                ? `${Style.step} ${Style.stepActive}`
                : currentStepNumber < 4
                ? `${Style.step} ${Style.stepPending}`
                : `${Style.step} ${Style.stepComplete}`
            }
          >
            <div className={Style.circle}>
              <div>
                <AiOutlineRise />
              </div>
            </div>
            {currentStepNumber === 4 ? (
              <div className={Style.step__desc}>
                <h4>Order Shipping</h4>
                <p>Order shipping is in progress.</p>
              </div>
            ) : currentStepNumber < 4 ? (
              <div className={Style.step__desc}>
                <h4>Order Shipping</h4>
                <p>Order shipping is pending.</p>
              </div>
            ) : (
              <div className={Style.step__desc}>
                <h4>Order Shipping</h4>
                <p>Order is shipped successfully.</p>
              </div>
            )}
          </div>

          {/* ////////////////////////////////////////////////////////////////////////////// */}
          {/* Step = 5 */}
          <div
            className={
              currentStepNumber === 5
                ? `${Style.step} ${Style.stepLast} ${Style.stepActive}`
                : `${Style.step} ${Style.stepLast} ${Style.stepPending}`
            }
          >
            <div className={Style.circle}>
              <div>
                <FiTruck />
              </div>
            </div>
            {currentStepNumber === 5 ? (
              <div className={Style.step__desc}>
                <h4>Order Delivery</h4>
                <p>Order is delivered successfully.</p>
              </div>
            ) : (
              <div className={Style.step__desc}>
                <h4>Order Delivery</h4>
                <p>Order delivery is pending.</p>
              </div>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Stepper;
