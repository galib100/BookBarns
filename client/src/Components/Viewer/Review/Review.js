import React from 'react'
import { Col, Row, Card, Container, Button } from "react-bootstrap";
import style from "./Review.module.css";
import {AiFillStar} from 'react-icons/ai'
import {BiLike} from 'react-icons/bi'
import {BiDislike} from 'react-icons/bi'

const Review = () => {
    const ReviewCard = <Col md={4}>
                        
                       
    <div className={style.Rcard}>
        <div className={style.RHead}> 
        <span className={style.namIcon}> M </span>  Mahir Ashef Vhubon
        </div>
        <div>
          <span className={style.startIcon}>  <AiFillStar /> </span>
          <span className={style.startIcon}>  <AiFillStar /> </span>
          <span className={style.startIcon}>  <AiFillStar /> </span>
          <span className={style.startIcon}>  <AiFillStar /> </span>
            <AiFillStar className={style.unRated}/> 
           
        </div>
        <h5 className={style.innHead}> Totally Amazing !</h5>
        <div className={style.inntxt}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida vitae. </div>
        <div className='text-muted my-2'> 2 hours Ago </div>
        <div className={style.likeDislike}> <span>  <BiLike />  </span> 15 <span> <BiDislike />  </span> 01 </div>
    </div>
    </Col>


    return (
        <div>
            <Row className='justify-content-center my-5'>
            <center>
            <Col>
            <h4 className={style.RTop}>Review</h4>
            <p>See what say others about this book </p>
            </Col>
            </center>
            </Row>
            <Row className=''>
                <Col md={2}>
                    <h6> Reviews :</h6>
                    <div>
                        <p  className={style.ava}> Average</p>
                        <p className={style.avarageH}> 4.3 </p>
                        <div>
                        <span className={style.startIcon}>  <AiFillStar /> </span>
                        <span className={style.startIcon}>  <AiFillStar /> </span>
                        <span className={style.startIcon}>  <AiFillStar /> </span>
                        <span className={style.startIcon}>  <AiFillStar /> </span>
                        <AiFillStar className={style.unRated}/> 
                        <p className={style.totalR}> 6 reviews</p>
                    </div>
                    </div>
                </Col>
                <Col md={10}>
                <Row className='mb-3'>
                    {ReviewCard}
                    {ReviewCard}
                    {ReviewCard}
                </Row>
                <Row className=''>
                    {ReviewCard}
            
                    {ReviewCard}
                    
                    <Col md={4}>
                        
                       
                        <div className={style.Rcard}>
                         <Row className='align-items-end'> 
                            <Col md={7} className='align-self-end'>
                            <div > 
                            <p className={style.addReview}>ADD YOUR REVIEW</p>
                            <button className={style.goBtn}>Go </button>
                            </div>
                             </Col>
                             <Col md={5} className='align-self-end'>
                             <div > 
                                <img src='./images/beeIcon.png' className={style.beeImg}alt='beeImage' />
                            </div>
                             </Col>
                            </Row>
                            
                        </div>
                        </Col>


                </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Review
