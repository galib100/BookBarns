import React from "react";
import { Nav1 } from "../Navbar/";
import { Col, Row, Nav, Navbar, Container, Button } from "react-bootstrap";
import { Footer } from "../Footer";
import Style from "./About.module.css";
import Committe from "../Committee/Committe";
const About = () => {
  return (
    <div>
      <Nav1 />
      <section>
        <img src="./images/front.png" alt="" className={Style.front_img} />
        <Container>
          <Container>
            <div className={Style.Welcome}>
              <h3 className={Style.bigText}>Welcome To Oboshor</h3>
              <hr align="left" className={Style.hrTag} />
              <i>
                "Books are the quietest and most constant of friends; they are
                the most accessible and wisest of counselors, and the most
                patient of teachers."
              </i>
              <h5 className={`${Style.hText} mt-4`}>Our Story</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                eu pulvinar nunc. Fusce volutpat accumsan interdum. Mauris a
                luctus mauris, sit amet iaculis ex. Quisque iaculis, magna nec
                luctus tempor, nibh ipsum mattis purus, id elementum risus neque
                eget tortor. Vivamus mattis sodales ante, a pellentesque ante
                consectetur non. Praesent eu lacus erat. Maecenas metus elit,
                viverra eget cursus et, interdum id diam. Nullam in arcu lacus.
                Duis efficitur metus arcu, non molestie felis molestie sed.
                Proin at viverra nisl, vel egestas ante. Integer vestibulum non
                nunc id fermentum.
              </p>
              <Row>
                <Col className="mt-4">
                  <h5 className={Style.hText}>What we really do?</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin eu pulvinar nunc. Fusce volutpat accumsan interdum.
                    Mauris a luctus mauris, sit amet iaculis ex. Quisque
                    iaculis.
                  </p>
                </Col>
                <Col className="mt-4">
                  <h5 className={Style.hText}>Our vision</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin eu pulvinar nunc. Fusce volutpat accumsan interdum.
                    Mauris a luctus mauris, sit amet iaculis ex. Quisque
                    iaculis.
                  </p>
                </Col>
              </Row>
              <h3 className={`mt-5 ${Style.hText}`}>Meet Our Team</h3>
              <hr align="left" className={Style.hrTag} />
              <i>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                eu pulvinar nunc. Fusce volutpat accumsan interdum. Mauris a
                luctus mauris, sit amet iaculis ex.
              </i>
              <img src="./images/carou.png" alt="" className={Style.groupImg} />
              {/* here commitie export */}
              <Committe />
            </div>
          </Container>
        </Container>
      </section>
      {/* footer is here */}
      <Footer />
    </div>
  );
};

export default About;
