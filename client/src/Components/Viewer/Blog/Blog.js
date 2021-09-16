import React,{useState,useEffect} from 'react'
import { Nav1 } from '../Navbar/'
import { Footer } from '../Footer'
import { Col, Row,Pagination, Card, Container, Button } from "react-bootstrap";
import Style from '../AboutUs/About.module.css'
import BlogDemo from './BlogDemo'
// import {FaPhone}  from  'react-icons/FaPhone'
const Blog = () => {
    // const [posts,setPosts]= useState(['']);
    // const [currentPage,setCurrentPage] = useState([1]);
    // const [postPerPage,setPostPerPage] =useState([4]);
     
    return (
        <div> 
         <Nav1 />
         <div className={Style.topText}>
        <h5> Home <i className='fa fa-greater-than fa-sm mt-4'>  </i> Category <i className='fa fa-greater-than fa-sm'></i> Sub-Category  or books</h5>
            
         </div>
          <hr/>
         <Container >{
             BlogDemo.map((val)=>{
                 return (
             
            <Row>
                <Col xs={8}>
                    <Card className='my-2'>
                        <Card.Body>
                            <Card.Img src={val.img}>
                            </Card.Img>
                            <Row>
                                <Col xs={2}>
                                    <Card> 
                                        <Card.Body>
                                            <Card.Title>
                                                {val.date.slice(0,2)}
                                            </Card.Title>
                                            <button className={Style.p_btn_sm}>{val.date.slice(3)}</button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={10}>
                                    <Card.Title className={Style.blogTitle}>
                                       {val.title}
                                    </Card.Title>
                                    <Card.Text className={Style.ContentTxt}>
                                    {val.content}
                                    </Card.Text>
                                    <span> <i className='fas fa-calendar-alt p-2'></i> {val.date}</span>
                                    <span> <i className='fas fa-user p-2'></i> By UserName</span>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={4}>
                    <Card className={`my-2  ${Style.dicountBody}`}>
                        <Card.Body>
                        <Card.Img src="./images/bookA.png" alt="" />
                        <Card.Title>
                        Get Upto
                        </Card.Title>
                        <h4 className={Style.dicountTxt}>35% Discount </h4>
                        <span className='text-muted'>DONOT MISS THE CHANCE</span>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>)
            })
        }
        </Container>
        <Footer />
        </div>
    )
}

export default Blog
