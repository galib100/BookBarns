import React from 'react'
import { sImage } from './data'
import { Card, Carousel, Dropdown, Container, Row, Col } from "react-bootstrap";
import Style from "./BannerForLandingPage.module.css";
import { BASE_URL } from "../../../Constants/URL";

const Carou = () => {
    return(
        <div>

       
    {sImage.map((pic)=> {return <>
    <h1> hi</h1>
        <Carousel.Item interval={2000}>
            
                            <a
                                href='/'
                                className={Style.carouselImaageBlock}
                                target="_blank"
                            >
                                <img
                                className="d-block w-100"
                                src={`${BASE_URL}/BookImage/${pic}`}
                                alt="First slide"
                                />
                            </a>
                            </Carousel.Item>
    </>
        }
        )}
         </div>
            )
        }

export default Carou