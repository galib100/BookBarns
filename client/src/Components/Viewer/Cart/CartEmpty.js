import React from 'react';
import { Link } from 'react-router-dom';

// Styles & Images
import Style from "./Cart.module.css";
import cartEmpty from "../../../Assets/Viewer/Cart/cartempty.png";

function CartEmpty() {
    return (
        <div className={Style.emptyCartContainer}>
            <div>
                <img src={cartEmpty} alt="" />
                <h1>Your Cart is Empty! </h1>
                <p>Looks like you haven't made order yet</p>
                <Link to="/">Continue to shopping</Link>
            </div>
        </div>
    )
}

export default CartEmpty
