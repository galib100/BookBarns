import React from 'react'
import Style from '../AboutUs/About.module.css'
import { Col, Row,Form, Container, Button } from "react-bootstrap";
import {FaPhone}  from  'react-icons/fa'
import {FaFacebookF}  from  'react-icons/fa'
import {SiGmail}  from  'react-icons/si'
import {FiInstagram}  from  'react-icons/fi'

const ContactUs = () => {
    return (
        <div>
            <img src="./images/front.png" alt="" className={Style.front_img} />
            <Container>
                <div className={Style.Welcome}>
                    <h3>Contact Information</h3>
                    <hr align='left' className={Style.hrTag}/>
                <p>We will answer any questions you may have about our online sales, rights or partnership service right here.</p>
                <Row className='py-3 my-4'>
                    <Col>
                    <h4>Our Office </h4> 
                    <p>Rajshahi University of Engineering & Technology</p>
                    <span>Kazla, Rajshahi-6204, Bangladesh.</span>
                    <p>loremipsum@gmail.com</p>
                    +02949 49483943
                    <span>Call us anytime from 8am ~ 12pm</span>
                    </Col>
                    <Col>
                    <h4> Contact Info</h4>
                    <div>
                        <Row>
                            <Col xs={1} >
                           <div className={Style.contcticon}>
                            <FaPhone  />
                           </div>
                           
                            </Col>
                            <Col>
                           <h5> + 88-01793-343203</h5>
                             <span className='text-muted'>Call Us Now</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={1}>
                            <div className={Style.contcticon}>
                            <FaFacebookF />
                           </div>
                            </Col>
                            <Col>
                           <h5> facebook.com/Obosor.Books</h5>
                             <span className='text-muted'>Facebook</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={1}>
                            <div className={Style.contcticon}>
                            <FaFacebookF />
                           </div>
                            </Col>
                            <Col>
                           <h5> connect.obosorbooks@gmail.com</h5>
                             <span className='text-muted'>Gmail</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={1}>
                             <div className={Style.contcticon}>
                            <FiInstagram />
                           </div>
                            </Col>
                            <Col>
                           <h5> oboshor.books</h5>
                             <span className='text-muted'>Instagram</span>
                            </Col>
                        </Row>
                    </div>
                    </Col>
                </Row>
                <h3>Get In Touch</h3>
                <hr align='left' className={Style.hrTag}/>
                <div>
                    <p>Integer hendrerit libero turpis, nec gravida lectus scelerisque nec. </p>
                <Form action="">
                    <Row>
                        <Col> 
                        <label htmlFor="name">Name</label>
                        <Form.Control name='name'>

                        </Form.Control>
                         </Col>
                         <Col> 
                        <label htmlFor="email">Email</label>
                        <Form.Control name='email' id='email'>
                        
                        </Form.Control>
                         </Col>
                    </Row>
                    <label htmlFor="subject">Subject</label>
                        <Form.Control name='subject' id='subject'>
                        
                        </Form.Control>
                        <label htmlFor="message">Message</label>
                        <textarea name='message' className='form-control'>
                            
                        </textarea> 
                       <button type='submit'className={Style.p_btn}>Submit Message</button>
                </Form>
                </div>

                </div>
            </Container>
        </div>
    )
}

export default ContactUs
