import react,{useState} from 'react'
import { Card, Carousel, Dropdown, Container, Row, Col, Form, FormControl, Button } from "react-bootstrap";
import Style from './ObosorBest.module.css'
import {FiHeart} from 'react-icons/fi'
const   BookItem = ({item})=>{
    const [cart,setCart]=useState(0);
    return (
        <Col md={3} className={`${Style.CardBook} mb-5`}>
            <div  onMouseEnter={()=>{setCart(1)}} onMouseLeave={()=>{setCart(0)}}>

               <Card.Img variant="center" src={item.image} className={Style.book} />

               <div className={`${cart===1&&Style.active} ${Style.cartBody}`}>
                  <span className={Style.catagoryTxt}> {item.catagory}</span>
                  <Card.Title className=''> {item.title} </Card.Title>
                  <Card.Subtitle className={`mb-2 ${Style.authorTxt}`}>{item.author}</Card.Subtitle>
                 <b>{item.price}</b> tk
                  
               </div>
               <div className={`${cart===0&&'d-none'} p-2`}>
                  <button className={` text-light ${Style.addToCarBtn}`}>ADD TO CART</button> 
                
               <i className={`${Style.cartIcon} float-right`}> <FiHeart /></i>
            

               </div>
              
           </div>
         </Col>
        
    )
}
export default BookItem;

