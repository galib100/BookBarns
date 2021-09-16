import React from 'react'
import { Col, Row, Nav, Navbar, Container, Button } from "react-bootstrap";

import Style from './Empty_Cart.module.css'
const Empty_Cart = () => {
    return (
        <div className="my-4">
           <Container>
                <center>
                <div >
                    <img className={Style.emptyCartImg} src="./images/emptyCart.png" alt="img" />
                </div>
                <h1 className={Style.emptyTxt}>Your Cart is Empty! </h1>
                    <span className={Style.spanText}> Looks like you haven't made order yet</span> <br></br>
              <a href="/Cart">  <button className={Style.pbtn}>
                Continue to Shopping
                </button></a>
                </center>

            </Container>
        </div>
    )
}

export default Empty_Cart
