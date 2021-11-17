import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import styles from "./SignupModal.module.css";
import firebase from "./firebaseConfig";
import axios from "axios";
import { BASE_URL } from "../../../Constants/URL";

function SignupPhoneVerification({
  loginSignupModalToggle,
  open,
  setOTP,
  setMobileNumber,
}) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // CONTROL MODAL
  const handleClose = () => {
    loginSignupModalToggle("");
  };
  const signupModal = () => {
    loginSignupModalToggle("login");
  };

  // PHONE NUMBER VALIDATION
  const phoneNumberValidation = () => {
    if (phone) {
      if (phone[0] !== "0" && phone[1] !== "1") {
        setError("Invalid number, must be start with 01.");
        return false;
      } else if (phone.length !== 11) {
        setError("Phone number length must be '11'");
        return false;
      } else {
        return true;
      }
    } else {
      setError("Required all fields.");
      return false;
    }
  };

  // CAPTCHA CONFIGARATION
  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          onSignInSubmit();
        },
        defaultCountry: "IN",
      }
    );
  };

  // SIGON IN CONFIGARATION
  const onSignInSubmit = () => {
    setLoading(true);
    configureCaptcha();
    const phoneNumber = "+88" + phone;
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setMobileNumber(phone);
        setOTP(true);
        setLoading(false);
      })
      .catch(() => {
        setTimeout(() => {
          setError("Something went wrong! Try again");
        }, 1000);
        setLoading(false);
      });
  };

  // SEND OTP
  const sendOtp = (event) => {
    event.preventDefault();
    setError("");
    if (phoneNumberValidation()) {
      // 1. chekc the phone number
      setLoading(true);
      axios
        .get(`${BASE_URL}/api/phone-no-existance-check/${phone}`)
        .then((res) => {
          if(res.data._id){
            setError("This phone number is used."); 
          } else{
            onSignInSubmit();
          }
          setLoading(false);
        })
        .catch((err) => {
          setError("Something went wrong! Please try again.")
        });
    }
  };

  useEffect(() => {
    setError("");
  }, []);

  return (
    <Modal
      onHide={handleClose}
      show={open === "signup" ? true : false}
      backdrop="static"
      keyboard={false}
      className={styles.modal}
    >
      <Modal.Header className={`${styles.heading}`} closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* stepper */}
        <div className={styles.stepperDiv}>
          <div className={`${styles.block} ${styles.activeBlock}`}>
            <div>1</div>
            <p>Send otp</p>
          </div>
          <div className={`${styles.block}`}>
            <div>2</div>
            <p>Verify otp</p>
          </div>
          <div className={`${styles.block}`}>
            <div>3</div>
            <p>Registration</p>
          </div>
        </div>
        {/* form */}
        <form className={styles.otpSendingForm} onSubmit={sendOtp}>
          <div id="sign-in-button"></div>
          <label>Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Active phone number"
          />
          <small style={{ color: "red", marginTop: "10px" }}>{error}</small>
          {!loading ? (
            <button onClick={sendOtp}>Send OTP</button>
          ) : (
            <button>Sending..</button>
          )}
        </form>
        <p className={styles.haveAnAccount} style={{ marginTop: "10px" }}>
          Already have an account?
          <span onClick={() => signupModal()}>Sign in</span>
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default SignupPhoneVerification;
