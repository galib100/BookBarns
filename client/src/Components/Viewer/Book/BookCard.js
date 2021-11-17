import React, { useState } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, addToWishlist } from '../../../Actions/Viewer/BookRelated';

import Style from './Book.module.css';
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import { BASE_URL } from '../../../Constants/URL';

function BookCard({item, addToCart, addToWishlist}) {
    const [hearSelected, setHeartSelected] = useState(false);
    const [addedToCart, setAddedToCart ] = useState(false);

    // Add to cart func
    const addBookToCart = () => {
        addToCart({...item, amount: 1});
        setAddedToCart(true);
    }

    // Add to weish list
    const addedToWishlist = () => {
        addToWishlist(item);
        setHeartSelected(!hearSelected)
    }

    return (
        <div className={`${Style.CardBook}`}>
            <Link to={`/Book/${item._id}`}>
                <img variant="center" src={`${BASE_URL}/${item.image}`} className={Style.book} />
            </Link>
               
            <div className={` ${Style.cartBody}`}>
                <h4> {item.category}</h4>
                <Link to={`/Book/${item._id}`}><p> {item.title}</p></Link>
                <p className={Style.author}>{item.author}</p>
                <p className={`${Style.tk}`}>
                    {
                        item.discounttype === 'flat'
                        ? <>{item.price - item.discount} <span>tk</span> </>
                        : <>{item.price - Math.ceil(item.price * item.discount / 100)} <span>tk</span> </>
                    }
                    {
                        item.discount === 0
                        ? null
                        : <strike className={Style.mainPrice}>{item.price} tk</strike>
                    }
                </p>
                <div className={`${Style.buttonContainer}`}>
                    {
                        !addedToCart
                        ? <div className={` text-light ${Style.addToCarBtn}`} onClick={addBookToCart}>ADD TO CART</div> 
                        : <div className={` text-light ${Style.addToCarBtn} ${Style.addedToCarBtn}`}>ADDED TO CART</div> 
                    }
                    <div onClick={addedToWishlist} className={Style.heart}>
                        {
                            !hearSelected
                            ? <AiOutlineHeart />
                            : <AiFillHeart className={Style.heartcolored} />
                        }
                    </div>
                </div>
            </div>
         </div>
    )
}

const mapStateToProps = (state) => {
    return {
      cart: state.bookController.cart,
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
      addToCart: (book) => dispatch(addToCart(book)),
      addToWishlist: (book) => dispatch(addToWishlist(book)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookCard);