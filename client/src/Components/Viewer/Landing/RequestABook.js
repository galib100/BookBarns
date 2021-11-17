import React, { useState } from "react";
import Style from "./BannerForLandingPage.module.css";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { BASE_URL } from "../../../Constants/URL";
import swal from "sweetalert";

function RequestABook({setShowCardForRequest}) {
  const [bookname, setBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // CLEAR FIELDS
  const clearFields = () => {
    setBookname("");
    setAuthor("");
    setPhone("");
    setSuccess(true);
  }

  // REQUIRED FILED CHECK
  const validationCheck = () => {
    if(bookname && author && phone){
      if(phone.length !== 11 || phone[0] !== '0' || phone[1] !== '1'){
        setError("Invalid phone number.");
        return false;
      } else{
        return true;
      }
    } else{
      setError("Required all fields.");
      return false;
    }
  }

  // PLACE A ORDER
  const placeArequestOrder = (event) => {
    event.preventDefault();
    if(validationCheck()){
      if (localStorage.getItem("viewer_token")) {
        const viewer_saved_token = {token: localStorage.getItem("viewer_token"),};
        setLoading(true);
  
        axios
          .post(`${BASE_URL}/api/verify-user-token`, viewer_saved_token)
          .then((res) => {
            if(res.data.verified){
              const config = { headers: { "auth-token": viewer_saved_token.token }};
              const value = { "name": bookname, "author": author, "phone": phone };
  
              axios.post(`${BASE_URL}/api/request-book`, value, config)
              .then((res) => {
                clearFields();
                swal("Request Recieved!", "We will contact you as soon as possible", "success");
                setLoading(false);
              })
              .catch((err) => {
                console.log(err.message);
                setLoading(false);
              })
            }
          })
          .catch((err) => {
            localStorage.removeItem("viewer");
            localStorage.removeItem("viewer_token");
            setLoading(false);
          });
      } 
    }
  };

  return (
    <div className={Style.requestabookContainer}>
      <div className={Style.requestabookForm}>
        <h3>Request a book</h3>
        <p>
          If you are looking for a book that is not on our website, you can
          request us for that book by filling out this form.
        </p>
        <div className={Style.icon} onClick={() => setShowCardForRequest(false)}>
          <IoMdClose />
        </div>

        <form>
          <div className={Style.requestFormInputContainer}>
            <label>Book Name</label>
            <input
              placeholder="Full name of your book"
              value={bookname}
              onChange={(e) => {
                setBookname(e.target.value);
              }}
            />
          </div>
          <div className={Style.requestFormInputContainer}>
            <label>Author Name</label>
            <input
              placeholder="Author of the book"
              value={author}
              onChange={(e) => {setAuthor(e.target.value)}}
            />
          </div>
          <div className={Style.requestFormInputContainer}>
            <label>Phone Number</label>
            <input
              placeholder="Your phone number"
              value={phone}
              onChange={(e) => {setPhone(e.target.value)}}
            />
          </div>
          <span style={{color: "red", fontSize: "12"}}>{error}</span>
          {
            !loading
            ? <button onClick={placeArequestOrder}>Place Order</button>
            : <button>Processing...</button>
          }
        </form>
      </div>
    </div>
  );
}

export default RequestABook;
