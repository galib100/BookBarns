import React from 'react';
import Skeleton from "react-loading-skeleton";
import Style from "./Profile.module.css";

function ProfileLoading() {
    return (
        <div className={Style.profileContainer}>
            <div className={Style.profile__banner}></div>
            <div className={Style.profe__infobolck}>
                <div className={Style.profile__name}>
                    
                </div>

                <div className={Style.profile__basicInfo}>
                    <div className={Style.profile__basic}>
                        <div className={Style.info}>
                            <div className={`${Style.info__logo_loading} ${Style.info__logo}`}>
                                <Skeleton width={40} height={40} style={{borderRadius: "50%"}} />
                            </div>
                            <div className={Style.info__value}>
                                <h6><Skeleton width={200} height={20} /></h6>
                                <p><Skeleton width={100} height={20} /></p>
                            </div>
                        </div>
                        <div className={Style.info}>
                            <div className={`${Style.info__logo_loading} ${Style.info__logo}`}>
                                <Skeleton width={40} height={40} style={{borderRadius: "50%"}} />
                            </div>
                            <div className={Style.info__value}>
                                <h6><Skeleton width={200} height={20} /></h6>
                                <p><Skeleton width={100} height={20} /></p>
                            </div>
                        </div>
                        <div className={Style.info}>
                            <div className={`${Style.info__logo_loading} ${Style.info__logo}`}>
                                <Skeleton width={40} height={40} style={{borderRadius: "50%"}} />
                            </div>
                            <div className={Style.info__value}>
                                <h6><Skeleton width={200} height={20} /></h6>
                                <p><Skeleton width={100} height={20} /></p>
                            </div>
                        </div>
                        <div className={Style.info}>
                            <div className={`${Style.info__logo_loading} ${Style.info__logo}`}>
                                <Skeleton width={40} height={40} style={{borderRadius: "50%"}} />
                            </div>
                            <div className={Style.info__value}>
                                <h6><Skeleton width={200} height={20} /></h6>
                                <p><Skeleton width={100} height={20} /></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={Style.line}></div>

                <div className={Style.allOrders}>
                    <h2><Skeleton width={200} height={50} /></h2>

                    <div className={Style.orderTable}>
                        {/* table heading */}
                        <div className={`${Style.tableItem} ${Style.tableHead}`}>
                            <div className={Style.item__id}>Order ID</div>
                            <div className={Style.item__address}>Delivery Address</div>
                            <div className={Style.item__phone}>Phone Number</div>
                            <div className={Style.item__status}>Order Status</div>
                            <div className={Style.item__button}>Track Your Order</div>
                        </div>
                        {
                            Array(4).fill("").map(() => (
                                <div className={`${Style.tableItem} ${Style.tableHead}`}>
                                    <div className={Style.item__id}><Skeleton width={`70%`} height={20} /></div>
                                    <div className={Style.item__address}><Skeleton width={`70%`} height={20} /></div>
                                    <div className={Style.item__phone}><Skeleton width={`70%`} height={20} /></div>
                                    <div className={Style.item__status}><Skeleton width={`70%`} height={20} /></div>
                                    <div className={Style.item__button}><Skeleton width={`70%`} height={20} /></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileLoading
