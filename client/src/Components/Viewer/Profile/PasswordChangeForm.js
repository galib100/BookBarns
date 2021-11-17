import axios from "axios";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import swal from "sweetalert";
import { BASE_URL } from "../../../Constants/URL";
import Style from "../../../Views/Viewer/Profile/Profile.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function PasswordChangeForm({ setPasswordChangeForm }) {
  const [oldPass, setOldPass] = useState("");
  const [newPass1, setNewPass1] = useState("");
  const [newPass2, setNewPass2] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passType, setPassType] = useState(false);
  const [npassType, setNpassType] = useState(false);
  const [cnpassType, setcnpassType] = useState(false);

  //    VALIDATION CHECK
  const validationCheck = () => {
    if (oldPass && newPass1 && newPass2) {
      if (newPass1 === newPass2) {
        return true;
      } else {
        setError("Password Mismatch.");
        return false;
      }
    } else {
      setError("Required all fields.");
      return false;
    }
  };

  //   EDIT PASSWORD
  const editPassword = (event) => {
    event.preventDefault();

    if (validationCheck()) {
      setLoading(true);
      // 1. get token from local storage
      const viewer_saved_token = {
        token: localStorage.getItem("viewer_token"),
      };
      const viewer = JSON.parse(localStorage.getItem("viewer"));
      // 2. check token is varified or session timeout
      axios
        .post(`${BASE_URL}/api/verify-user-token`, viewer_saved_token)
        .then((res) => {
          if (res.data.verified) {
            // 3. setup config and value to send a post request for review
            const config = {headers: { "auth-token": viewer_saved_token.token },};
            const value = { userId: viewer._id, oldPass: oldPass, newPass: newPass1, };
            // 4. make a request to submit new requ
            axios
              .patch(`${BASE_URL}/api/user/password/update`, value, config)
              .then((res) => {
                swal(
                  "Success",
                  "Your profile is updated successfully.",
                  "success"
                );
                setLoading(false);
                setPasswordChangeForm(false);
              })
              .catch((e) => {
                // 6. if error occurs swal a message
                setError(e.message)
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
      <div className={`${Style.profileEditForm} ${Style.passChangeForm}`}>
        <h3>Change Password</h3>
        <div
          className={Style.icon}
          onClick={() => setPasswordChangeForm(false)}
        >
          <IoMdClose />
        </div>

        <form>
          <div className={Style.profileFormInputCont}>
            <label>Old Password</label>
            <div className={Style.inputBox}>
              <input
                type={!passType ? "password" : "text"}
                value={oldPass}
                onChange={(e) => {
                  setOldPass(e.target.value);
                }}
              />
              <div className={Style.logo} onClick={() => setPassType(!passType)}>
                {passType ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </div>
            </div>
          </div>
          <div className={Style.profileFormInputCont}>
            <label>New Password</label>
            <div className={Style.inputBox}>
              <input
                type={!npassType ? "password" : "text"}
                value={newPass1}
                onChange={(e) => {
                  setNewPass1(e.target.value);
                }}
              />
              <div className={Style.logo} onClick={() => setNpassType(!npassType)}>
                {npassType ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </div>
            </div>
          </div>
          <div className={Style.profileFormInputCont}>
            <label>Confirm Password</label>
            <div className={Style.inputBox}>
              <input
                type={!cnpassType ? "password" : "text"}
                value={newPass2}
                onChange={(e) => {
                  setNewPass2(e.target.value);
                }}
              />
              <div className={Style.logo} onClick={() => setcnpassType(!cnpassType)}>
              {cnpassType ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </div>
            </div>
          </div>

          <small style={{ color: "red" }}>{error}</small>
          {
            !loading
            ? <button onClick={editPassword}>Save</button>
            : <button onClick={editPassword}>Processing....</button>
          }
        </form>
      </div>
    </div>
  );
}

export default PasswordChangeForm;
