import { retry } from 'async';
import React,{useState } from 'react'
import { Card, Carousel, Dropdown, Container, Row, Col, Form, FormControl, Button } from "react-bootstrap";
import Style from './Items.module.css'
import { Link } from "react-router-dom";
import { ItemList } from './ItemsList';
import CartItem from './CartItem/cartItem'
import {FaGreaterThan} from 'react-icons/fa'
const Items = () => {
  const  cartbook = <Row className='mt-5'>
     {
  ItemList.map(item =><CartItem item={item}/>)
     }
  </Row>
   return (
      <Container className='my-5'>

         <Row className='my-5'>
            <Col>
               <Card className={Style.item_bg}>

                  <Card.Img variant="top" src="./images/bestSeller.png" className={Style.img_icon} />
                  
                     <h4 className={Style.item_text}> Book Barns Best seller </h4>
                     <a href=""><p className={`mb-2 ${Style.itemSubText}`}>Explore Now</p></a>

                 
               </Card>
            </Col>
            <Col>
               <Card className={Style.item_bg}>

                  <Card.Img variant="top" src="./images/newA.png" className={Style.img_icon} />
                 
                     <h4 className={Style.item_text}> New Arrivals </h4>
                     <a href=""><p className={`mb-2 ${Style.itemSubText}`}>Explore Now</p></a>
               </Card>
            </Col>
            <Col>
               <Card className={Style.item_bg}>

                  <Card.Img variant="top" src="./images/onS.png" className={Style.img_icon} />
                 
                     <Card.Title className={Style.item_text}> On Sale </Card.Title>
                     <a href=""> <Card.Subtitle className={`mb-2 ${Style.itemSubText}`}>Explore Now</Card.Subtitle></a>

                 
               </Card>
            </Col>
            <Col>
               <Card className={Style.item_bg}>

                  <Card.Img variant="top" src="./images/preO.png" className={Style.img_icon} />
                  
                     <Card.Title className={Style.item_text}> Pre Order List </Card.Title>
                     <a href=""><Card.Subtitle className={`mb-2 ${Style.itemSubText}`}>Explore Now</Card.Subtitle></a>

                  
               </Card>
            </Col>
         </Row>
         {/* Best saller  section  */}
         
       <Row>
          <Col>
         <h4 className={Style.item_header}>Book Barns Best seller</h4>   
          </Col>
          <Col >
          <Link to='/BestSeller'>
           <h6 className={`${Style.viewALL}`}>View All <i className=''> <FaGreaterThan /> </i></h6> 
          </Link>
          </Col>
      
       </Row> 
         <hr className={Style.hrd} align='left'/>
         
            {cartbook}
        
        
         <Row>
          <Col>
          <h4 className={Style.item_header}>New Arrivals</h4>   
          </Col>
          <Col className='align-self-end'>
          <Link to='/NewArrivals'>
           <h6 className={`${Style.viewALL}`}>View All <i className=''> <FaGreaterThan /></i></h6> 
          </Link>
          </Col>
      
       </Row> 
         
         <hr className={Style.hrd} align='left'/>
         {cartbook}

         {/* On Sale  section */}
         <Row>
          <Col className='align-self-end'>
          
         <h4 className={Style.item_header}>On Sale</h4>
        
         </Col>
          
          <Col className='align-self-end'>
          <Link to='/OnSale'>
           <h6 className={`${Style.viewALL}`}>View All <i className=''> <FaGreaterThan /> </i></h6> 
          </Link>
          </Col>
      
       </Row>
         <hr className={Style.hrd} align='left'/>

        {cartbook}
        <Row>
          <Col>
          <h4 className={Style.item_header}>Pre-Order List</h4>

          </Col>
          <Col className='align-self-end'>
          <Link to='/Preorder'>
           <h6 className={`${Style.viewALL}`}>View All <i className=''> <FaGreaterThan /></i></h6> 
          </Link>
          </Col>
      
       </Row>
         <hr className={Style.hrd} align='left'/>
        {cartbook}
      </Container>
   )
}
export default Items