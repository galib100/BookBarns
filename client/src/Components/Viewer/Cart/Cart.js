import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// Components
import { Nav1 } from "../Navbar/";
import { Footer } from "../Footer";
import CartEmpty from "./CartEmpty";
import EditAddress from "./EditAddress";
import CartBook from "./CartBook";
import { Card, Container } from "react-bootstrap";
// Styles & icons
import Style from "./Cart.module.css";
import { IoChevronDownOutline } from "react-icons/io5";
// Redux actions
import {
  clearTheCart,
  removeFromCart,
} from "../../../Actions/Viewer/BookRelated";
// Api
import axios from "axios";
import { BASE_URL } from "../../../Constants/URL";
import swal from "sweetalert";
import { districts } from "./DistrictData";

const Cart = ({
  cart,
  removeFromCart,
  clearTheCart,
  setOrderStatus,
  user,
  isLogedIn,
}) => {
  const [total, setTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [shippingPrice, setShippingPice] = useState(70);
  const [voucher, setVoucher] = useState("");
  const [voucherObj, setyVoucherObj] = useState({});
  const [discountFromVoucher, setDiscountFromVoucher] = useState(0);
  const [voucherFieldOpen, setVoucheFieldOpen] = useState(false);
  const [addressEditModalOpen, setAddressEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [voucherMessage, setVoucherMessage] = useState({});

  const [matchedDistrict, setMatchedDistrict] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districtSerror, setDistrictError] = useState("");
  const [phone1, setPhone1] = useState("N/A");
  const [phone2, setPhone2] = useState("N/A");
  const [address, setAddress] = useState("N/A");
  const [paymentMethod, setPaymentMethod] = useState("PPOD");

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Calculate total cost for basket items
  const calcTotal = () => {
    let bookPrice = 0;
    let discountPrice = 0;
    cart.map((book) => {
      bookPrice += parseInt(book.amount) * book.price;
      if (book.discounttype === "flat") {
        discountPrice += book.discount;
      } else {
        discountPrice +=
          Math.ceil((book.price * book.discount) / 100) * parseInt(book.amount);
      }
    });
    bookPrice -= discountPrice;

    // timeout is used to reduce the probability of wrong vcalculation due to async operation
    if (discountFromVoucher > 0) {
      let discount;

      if (voucherObj.cupontype.toLowerCase() === "percantage") {
        discount = Math.ceil((bookPrice * voucherObj.amount) / 100);
      } else {
        discount = voucherObj.amount;
      }

      if (discount < bookPrice) {
        bookPrice -= discount;
        setDiscountFromVoucher(discount);
        setVoucherMessage({ type: "success", message: "Voucher Applied." });
      } else {
        setVoucherMessage({
          type: "error",
          message: "Sorry! your total bill is less than the discount.",
        });
      }
    }
    setTotal(bookPrice);
    setTotalDiscount(discountPrice);
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // APPLY VOUCHER
  const applyVoucher = (obj) => {
    let discount;

    if (obj.cupontype.toLowerCase() === "percantage") {
      discount = Math.ceil((total * obj.amount) / 100);
    } else {
      discount = obj.amount;
    }

    if (discount < total) {
      setyVoucherObj(obj);
      setDiscountFromVoucher(discount);
      calcTotal();
      setVoucherMessage({ type: "success", message: "Voucher Applied." });
    } else {
      setVoucherMessage({
        type: "error",
        message: "Sorry! your total bill is less than the discount.",
      });
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Delete from basket
  const deleteItem = (id) => {
    removeFromCart(id);
    calcTotal();
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Increase a item
  const increaseItem = (id) => {
    cart.map((book) => {
      if (book._id === id) {
        book.amount++;
        calcTotal();
      }
    });
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Deccrease a item
  const decreaseItem = (id) => {
    cart.map((book) => {
      if (book._id === id && parseInt(book.amount) === 1) {
        deleteItem(book._id);
      } else if (book._id === id && parseInt(book.amount) > 1) {
        book.amount--;
        calcTotal();
      }
    });
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // CHECK VOUCGHER
  const checkVoucher = (event) => {
    event.preventDefault();
    if (discountFromVoucher === 0) {
      setLoading(true);
      // 1. get token from local storage
      const viewer_saved_token = {
        token: localStorage.getItem("viewer_token"),
      };
      // 2. check token is varified or session timeout
      axios
        .post(`${BASE_URL}/api/verify-user-token`, viewer_saved_token)
        .then((res) => {
          if (res.data.verified) {
            // 3. setup config and token
            const config = {
              headers: { "auth-token": viewer_saved_token.token },
            };
            // 4. make a request to check cupon
            axios
              .get(`${BASE_URL}/api/admin/checkCuponCode/${voucher}`, config)
              .then((res) => {
                //  5. if success then set cupon message
                applyVoucher(res.data);
                setLoading(false);
              })
              .catch(() => {
                setVoucherMessage({
                  type: "error",
                  message: "Sorry! voucher is not valid.",
                });
                // 6. if error occurs swal a message
                setLoading(false);
              });
          } else {
            // 7. If session time out. then swal a message
            swal("Session Timeout", "Please reload and login again.", "error");
            setLoading(false);
          }
        })
        .catch(() => {
          // 8. if token not varified or session timeout, remove all data from local storage
          localStorage.removeItem("viewer");
          localStorage.removeItem("viewer_token");
          setLoading(false);
        });
    } else {
      setVoucherMessage({
        type: "error",
        message: "A vouchar is already applied!",
      });
    }
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // SHOW LOGIN POPUP
  const showLoginPopup = (event) => {
    event.preventDefault();
    swal("Auth Error", "Please login to access this feature.", "error");
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // SETUP PAYMENT METHOD
  const setupPaymentMethod = (event) => {
    event.preventDefault();
    const method = event.target.value;
    if (method === "PPOD") {
      setShippingPice(70);
    } else if (method === "PPID") {
      setShippingPice(50);
    } else if (method === "CDOD") {
      setShippingPice(100);
    } else if (method === "CDID") {
      setShippingPice(70);
    }
    setPaymentMethod(method);
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // SETUP ADDRESS
  const setupAddress = (ephon1, ephon2, eaddess) => {
    setPhone1(ephon1);
    setPhone2(ephon2);
    setAddress(eaddess);
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // SETUP DELIVERY PLACE
  const searchDistrict = (event) => {
    event.preventDefault();
    let text = event.target.value.toLowerCase();
    setSelectedDistrict(event.target.value);
    setDistrictError("");
    let matches = [];

    if (text !== "") {
      matches = districts.filter((district) => {
        const regex = new RegExp(`^${text}.*$`);
        return district.name.toLowerCase().match(regex);
      });

      if (matches.length > 10) {
        matches = matches.slice(0, 10);
      }
    }
    setMatchedDistrict(matches);
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // SETUP DELIVERY PLACE
  const districtSelection = (district) => {
    setMatchedDistrict([]);
    setSelectedDistrict(district.name);
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // MAKE A ORDER
  const orderSomeBooks = () => {
    if (selectedDistrict === "") {
      setDistrictError("District name required!");
    } else {
      setOrderLoading(true);
      // 1. process object to send
      let orderdBooks = [];
      cart.map((book) => {
        orderdBooks.push({ bookId: book._id, quantity: book.amount });
      });
      const values = {
        phone: phone1,
        phone2: phone2 !== "" ? phone2 : "N/A",
        address: address,
        appliedcupon: {
          cuponcode: voucherObj.cuponcode,
          cupontype: voucherObj.cupontype,
          amount: voucherObj.amount,
        },
        bookprice: total,
        totalprice: total + shippingPrice,
        paymentmethod: paymentMethod,
        order: orderdBooks,
        zila: selectedDistrict,
      };
      // 2. get token from local storage
      const viewer_saved_token = {
        token: localStorage.getItem("viewer_token"),
      };
      // 3. check token is varified or session timeout
      axios
        .post(`${BASE_URL}/api/verify-user-token`, viewer_saved_token)
        .then((res) => {
          if (res.data.verified) {
            // 4. setup config and token
            const config = {
              headers: { "auth-token": viewer_saved_token.token },
            };
            // 5. make a request to order
            axios
              .post(`${BASE_URL}/api/order`, values, config)
              .then((res) => {
                //  6. if success then set order-status to success
                setOrderStatus("success");
                clearTheCart();
                setOrderLoading(false);
                // console.log(res.data);
              })
              .catch(() => {
                //  7. if fauiled then set order-status to error
                setOrderStatus("error");
                setOrderLoading(false);
              });
          } else {
            // 8. If session time out. then swal a message
            swal("Session Timeout", "Please reload and login again.", "error");
            setOrderLoading(false);
          }
        })
        .catch(() => {
          // 9. if token not varified or session timeout, remove all data from local storage
          localStorage.removeItem("viewer");
          localStorage.removeItem("viewer_token");
          setOrderLoading(false);
        });
    }
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RUN WHEN CARTS VALUE IS CHANGED
  useEffect(() => {
    if (isLogedIn) {
      setPhone1(user.phone1);
      setPhone2(user.phone2);
      setAddress(user.address);
    }
    calcTotal();
  }, [JSON.stringify(cart), discountFromVoucher, shippingPrice, isLogedIn]);

  // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RUN AT FIRST LOAD
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Nav1 />
      {cart.length === 0 ? (
        <CartEmpty />
      ) : (
        <div className={` ${Style.cartPage}`}>
          <Container className={Style.cartContainer}>
            <div className={Style.myRow}>
              <div className={`${Style.CartPart}`}>
                <div className={`${Style.CartHead}`}>
                  <div className={Style.cartHeadLeft}>
                    <h1>
                      Cart <span>({cart.length} items)</span>
                    </h1>
                  </div>

                  <div className={Style.cartHeadRight}>
                    <h3>Total: {total} Tk</h3>
                    <p>
                      You are saving total <b>{totalDiscount}Tk</b>
                    </p>
                    <p>
                      {discountFromVoucher > 0 ? (
                        <span>
                          After addding voucher you have discount{" "}
                          <b>{discountFromVoucher}</b>Tk.
                        </span>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                </div>
                {/* Book List */}
                <div className={Style.selectedBooks}>
                  {cart.map((book) => (
                    <CartBook
                      book={book}
                      increaseItem={increaseItem}
                      decreaseItem={decreaseItem}
                      deleteItem={deleteItem}
                    />
                  ))}
                </div>

                {isLogedIn ? (
                  !orderLoading ? (
                    <button className={Style.odrBtn} onClick={orderSomeBooks}>
                      Place Order
                    </button>
                  ) : (
                    <button className={Style.odrBtn}>Placing...</button>
                  )
                ) : (
                  <button className={Style.odrBtn} onClick={showLoginPopup}>
                    Place Order
                  </button>
                )}
              </div>

              <div className={Style.calculation}>
                <Card className={`mb-4`}>
                  <h5 className={Style.addTitle}>Checkout Summary</h5>
                  <hr />
                  <Card.Body className={Style.cardBody}>
                    <form className={Style.deliverySelectionForm}>
                      <select
                        className="form-control"
                        onChange={setupPaymentMethod}
                      >
                        <option value="PPOD">
                          Pre-Paid Outside Dhaka - 70Tk
                        </option>
                        <option value="PPID">
                          Pre-Paid Inside Dhaka - 50Tk
                        </option>
                        <option value="CDOD">
                          Cash on delivary Outside Dhaka - 100Tk
                        </option>
                        <option value="CDID">
                          Cash on delivary Outside Dhaka - 70Tk
                        </option>
                      </select>

                      <input
                        type="text"
                        placeholder="Select delivery district"
                        onChange={(e) => searchDistrict(e)}
                        value={selectedDistrict}
                      />
                      <small style={{ color: "red" }}>{districtSerror}</small>
                      {matchedDistrict.length > 0 ? (
                        <div className={Style.districtResult}>
                          {matchedDistrict.map((district) => (
                            <div
                              className={Style.filteredDist}
                              onClick={() => districtSelection(district)}
                            >
                              {district.name} - {district.bn_name}
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </form>

                    <div className={Style.calcItem}>
                      <div className={`float-left`}>SubTotal </div>
                      <div className="float-right">
                        {/* {total}Tk */}
                        {discountFromVoucher > 0 ? (
                          <p>
                            <strike>{total + discountFromVoucher}Tk</strike>
                            {total}Tk
                          </p>
                        ) : (
                          <p>{total}Tk</p>
                        )}
                      </div>
                    </div>
                    <div className={Style.calcItem}>
                      <div className={`float-left`}>Shipping </div>
                      <div className="float-right"> {shippingPrice}Tk</div>
                    </div>
                    <div className={Style.calcItem}>
                      <div className={`float-left`}>Total </div>
                      <div className="float-right">
                        {" "}
                        {total + shippingPrice}Tk
                      </div>
                    </div>
                    <div className={Style.calcItem}>
                      <div className={`float-left`}>Payable Total </div>
                      <div className="float-right">
                        <b>{total + shippingPrice}Tk</b>
                      </div>
                    </div>
                  </Card.Body>

                  {/* /////////////////////////////////////////////// */}
                  {/* Voucher option */}
                  <Card.Footer
                    className={
                      !voucherFieldOpen
                        ? `${Style.voucherBlockClose}`
                        : `${Style.voucherBlockOpen}`
                    }
                  >
                    <div
                      className={Style.voucherBlockHeading}
                      onClick={() => setVoucheFieldOpen(!voucherFieldOpen)}
                    >
                      <div>Add Promo code or Gift voucher</div>
                      <div>
                        <IoChevronDownOutline />
                      </div>
                    </div>
                    <div
                      className={
                        !voucherFieldOpen
                          ? `${Style.voucherFormClose}`
                          : `${Style.voucherFormOpen}`
                      }
                    >
                      <form>
                        <div>
                          <label>Promo Code</label>
                          <input
                            type="text"
                            placeholder="Enter promo code here"
                            value={voucher}
                            onChange={(e) => {
                              setVoucher(e.target.value);
                            }}
                          />
                        </div>
                        {voucherMessage.type === "success" ? (
                          <small style={{ color: "#13C37B" }}>
                            {" "}
                            {voucherMessage.message}
                          </small>
                        ) : (
                          <small style={{ color: "red" }}>
                            {" "}
                            {voucherMessage.message}
                          </small>
                        )}
                        {!loading ? (
                          isLogedIn ? (
                            <button onClick={checkVoucher}>Check</button>
                          ) : (
                            <button onClick={showLoginPopup}>Check</button>
                          )
                        ) : (
                          <button>Checking...</button>
                        )}
                      </form>
                    </div>
                  </Card.Footer>
                </Card>

                {/* ////////////////////////////////////////////////// */}
                {/* Shippinmg Address */}
                <Card className={Style.shipingAdd}>
                  <h5 className={Style.addTitle}> Shipping Address</h5>
                  <hr />
                  <Card.Body className={Style.cardBody}>
                    <div className={Style.calcItem}>
                      <div className={`float-left`}>Phone No.</div>
                      <div className="float-right">{phone1}</div>
                    </div>
                    <div className={Style.calcItem}>
                      <div className={`float-left`}>Alt. Phone No.</div>
                      <div className="float-right">{phone2 !== "" ? phone2 : "N/A"}</div>
                    </div>
                    <div className={Style.calcItem}>
                      <div className={`float-left`}>Shipping Address.</div>
                      <div className="float-right">{address}</div>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    Need To Change Address?{" "}
                    <span
                      onClick={() => {
                        setAddressEditModalOpen(true);
                      }}
                      style={{
                        marginRight: "10px",
                        color: "#d2935a",
                        cursor: "pointer",
                      }}
                    >
                      Edit Here
                    </span>
                  </Card.Footer>
                </Card>

                {isLogedIn ? (
                  !orderLoading ? (
                    <button
                      className={Style.submitBtnForMobile}
                      onClick={orderSomeBooks}
                    >
                      Place Order
                    </button>
                  ) : (
                    <button className={Style.submitBtnForMobile}>
                      Placing...
                    </button>
                  )
                ) : (
                  <button
                    className={Style.submitBtnForMobile}
                    onClick={showLoginPopup}
                  >
                    Place Order
                  </button>
                )}
              </div>
            </div>
          </Container>
        </div>
      )}
      {addressEditModalOpen ? (
        <EditAddress
          setAddressEditModalOpen={setAddressEditModalOpen}
          setupAddress={setupAddress}
        />
      ) : null}
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.bookController.cart,
    user: state.viewer.currentUser && state.viewer.currentUser.currentUser,
    isLogedIn: state.viewer.isLogedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    clearTheCart: () => dispatch(clearTheCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
