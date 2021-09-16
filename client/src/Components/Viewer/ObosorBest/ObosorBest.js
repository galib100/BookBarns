import React from 'react'
import { Col, Row,Card, Nav, Navbar, Container, Button } from "react-bootstrap";
import {DemoBestSeller} from './DemoBestSeller'
import BookItem from './BookItem'
import style from './ObosorBest.module.css'
const ObosorBest = (props) => {
    const  cartbook = <Row className='mt-5'>
     {
  DemoBestSeller.map(item =><BookItem item={item}/>)
     }
  </Row>
    return (
        <div>
            <Container className='py-5'>
            <div>
         <h4 className={style.item_header}>{props.title ? props.title:'Book Barns Best Seller'}</h4>   
         <hr className={style.hrd} align='left'/>
            {cartbook}
             </div>
            </Container>
        </div>
    )
}

export default ObosorBest
