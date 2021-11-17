import React from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

// ICONS
import { ImFacebook } from "react-icons/im";
import { FiInstagram } from "react-icons/fi";

// STYLES & IMAGES
import Style from "./footer.module.css";
import playstorestore from "../../../Assets/Viewer/Footer/playS.png";
import comp1 from "../../../Assets/Viewer/Footer/company1.jpg";
import brandLogo from "../../../Assets/brand_logo2.jpg";

const Footer = () => {
  return (
    <div>
      <div className={`${Style.FtrSec}`}>
        <hr />
      </div>

      <div className={Style.footercontainer}>
          <div className={`${Style.frtTxt}`}>
            <img src={brandLogo} alt="" className="pb-3 mb-4" />
            <h6 className="pb-1">
              <div>26, Padma Super Market.</div>
              <div>Road-01, Padma Residential Area</div>
              <div>Rajshahi, Bangladesh</div>
            </h6>
            <p className="pt-2">connect.obosorbooks@gmail.com</p>
            <p className="pt-2">+880 1624678366</p>

            <div className={Style.socialLinks}>
              <div><a href="https://www.facebook.com/Obosor.Books/" target="_blank"><ImFacebook /></a></div>
              <div><a href="https://www.instagram.com/obosor.books/" target="_blank"><FiInstagram /></a></div>
            </div>
          </div>

          <div className={Style.frtMenu}>
            <h5>Menu</h5>
            <ListGroup className={` ${Style.footText}`}>
              <Link to="/About" className={Style.listText}>
                About
              </Link>
              <Link to="/blog" className={Style.listText}>
                Blog
              </Link>
              <Link to="/Contact" className={Style.listText}>
                Contact Us
              </Link>
              <Link to="/categories" className={Style.listText}>
                Categories
              </Link>
            </ListGroup>
          </div>

          <div className={Style.frtAsso}>
            <h5 className={Style.assciateTxt}> Associate Organization </h5>
            <div className={Style.assoImg}>
              <img src={comp1} alt="company1" className="p-2" />
            </div>
          </div>

          <div className={Style.frtapp}>
            <h5 className={Style.assciateTxt}> Our Apps</h5>
            <div className={Style.assoImg}>
              <Link to="/">
                <img src={playstorestore} alt="company1" className="p-2 " />
              </Link>
            </div>
          </div>
      </div>
      
      {/* lastline */}
      <hr />
      <div className={Style.lastLine}> <div>&copy;</div> 2021 Obosor. All right reserved </div>
      <hr className={Style.lastHr} />
    </div>
  );
};

export default Footer;
