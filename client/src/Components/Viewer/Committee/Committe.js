import React from 'react'
import { Col, Row, Nav, Card, Container, Form, FormControl, Button } from "react-bootstrap";
import style from './Committe.module.css'
import CommitteList from './CommitteList'
const Committe = () => {
    return (
        <div>
            <h4 className='mt-5'>Our Committee</h4>
                <hr className={style.hrTag} align='left'/>        
            <Row>
                {CommitteList.map((list) => {
                    return <Col xs={4}>
                        <Card className={`${style.proCard}`}>

                            <Card.Body className="text-center">
                                <Card.Img variant="top" src="./images/pro1.png" className='' />
                                <Card.Title className={`${style.name}`}> {list.name}</Card.Title>
                                <Card.Subtitle className={`${style.subTxt} mb-2`}>{list.dept}</Card.Subtitle>
                                <Card.Subtitle className="mb-2">{list.title}</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>


                })}
            </Row>
            <h3 className='my-5'>Number Stay with us</h3>
  
            <Row>
                <Col>
                <Card className={` ${style.iconCard}`}>
                    <Card.Body className={`text-center `}>
                        <i className='fa fa-edit'></i>
                        <h2>5</h2>
                        <span className='text-muted'>Admin & Moderator</span>
                    </Card.Body>
                </Card>
                </Col>
                <Col>
                <Card className={` ${style.iconCard}`}>
                    <Card.Body className='text-center'>
                        <i className='fa fa-users'></i>
                        <h2>5</h2>
                        <span className='text-muted'>Family member</span>
                    </Card.Body>
                </Card>
                </Col>
                <Col>
                <Card className={` ${style.iconCard}`}>
                    <Card.Body className='text-center'>
                        <i className='fa fa-edit'></i>
                        <h2>5</h2>
                        <span className='text-muted'>Happy Customer</span>
                    </Card.Body>
                </Card>
                </Col>
                <Col>
                <Card className={` ${style.iconCard}`}>
                    <Card.Body className='text-center'>
                        <i className='fa fa-user-plus'></i>
                        <h2>5</h2>
                        <span className='text-muted'>Follower</span>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            <h3 className="my-5">Your Title</h3>
            <hr className={style.hrTag} align='left'/>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos, reprehenderit nemo laudantium est natus deserunt dolor, magnam aliquam illum distinctio, provident neque nam doloribus. Quibusdam recusandae sit omnis dicta mollitia.</p>
        </div>
    )
}

export default Committe
