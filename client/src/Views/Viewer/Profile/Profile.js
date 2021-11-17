import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { clearUser, setUser } from "../../../Actions/Viewer/userAction";

// STYLES, MAGES & ASSETS
import Style from "./Profile.module.css";
import { AiOutlineEdit, AiOutlineMail, AiFillPhone, AiOutlineLock } from "react-icons/ai";
import { ImLocation } from "react-icons/im";

// COMPONENTS & ACTIONS
import { Nav1 } from "../../../Components/Viewer/Navbar/";
import { Footer } from "../../../Components/Viewer/Footer";
import Orders from "../../../Components/Viewer/Profile/Orders";
import ProfileLoading from "./ProfileLoading";
import EditProfileForm from "../../../Components/Viewer/Profile/EditProfileForm";
import PasswordChangeForm from "../../../Components/Viewer/Profile/PasswordChangeForm";
import axios from "axios";
import { BASE_URL } from "../../../Constants/URL";
import swal from "sweetalert";

function Profile({ user, setUser, clearUser }) {
  const [loading, setLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [editProfileForm, setEditProfileForm] = useState(false);
  const [passwordChangeForm, setPasswordChangeForm] = useState(false);
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  // Sign out functionalities
  const signout = () => {
    localStorage.removeItem("viewer");
    localStorage.removeItem("viewer_token");
    clearUser();
    history.push("/");
    swal("Successfully signed out.", "", "success");
  }

  useEffect(() => {
    if (user === null) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [[JSON.stringify(user)]]);

  useEffect(() => {
    setOrderLoading(true);
    // 1. get token from local storage
    const viewer_saved_token = { token: localStorage.getItem("viewer_token") };
    // 2. check token is varified or session timeout
    axios
      .post(`${BASE_URL}/api/verify-user-token`, viewer_saved_token)
      .then((res) => {
        if (res.data.verified) {
          // 3. setup config and value to send a post request for review
          const config = {headers: {"auth-token": viewer_saved_token.token }};
          // 4. make a request to fetch order
          axios
            .get(`${BASE_URL}/api/orders/for-particular/${user._id}`, config)
            .then((res) => {
              const data = res.data.reverse();
              setOrders(data); setOrderLoading(false);
            })
            .catch((err) => {setOrderLoading(false);});
        } else {
          // 7. If session time out. then swal a message
          swal("Session Timeout", "Please reload and login again.", "error");
          setOrderLoading(false);
        }
      })
      .catch((err) => {
        // 8. if token not varified or session timeout, remove all data from local storage
        localStorage.removeItem("viewer");
        localStorage.removeItem("viewer_token");
        swal("Session Timeout", "Please reload and login again.", "error");
        setOrderLoading(false);
      });
  }, []);

  return (
    <>
      <Nav1 />
      {!loading && !orderLoading ? (
        <div className={Style.profileContainer}>
          <div className={Style.profile__banner}></div>
          <div className={Style.profe__infobolck}>
            {/* /////////////////////////////////////////////////////////////////// */}
            {/* Name & Options */}
            <div className={Style.profile__name}>
              <div className={Style.name}>
                <h3>{user && user.username}</h3>
              </div>

              <div className={Style.option}>
                <div className={`${Style.editButton} ${Style.button}`} onClick={() => { setEditProfileForm(true) }} >
                  <div>Edit Informations</div>
                  <div> <AiOutlineEdit /> </div>
                </div>
                <div className={`${Style.button}`} onClick={() => { setPasswordChangeForm(true); }} >
                  Change Password
                </div>
                <div className={`${Style.button}`} onClick={signout}>Sign out</div>
              </div>

            {/* for mobile */}
              <div className={`${Style.optionForMobile}`}>
                <div className={`${Style.buttonMobile}`} onClick={() => { setEditProfileForm(true) }} >
                  <div> <AiOutlineEdit /> </div>
                </div>
                <div className={`${Style.buttonMobile}`} onClick={() => { setPasswordChangeForm(true); }} >
                  <div> <AiOutlineLock /> </div>
                </div>
              </div>
            </div>

            {/* /////////////////////////////////////////////////////////////////// */}
            {/* Basic info & Images */}
            <div className={Style.profile__basicInfo}>
              <div className={Style.profile__basic}>
                {/* Email */}
                <div className={Style.info}>
                  <div className={Style.info__logo}>
                    <AiOutlineMail />
                  </div>
                  <div className={Style.info__value}>
                    <h6>{user && user.email}</h6>
                    <p>E-mail Address</p>
                  </div>
                </div>
                {/* Phone */}
                <div className={Style.info}>
                  <div className={Style.info__logo}>
                    <AiFillPhone />
                  </div>
                  <div className={Style.info__value}>
                    <h6>{user && user.phone1}</h6>
                    <p>Phone Number</p>
                  </div>
                </div>
                {/* Address */}
                <div className={Style.info}>
                  <div className={Style.info__logo}>
                    <ImLocation />
                  </div>
                  <div className={Style.info__value}>
                    <h6>{user && user.address}</h6>
                    <p>Address</p>
                  </div>
                </div>
                {/* Alt. Phone */}
                <div className={Style.info}>
                  <div className={Style.info__logo}>
                    <AiFillPhone />
                  </div>
                  <div className={Style.info__value}>
                    <h6>{user && user.phone2 ? user.phone2 : "N/A" }</h6>
                    <p>Alt. Phone Number</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={Style.line}></div>

            {/* /////////////////////////////////////////////////////////////////// */}
            {/* Orders */}
            <Orders orders={orders} />
          </div>
        </div>
      ) : (
        <ProfileLoading />
      )}

      {/* profile edit form */}
      {editProfileForm ? (
        <EditProfileForm setEditProfileForm={setEditProfileForm} />
      ) : null}
      {/* password change form */}
      {passwordChangeForm ? (
        <PasswordChangeForm setPasswordChangeForm={setPasswordChangeForm} />
      ) : null}

      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogedIn: state.viewer.isLogedIn,
    user: state.viewer.currentUser && state.viewer.currentUser.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (data) => dispatch(setUser(data)),
    clearUser: (data) => dispatch(clearUser(data)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
