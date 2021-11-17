import React from "react";
import Skeleton from "react-loading-skeleton";
import Style from "./Book.module.css";

function BookDetailLoading() {
  return (
    <div className={Style.bookDetailContainer}>
      {/* details basic */}
      <div className={Style.bookdetails}>
        <div className={Style.bookImage}>
          <Skeleton width={260} height={374} />
        </div>
        <div className={Style.bookInfo} style={{marginTop: "40px"}}>
          <h2 className={Style.title}><Skeleton width={`90%`} height={30} /></h2>
          <h4 className={Style.author}><Skeleton width={`40%`} height={18} /></h4>
          <div className={Style.priceContainer}>
            <Skeleton width={250} height={40} />
          </div>
          <p><Skeleton width={`90%`} height={100} /></p>
          <div className={Style.btncont}>
            <Skeleton width={150} height={50} />
            <Skeleton width={180} height={50} style={{marginLeft: "30px"}} />
          </div>
        </div>
        {/* book detail info */}
        <div className={Style.bookSpec}>
            <Skeleton width={`100%`} height={`60vh`}/>
        </div>
      </div>

      <div className={Style.reviews}>
        <div className={Style.bookReviews}>
          <div className={Style.averageRatting}>
            <Skeleton width={`50%`} height={20}/>
            <Skeleton width={`90%`} height={100}/>
          </div>
          
          <div className={Style.allreviews}>
            {
              Array(5).fill("").map(() => (<div className={Style.areview} style={{padding: 0}}><Skeleton width={`100%`} height={250}/></div>))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailLoading;
