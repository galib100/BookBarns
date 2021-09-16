import React from 'react'
import { Card, Carousel, Dropdown, Container, Row, Col, Form, ListGroup, Button } from "react-bootstrap";
import { Catagories } from '../Carousel/Catagories_demo'
import  Style  from '../Items/Items.module.css';
import {FaGreaterThan} from 'react-icons/fa'
import {IoMdList} from 'react-icons/io'

// import { popper } from '@popperjs/core';
export const Carousel_sidebar = () => {
    return ( 
        <div>
            <Container className={`my-5 `}>
                <Row>
                    <Col xs={3}>
                      
                        <Dropdown show>
                            <Dropdown.Toggle variant="" className={`${Style.dropDown} dropdown-toggle`} id="dropdown-basic">
                            <i className='pr-2 fa-lg'><IoMdList/></i>
                            Browse categories
                            </Dropdown.Toggle>

                            <Dropdown.Menu className={`${Style.scrollablemenu}`}>
                
                                {
                                    Catagories.map((cata) => {
                                        return  <Dropdown.Item className={`${Style.dpItem}`} href="/bestseller">{cata} <i className='float-right'><FaGreaterThan/> </i> </Dropdown.Item>

                                    })
                                }

                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col xs={6}>


                        <Carousel>
                            <Carousel.Item interval={1000}>
                                <img
                                    className="d-block w-100"
                                    src="./images/carou.png"
                                    alt="First slide"
                                />
                              
                            </Carousel.Item>
                            <Carousel.Item interval={500}>
                                <img
                                    className="d-block w-100"
                                    src="./images/carou.png"
                                    alt="Second slide"
                                />
                               
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="./images/carou.png"
                                    alt="Third slide"
                                />
                               
                            </Carousel.Item>
                        </Carousel>
                    </Col>

                    <Col>
                        <Card className={`${Style.trackCard} text-right`}>
                            <Card.Img variant="top" src="./images/food.png" className={`${Style.deliverBoyiImg} `} />
                            
                                <h4 className={`${Style.trackText} `}>Track You Order</h4>
                                <p className="mb-1 text-muted">FIND YOUR ORDER STATUS</p>
                                <button className={`${Style.pbtn} `} >Track Now</button>
                            
                        </Card>
                        <Card className={`${Style.trackCard} mt-3 pb-4`}>
                             
                                <p className={`${Style.simTxt}`}>Can't Find What You Are Looking For </p>
                                <h5 className={Style.reqText}> Request A Book </h5>
                                <p className={`${Style.mutedTxt}`}>ORDER PREFERED BOOKS NOW!</p>
                                <button  className={`${Style.obtn}`}>Order Now</button>
            
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
