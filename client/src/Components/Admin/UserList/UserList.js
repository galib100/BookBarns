import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Table } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { VscTrash } from "react-icons/vsc";
import { BsCloudDownload } from "react-icons/bs";
import styles from "./UserList.module.css";
import { ShadowCard } from "../../shared/ShadowCard";
import swal from "sweetalert";
import { connect } from "react-redux";
import { useEffect } from "react";
import {
  deleteUserProfile,
  getUserProfile,
} from "../../../Actions/Admin/UserProfileActions";
import axios from "axios";
import { BASE_URL } from "../../../Constants/URL";
const FileDownload = require("js-file-download");

const UserList = ({ data, loading, getUserProfile, deleteUserProfile }) => {
  const [userList, setuserList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (!loading) {
      setuserList(data);
    }
  }, [data]);

  const deleteHandeler = (id, title) => {
    swal({
      title: "Are you sure you want to Delete?",
      text: `User : ${title}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        //DELETE ACTION OF THE BOOK USING ID
        let check = await deleteUserProfile(id);
        if (check) {
          swal("User has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Something went wrong!", {
            icon: "warning",
          });
        }
      }
    });
  };

  const userRoute = (id) => {
    getUserProfile(id);
    setTimeout(() => {}, 1000);
    history.push(`/admin/users/${id}`);
  };

  const searchHandeler = (text) => {
    if (text !== "") {
      setuserList(
        data.filter((item) => {
          return (
            item.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
            item.email.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
            item.phone.toLocaleLowerCase().includes(text) ||
            item.phone2.toLocaleLowerCase().includes(text)
          );
        })
      );
    } else {
      setuserList(data);
    }
    setSearchText(text);
  };

  const downloadFunc = async () => {
    let config = { responseType: "blob" };
    const res = await axios.get(`${BASE_URL}/api/admin/allusercsv`, config);
    if (res.data) {
      let now = Date.now();
      let date = new Date(now).toISOString();
      date = date.split("T")[0];
      FileDownload(res.data, `users_${date}.csv`);
    }
  };

  return (
    <>
      {!loading && (
        <div className="pr-md-3 pr-0">
          <ShadowCard>
            <div className="p-3 bg-white">
              <div className="d-flex flex-md-row flex-column justify-content-between align-items-center pb-3">
                <div className="">
                  <h4>All Registered Users</h4>
                </div>
                <div className="d-flex flex-md-row flex-column justify-content-between align-items-center pb-md-0 pb-3">
                  <div className={`${styles.search__wrapper} mb-md-0 mb-3`}>
                    <BsSearch />{" "}
                    <input
                      type="text"
                      placeholder="Search"
                      className={styles.search}
                      value={searchText}
                      onChange={(e) => searchHandeler(e.target.value)}
                    />
                  </div>
                  <button
                    className={`primary__btn ${styles.new__book}`}
                    onClick={downloadFunc}
                  >
                    <BsCloudDownload />
                    <span className="pl-2">CSV</span>
                  </button>
                </div>
              </div>
              <div className="table-responsive">
                <Table bordered striped hover className="text-center">
                  <thead>
                    <tr>
                      <th>Client's Name</th>
                      <th>Address</th>
                      <th>Phone No.</th>
                      <th>Alt. Phone No.</th>
                      <th>Email</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((item) => (
                      <tr key={item.id}>
                        <td
                          className="text-left text-primary"
                          style={{ cursor: "pointer" }}
                        >
                          <span onClick={() => userRoute(item.id)}>
                            {item.name}
                          </span>
                        </td>
                        <td>{item.address}</td>
                        <td>{item.phone}</td>
                        <td>{item.phone2}</td>
                        <td>{item.email}</td>
                        <td>
                          <span
                            className={styles.icons}
                            onClick={() => deleteHandeler(item.id, item.name)}
                          >
                            <VscTrash />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {userList.length === 0 && (
                  <div className="alert alert-danger text-center">No Users</div>
                )}
              </div>
            </div>
          </ShadowCard>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.user_admin_page.users,
  loading: state.user_admin_page.loading,
});

export default connect(mapStateToProps, { getUserProfile, deleteUserProfile })(
  UserList
);
