import React,{useState} from 'react'

import { Nav1 } from '../Navbar/'
import { Col, Row,Card, Nav, Navbar, Container, Button } from "react-bootstrap";
import {Footer }from '../Footer'
import Style from './Cart.module.css'
import CartDemo from './CartDemo'
import {FaTrash} from 'react-icons/fa'
import {Link} from 'react-router-dom'
const Cart = () => {
    const [amount,setAmount] = useState(1)

    return (
        <div>
            <Nav1 />
        <div className={` ${Style.cartPage}`}>
<Container>
   <center >
       <Row>
        <Col xs={8} className={`${Style.CartPart} mt-5`}>
        <div className={`${Style.CartHead}`}>
        <div className={`float-left text-inline`}><b className={Style.CartHeadText} >Cart </b> <span>( 3 Items)</span>
        </div>
            <div className={`float-right text-inline`}>
             <b className={`${Style.totalText} `}>Totoal: 540 tk</b>
            <p className={`${Style.savingText} `}>your are saving total  Tk.135</p>
            </div>
           
        </div>
        
        <div>
        {CartDemo.map((book=>{
            return <div> 
            <hr/>
             <Row className={`my-2`}>
             
            
                <Col xs={1} className=''>
                <form>
                    <input type='checkbox' className={`${Style.ChekBox}`} />
                </form>
                </Col>
                <Col xs={3}>
                <img src="./images/book1.png"  className={`${Style.imgcart}`}/>
                </Col>
                <Col xs={2} className='align-self-center'>
                <p  className={`text-left`}> {book.book}</p>
                
                    <p  className={`text-left text-muted`}>{book.author} </p>
                    <i className='float-left'>
                    <FaTrash /> 
                    </i>
                </Col>
                <Col xs={3} className='mt-4 align-self-center'>
               <button className={Style.plusMinus} onClick={()=>setAmount(amount-1)}>-</button><input type='text' className={`${Style.amtFiled} text-center`} value={amount <0 ? 0 : amount}/><button className={Style.plusMinus} onClick={()=>setAmount(amount+1)} >+</button>
                </Col>
                <Col xs={3} className='align-self-center'>
                <div> <span className={`${Style.muteTxt}`}> {book.price} tk</span> <b>TK.180</b></div>
                
                </Col>
               
            </Row>
           
            </div> 
            
        }))}
            <button className={Style.odrBtn}> Place Order
            </button>
        </div>
        </Col>
        <Col xs={4}>
            
             <Card className='mb-3 mt-5 p-2'>
             <Card.Title>Checkout Summary</Card.Title>
             <Card.Body>
            
             <form>
             <select className="form-control">
             <option value='RD'> Regular Delivary</option>
             <option value='CD'> Cash On  Delivary</option>
             <option value='Ad'> Advance payment</option>
             </select>
             </form>
             <hr/>
             <div>
             <h6 className={`float-left`}>SubTotal </h6>  <span className='float-right'>  540Tk</span>
             
              </div>
             <br/>
             <hr/>
              <div><h6 className={`float-left`}>Shipping </h6>  <span className='float-right'>  40Tk</span> </div>
             <br/>
             <hr/>
              <div><h6 className={`float-left`}>Total </h6>  <span className='float-right'>  580Tk</span> </div>
              <br/>
             <hr/>
              <div><h6 className={`float-left`}>Payable Total </h6>  <span className='float-right'>  580Tk</span> </div>
              <br/>
             <hr/>
              </Card.Body>
             </Card>
            <Card className={Style.shipingAdd}>
        <h5 className={Style.addTitle}> Shipping Address</h5>
            
            <Card.Body><hr/>
            <Row> 
            <Col  className='text-left py-2'> Phone No. </Col>
            <Col  className='text-right py-2'> +88-01812345678 </Col>
            </Row>
            <hr/>
             <Row> 
            <Col className='text-left'> Alt. Phone No. </Col>
            <Col  className='text-right py-2'> +88-01798-765432 </Col>
            </Row>
            <hr/>
            <Row> 
            <Col className='text-left'> Shipping Address </Col>
            <Col className='text-right py-2'> 221B Baker Street  London, UK</Col>
            </Row>
            </Card.Body>
            <Card.Footer>
             Need To Change Address? <Link to='./order/edit/'>Edit</Link>
            </Card.Footer>
            </Card>
        </Col>
    </Row>
   </center>
    
</Container>
            <Footer />
        </div>
        </div>
    )
}

export default Cart
