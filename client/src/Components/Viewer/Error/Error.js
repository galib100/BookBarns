import React from 'react'
import { Nav1 } from '../Navbar/'
import { Col, Row, Nav, Navbar, Container, Button } from "react-bootstrap";
import {Footer }from '../Footer'
import { Link } from 'react-router-dom';
import Style from './Error.module.css'

const Error = () => {
    return (
        <div>
            <Nav1/> 
            <Container>
                <center>
                <div >
                    <img className={Style.errorImage} src="./images/404 error.png" alt="img" />
                </div>
                <h1 className={Style.errorTxt}>Bad Gateway</h1>
              <Link to="./">  <button className={Style.pbtn}>
               Go Back
                </button></Link>
                </center>

            </Container>
            <Footer/>
           
        </div>
    )
}

export default Error
