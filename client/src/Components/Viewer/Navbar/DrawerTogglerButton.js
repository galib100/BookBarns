import React from "react";
import Style from "./Navbar.module.css";

const DrawerTogglerButton = (props) => {
    return (
        <button className={Style.btn__toggler} onClick={props.click}>
            <div className={Style.btn__togglerLine}></div>
            <div className={Style.btn__togglerLine}></div>
            <div className={Style.btn__togglerLine}></div>
        </button>
    );
};

export default DrawerTogglerButton;
