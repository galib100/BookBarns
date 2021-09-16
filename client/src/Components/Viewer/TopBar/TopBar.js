import React from "react";
import { Row, Col, Navbar, Nav } from "react-bootstrap";
import Style from "../Navbar/Navbar.module.css";
import {Link} from 'react-router-dom'
const TopBar = () => {
    return (
        <div>
            <Row>
                <Col>
                    {/* <i className="p-2 fa fa-facebook"> </i>
          <i className="p-2 fa fa-facebook"> </i>
          <i className="p-2 fa fa-facebook"> </i> */}
                </Col>

                <Col xs={5}>
                    <Navbar bg="">
                        <Nav className="mr-auto">
                             <Link to='/BestSeller'><span className={Style.topbarText}> Obosor Best seller</span></Link> 
                             <Link to='/newarrivals'><span className={Style.topbarText}> New Arrivals</span></Link> 
                             <Link to='/onsale'><span className={Style.topbarText}> On Sale</span></Link> 
                             <Link to='/preorder'><span className={Style.topbarText}> Pre Order Lits</span></Link> 
                    
                        </Nav>
                    </Navbar>
                </Col>
                <hr />
            </Row>
        </div>
    );
};

export default TopBar;
