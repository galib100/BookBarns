import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import styles from "./SignupModal.module.css";

function OtpForm({
  setOpeRegistrationForm,
  loginSignupModalToggle,
  open,
}) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    loginSignupModalToggle("");
  };

  // Verify token
  const verifyOtp = (event) => {
    event.preventDefault();
    setLoading(true);
    const code = otp;
    
    window.confirmationResult
      .confirm(code)
      .then(() => {
        setLoading(false);
        setOpeRegistrationForm(true);
      })
      .catch(() => {
        setLoading(false);
      });
  };

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
        {/* Stepper */}
        <div className={styles.stepperDiv}>
          <div className={`${styles.block}`}>
            <div>1</div>
            <p>Send otp</p>
          </div>
          <div className={`${styles.block} ${styles.activeBlock}`}>
            <div>2</div>
            <p>Verify otp</p>
          </div>
          <div className={`${styles.block}`}>
            <div>3</div>
            <p>Registration</p>
          </div>
        </div>

        {/* Form */}
        <form className={styles.otpSendingForm} onSubmit={verifyOtp}>
          <label>Otp code</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Give the otp code"
          />
          {
            !loading
            ? <button onClick={verifyOtp}>Verify OTP</button>
            : <button>Verifying...</button>
          }
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default OtpForm;
