import React, { useState } from 'react'
import { Col, Row, Card, Container, Button } from "react-bootstrap";
import Style from './BookDetails.module.css'
import { DemoBookDetails } from './DemoBookDetails'
import {Review} from '../Review'
const BookDetails = () => {
    const [amount, setAmount] = useState(1);
    return (
        <div>
            <Container>
                <Row className={`my-5`}>
                    <Col md={4} sm={6}>
                        <img src='./images/book2.png' alt='bookimage' className={`${Style.bookImg}`} />
                    </Col>
                    <Col md={5} >
                        <div className={`p-2`}>
                            <Card.Body>
                                <Card.Title className={`${Style.bookTitle}`}> Into The Free World: A Journey Through Every Country</Card.Title>
                                <Card.Subtitle className='mb-3'> By (Author): <span className={`${Style.nameofAuthor}`}>R.K Lyon</span> </Card.Subtitle>

                                <b className={`${Style.tkTxt}`}> 850 </b>tk  <span className={`${Style.offetTxt}`}> (10% OFF)</span>
                                <p className='my-3 text-justify'> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum vitae est et ultricies. Etiam molestie id magna non lacinia. Quisque fringilla convallis orci, fermentum cursus est ornare sed etiam rhoncus metus fermentum.</p>
                            </Card.Body>
                        </div>
                        <Row className={`my-4 justify-content-between px-2`}>
                            <Col xs={4} className='text-center'>
                                <button className={Style.plusMinus} onClick={() => setAmount(amount - 1)}>-</button><input type='text' className={`${Style.amtFiled} text-center`} value={amount < 0 ? 0 : amount} /><button className={Style.plusMinus} onClick={() => setAmount(amount + 1)} >+</button>
                            </Col>
                            <Col xs={7}>
                                <button className={`${Style.odrBtn}`}> Add to cart</button>
                            </Col>
                        </Row>
                        <div>
                        </div>
                        <div className={Style.FtTxt}> <i className='far fa-heart fa-lg mx-2'> </i> <span>Add to wishlist</span> <i className='fa fa-share-alt fa-lg mx-2'></i> <span>Share</span> </div>
                    </Col>
                    <Col lg={3} sm={6} className={Style.allDetails}>
                        <button className={`${Style.SpcicationBtn} mb-4`}>Specifications</button>
                        <div>

                            <Row className='my-2'>
                                <Col className={`${Style.allName}`}> Name :</Col>
                                <Col>{DemoBookDetails.title}</Col>

                            </Row>
                            <Row className='my-2'>
                                <Col className={`${Style.allName}`}> Author :</Col>
                                <Col className={Style.authhortxt}>{DemoBookDetails.author}</Col>

                            </Row>
                            <Row className='my-2'>
                                <Col className={`${Style.allName}`}> Category :</Col>
                                <Col className={Style.catagoriTXt}>{DemoBookDetails.category} </Col>

                            </Row>
                            <Row className='my-2'>
                                <Col className={`${Style.allName}`}> Total Pages :</Col>
                                <Col className={Style.catagoriTXt}>{DemoBookDetails.totalPage}</Col>

                            </Row>
                            <Row className='my-2'>
                                <Col className={`${Style.allName}`}> Price :</Col>
                                <Col className='text-left'>{DemoBookDetails.price}</Col>

                            </Row>
                            <Row className='my-2'>
                                <Col className={`${Style.allName}`}> Publisher :</Col>
                                <Col className='text-left'>{DemoBookDetails.publisher}</Col>

                            </Row>
                            <Row className='my-2'>
                                <Col className={`${Style.allName}`}> Publishing Year :</Col>
                                <Col className='text-left'>{DemoBookDetails.publishingYr}</Col>

                            </Row>

                            <Row className='my-2'>
                                <Col className={`${Style.allName}`}> Edition :</Col>
                                <Col className='text-left'>{DemoBookDetails.edition}</Col>

                            </Row>
                            <Row className='my-2'>
                                <Col className={`${Style.allName}`}> Genre :</Col>
                                <Col className='text-left'>{DemoBookDetails.genre}</Col>

                            </Row>
                            <Row className='my-2' >
                                <Col className={`${Style.allName}`}> Available Quantity :</Col>
                                <Col className='text-left'>{DemoBookDetails.stokAmount}</Col>

                            </Row>
                        </div>


                    </Col>
                </Row>
                <Review />
            </Container>
        </div>
    )
}

export default BookDetails
