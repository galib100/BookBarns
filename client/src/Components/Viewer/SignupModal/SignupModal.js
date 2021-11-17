import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// ACTIONS
import { setUser, clearUser } from "../../../Actions/Viewer/userAction";
import { loginSignupModalToggle } from "../../../Actions/Viewer/LandingPageActions";
// COMPONENTS
import SignupForm from "./SignupForm";
import SignupPhoneVerification from "./SignupPhoneVerification";
import OtpForm from "./OtpForm";

const SignupModal = ({ loginSignupModalToggle, open }) => {
  const [openOTP, setOTP] = useState(false);
  const [openRegistrationForm, setOpeRegistrationForm] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  useEffect(() => {}, [openOTP, openRegistrationForm]);

  return (openRegistrationForm ? (
    <SignupForm
      open={open}
      mobileNumber={mobileNumber}
      loginSignupModalToggle={loginSignupModalToggle}
      setUser={setUser}
    />
  ) : openOTP ? (
    <OtpForm
      open={open}
      setOTP={setOTP}
      setOpeRegistrationForm={setOpeRegistrationForm}
      loginSignupModalToggle={loginSignupModalToggle}
    />
  ) : (
    <SignupPhoneVerification
      open={open}
      loginSignupModalToggle={loginSignupModalToggle}
      setOTP={setOTP}
      setMobileNumber={setMobileNumber}
    />
  ));
};

const mapStateToProps = (state) => ({
  open: state.pages.login_signup_modal,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (data) => dispatch(setUser(data)),
    clearUser: (data) => dispatch(clearUser(data)),
    loginSignupModalToggle: (type) => dispatch(loginSignupModalToggle(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupModal);
