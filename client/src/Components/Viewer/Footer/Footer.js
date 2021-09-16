import React from 'react'
import { Card, ListGroup,ListGroupItem, Container, Row, Col, Form, FormControl, Button } from "react-bootstrap";
import Style from './footer.module.css'
import {Link} from 'react-router-dom';
import {ImFacebook} from 'react-icons/im';
import {FiInstagram} from 'react-icons/fi'
const Footer = () => {
    return (
        <div> 
        <div className={`${Style.FtrSec}`}>
<hr/>
        </div>
        
            <Container>
                <Row className={`${Style.frtRow} justify-content-md-center`}>
                    <Col xs={4} className={`${Style.frtTxt}`}>
                    <img 
                    src="./images/logo.jpg"
                     alt="BookBarnsLogo"
                     width="150"   
                     height="100"
                      className='pb-3 mb-4'
                      />
                    <h6 className='pb-1'>
                    Rajshahi University of Engineering & Technology
                    <br />
                
                    Kazla, Rajshahi-6204, Bangladesh.
                    </h6>
                    <br/>
                    <p className='pt-2'>connect.Book Barnsbooks@gmail.com</p>
                    <p className='pt-2'>+ 88 017-93-343203</p>
                    
                    {/* <i className='fa fa-facebook p-3'></i> */}
                    <Row className={Style.frtIcon}>
                    <Col md={3} >
                    <ImFacebook/>
                    </Col>
                    <Col>
                     <FiInstagram /> 
                    </Col>
                 
                    </Row>
                   
                    </Col>

                    <Col xs={2} className=''>
                    <h5 className='mb-5'>Category-1</h5> 
                    <ListGroup className={` ${Style.footText}`}>
                
         <Link to='/About' className={Style.listText}>About</Link>
        <Link to='/our_network' className={Style.listText}>Our Networks</Link>
        <Link to='/blog' className={Style.listText}>Blog</Link>
        <Link to='/Contact' className={Style.listText}>Contact Us</Link>
        <Link to='/categories' className={Style.listText}>Categories</Link>
                                 
                    </ListGroup>
                    </Col>
                    <Col xs={3} className=''>
                   <h5 className={Style.assciateTxt}> Associate Organization </h5>
                    <img src="./images/company1.png" alt="company1" className='p-2' />
                    <img src="./images/company2.png" alt="company2" className='p-2'/>
                    </Col>
                    <Col xs={2} className=' offset-1'>
                    <h5 className={Style.assciateTxt}> Our Apps</h5>
                    <div className=''>
                    <a href=""><img src="./images/playS.png" alt="company1" className='p-2 ' /></a> 
                   <a href=""> <img src="./images/appleS.png" alt="company2" className='p-2'/></a>

                    </div>
                                   
                    </Col>
                </Row><hr/>
                <h5 className={Style.lastLine}>&copy; 2021 Book Barns. All right reserved</h5>
            </Container>
            <hr className ={Style.lastHr}/>
        </div>
    )
}

export default Footer
