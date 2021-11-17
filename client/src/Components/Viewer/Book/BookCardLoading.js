import React from 'react';
import Style from './Book.module.css';
import Skeleton from "react-loading-skeleton";

function BookCardLoading() {
    return (
        <div className={Style.CardBook}>
            <Skeleton className={Style.bookLoading}></Skeleton>

            <div className={` ${Style.cartBody}`}>
                <h4> <Skeleton width={`30%`} height={20} /></h4>
                <div> <Skeleton width={`90%`} height={40} /> </div>
                <div> <Skeleton width={`40%`} height={30} /> </div>
                <div className={`${Style.buttonContainer}`}>
                    <div style={{width: "35%"}}><Skeleton width={`100%`} height={30} /></div>
                    <div style={{width: "10%"}}><Skeleton width={`100%`} height={30} /></div>
                </div>
            </div>
        </div>
    )
}

export default BookCardLoading
