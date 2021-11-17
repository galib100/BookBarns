import React, { useState } from "react";
import Style from "./Cart.module.css";
import { IoMdClose } from "react-icons/io";

function EditAddress({ setAddressEditModalOpen, setupAddress }) {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [address, setAddress] = useState("");
  const [error, sertError] = useState("");

  // VALIDATION CHECK
  const validationCheck = () => {
    if (p1 && p2 && address) {
      if (p1.length !== 11 || p1[0] !== "0" || p1[1] !== "1") {
        sertError("Phone number is invalid.");
        return false;
      } else if (p2.length !== 11 || p2[0] !== "0" || p2[1] !== "1") {
        sertError("Alternative phone number is invalid.");
        return false;
      } else {
        return true;
      }
    } else {
      sertError("Required all fields");
      return false;
    }
  };

  // EDIT ADDRESS NAV IF DATA IS VALID
  const editAddressNow = (event) => {
    event.preventDefault();
    if (validationCheck()) {
      setupAddress(p1, p2, address);
      setAddressEditModalOpen(false);
    }
  };

  return (
    <div className={Style.addressModalContainer}>
      <dvi className={Style.addressModal}>
        <h3>Edit Address</h3>
        <div
          className={Style.icon}
          onClick={() => setAddressEditModalOpen(false)}
        >
          <IoMdClose />
        </div>

        <form>
          <div className={Style.inputContainer}>
            <label>Phone No.</label>
            <input
              type="text"
              placeholder="Active Phone No."
              value={p1}
              onChange={(e) => setP1(e.target.value)}
            />
          </div>
          <div className={Style.inputContainer}>
            <label>Alternative Phone No.</label>
            <input
              type="text"
              placeholder="Alternative Phone No."
              value={p2}
              onChange={(e) => setP2(e.target.value)}
            />
          </div>
          <div className={Style.inputContainer}>
            <label>Order Address</label>
            <input
              type="text"
              placeholder="Where to deliver"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <small style={{ color: "red", marginTop: "35px" }}>{error}</small>
          <button className={Style.submit} onClick={editAddressNow}>
            Submit
          </button>
        </form>
      </dvi>
    </div>
  );
}

export default EditAddress;
