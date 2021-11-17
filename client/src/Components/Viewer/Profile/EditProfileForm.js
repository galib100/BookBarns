import React, { useEffect, useState } from "react";
// FOR API CALL
import axios from "axios";
import { BASE_URL } from "../../../Constants/URL";
import swal from "sweetalert";
// REDUX & ACTION
import { connect } from "react-redux";
import { setUser, clearUser } from "../../../Actions/Viewer/userAction";
import { loginSignupModalToggle } from "../../../Actions/Viewer/LandingPageActions";
// STYLES & ASSETS
import { IoMdClose } from "react-icons/io";
import Style from "../../../Views/Viewer/Profile/Profile.module.css";

function EditProfileForm({ setEditProfileForm, loginSignupModalToggle, user, setUser }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
    setPhone1(user.phone1);
    setPhone2(user.phone2);
    setAddress(user.address);
  }, []);

  //    VALIDATION CHECK
  const validationCheck = () => {
    if(!username){ setError("Required Username."); return false; }
    if(!email){ setError("Required Email."); return false; }
    if(!address){ setError("Required Address."); return false; }
    if(!phone1){ setError("Required Phone number."); return false; } 
    else if(phone1.length !== 11 || phone1[0] !== "0" || phone1[1] !== "1"){
      setError("Invalid phone no.");
      return false;
    }
    if(phone2 && (phone2.length !== 11 || phone2[0] !== "0" || phone2[1] !== "1")){
       setError("Invalid alt. phone no.");
      return false;
    }

    return true;
  };

  //   CLEAR ALL FIELDS
  const clearFields = () => {
    setUsername("");
    setEmail("");
    setPhone1("");
    setPhone2("");
    setAddress("");
  };

  // EDIT PROFILE
  const editInfo = (event) => {
    event.preventDefault();

    if (validationCheck()) {
      setLoading(true);
      // 1. get token from local storage
      const viewer_saved_token = {token: localStorage.getItem("viewer_token")};
      // 2. check token is varified or session timeout
      axios
        .post(`${BASE_URL}/api/verify-user-token`, viewer_saved_token)
        .then((res) => {
          if (res.data.verified) {
            // 3. setup config and value to send a post request for review
            const config = {headers: { "auth-token": viewer_saved_token.token },};
            const value = { username, email, phone1, phone2, address };
            // 4. make a request to submit a review
            axios
              .patch(`${BASE_URL}/api/user/update/${user._id}`, value, config)
              .then((res) => {
                //  5. clear & update local user info
                localStorage.removeItem("viewer");
                localStorage.setItem('viewer', JSON.stringify(res.data));
                // 6. Update Reducer
                const userData = { token: localStorage.getItem("viewer_token"), currentUser: res.data }
                setUser(userData)
                // 7. Clear Fields
                clearFields();
                // 8. Close modal
                setEditProfileForm(false);
                setLoading(false);
                // 9. Give success message
                swal( "Success", "Your profile is updated successfully.", "success" );
              })
              .catch(() => {
                // 6. if error occurs swal a message
                swal( "We are sorry", "Something went wrong! Please try again.", "error" );
                setLoading(false);
              });
          } else {
            // 7. If session time out. then swal a message
            swal("Session Timeout", "Please reload and login again.", "error");
          }
        })
        .catch(() => {
          // 8. if token not varified or session timeout, remove all data from local storage
          localStorage.removeItem("viewer");
          localStorage.removeItem("viewer_token");
          setLoading(false);
        });
    }
  };

  return (
    <div className={Style.profileEditFormContainer}>
      <div className={Style.profileEditForm}>
        <h3>Edit Information</h3>
        <div className={Style.icon} onClick={() => setEditProfileForm(false)}>
          <IoMdClose />
        </div>

        <form>
          <div className={Style.profileFormInputCont}>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className={Style.profileFormInputCont}>
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className={Style.profileFormInputCont}>
            <label>Phone No.</label>
            <input
              type="text"
              value={phone1}
              onChange={(e) => {
                setPhone1(e.target.value);
              }}
              disabled
            />
          </div>
          <div className={Style.profileFormInputCont}>
            <label>Alt Phone No.</label>
            <input
              type="text"
              value={phone2}
              onChange={(e) => {
                setPhone2(e.target.value);
              }}
            />
          </div>
          <div className={Style.profileFormInputCont}>
            <label>Adress</label>
            <input
              className={Style.address}
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
          <small style={{ color: "red" }}>{error}</small>
          {
            !loading
            ? <button onClick={editInfo}>Save</button>
            : <button onClick={editInfo}>Processing...</button>
          }
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.viewer.currentUser && state.viewer.currentUser.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (data) => dispatch(setUser(data)),
    clearUser: (data) => dispatch(clearUser(data)),
    loginSignupModalToggle: (type) => dispatch(loginSignupModalToggle(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileForm);
