import React, { useState } from 'react'
import { Cart } from '../../../Components/Viewer/Cart'
import CartFailed from '../../../Components/Viewer/Cart/CartFailed';
import CartSuccess from '../../../Components/Viewer/Cart/CartSuccess';

const CartPage = () => {
    const [orderStatus, setOrderStatus] = useState("");

    return (
        <>
            {
                orderStatus === ""
                ? <Cart setOrderStatus={setOrderStatus} />
                : orderStatus === "success"
                    ? <CartSuccess />
                    : <CartFailed setOrderStatus={setOrderStatus} />
            }
        </>
    )
}

export {CartPage}
