import React from 'react';
import Skeleton from "react-loading-skeleton";
import Style from "./Stepper.module.css";

function StepperLoading() {
    return (
        <div className={Style.stepperWrapper}>
            {/* 1 */}
            <div className={Style.step}>
              <div className={Style.circle}>
                  <Skeleton width={50} height={50} style={{borderRadius: "50%"}} />
              </div>
              <div className={Style.step__desc}>
                <h4><Skeleton width={60} height={15} /></h4>
                <p><Skeleton width={120} height={20} /></p>
              </div>
            </div>

            {/* 2 */}
            <div className={Style.step}>
              <div className={Style.circle}>
                  <Skeleton width={50} height={50} style={{borderRadius: "50%"}} />
              </div>
              <div className={Style.step__desc}>
                <h4><Skeleton width={60} height={15} /></h4>
                <p><Skeleton width={120} height={20} /></p>
              </div>
            </div>

            {/* 3 */}
            <div className={Style.step}>
              <div className={Style.circle}>
                  <Skeleton width={50} height={50} style={{borderRadius: "50%"}} />
              </div>
              <div className={Style.step__desc}>
                <h4><Skeleton width={60} height={15} /></h4>
                <p><Skeleton width={120} height={20} /></p>
              </div>
            </div>
            
            {/* 4 */}
            <div className={Style.step}>
              <div className={Style.circle}>
                  <Skeleton width={50} height={50} style={{borderRadius: "50%"}} />
              </div>
              <div className={Style.step__desc}>
                <h4><Skeleton width={60} height={15} /></h4>
                <p><Skeleton width={120} height={20} /></p>
              </div>
            </div>

            
          </div>
    )
}

export default StepperLoading
