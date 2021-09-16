import React from 'react'
import { Nav1 } from '../Navbar/'
import { Col, Row, Nav, Navbar, Container, Button } from "react-bootstrap";
import {Footer }from '../Footer'
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
              <a href="./">  <button className={Style.pbtn}>
                Back
                </button></a>
                </center>

            </Container>
            <Footer/>
           
        </div>
    )
}

export default Error
