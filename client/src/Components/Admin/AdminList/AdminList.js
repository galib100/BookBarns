import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { VscTrash } from "react-icons/vsc";
import { BiFilterAlt } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import swal from "sweetalert";
import styles from "./AdminList.module.css";
import { ShadowCard } from "../../shared/ShadowCard";
import { connect } from "react-redux";
import Moment from "react-moment";
import { removeAdmin } from "../../../Actions/Admin/AdminActions";

const AdminList = ({ data, loading, removeAdmin }) => {
  const [userList, setuserList] = useState(data);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (data) {
      setuserList(data);
    }
  }, [data]);

  const searchHandeler = (text) => {
    if (text !== "") {
      setuserList(
        data.filter((item) => {
          return item.username
            .toLocaleLowerCase()
            .includes(text.toLocaleLowerCase());
        })
      );
    } else {
      setuserList(data);
    }
    setSearchText(text);
  };

  const changeHandeler = (type) => {
    if (type === "all") {
      setuserList(data);
    } else {
      setuserList(data.filter((item) => item.role === type));
    }
  };

  const deleteHandeler = (id, title) => {
    swal({
      title: "Are you sure you want to Delete?",
      text: `Admin : ${title}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        //DELETE ACTION OF THE BOOK USING ID
        removeAdmin(id);
        console.log(id);
        swal("Admin has been deleted!", {
          icon: "success",
        });
      }
    });
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
                      value={searchText}
                      onChange={(e) => searchHandeler(e.target.value)}
                      placeholder="Search"
                      className={styles.search}
                    />
                  </div>
                  <div
                    className={`d-flex justify-content-between align-items-center ${styles.search__wrapper} mb-md-0 mb-3`}
                  >
                    <BiFilterAlt size={24} />
                    <Form.Control
                      as="select"
                      custom
                      className={styles.select}
                      onChange={(e) => changeHandeler(e.target.value)}
                    >
                      <option value="all">Filter</option>

                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                    </Form.Control>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <Table bordered striped hover className="text-center">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Permission Level</th>
                      <th>Joining Date</th>
                      <th>Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((item) => (
                      <tr key={item._id}>
                        <td className="text-left">{item.username}</td>
                        <td>{item.role}</td>

                        <td>
                          <Moment fromNow ago>
                            {item.join}
                          </Moment>{" "}
                          ago
                        </td>
                        <td>
                          <Link to={`/admin/new-admin`}>
                            <span className={styles.icons}>
                              <FaRegEdit />
                            </span>
                          </Link>
                          <span
                            className={styles.icons}
                            onClick={() =>
                              deleteHandeler(item._id, item.username)
                            }
                          >
                            <VscTrash />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {userList.length === 0 && (
                  <div className="alert alert-danger text-center">
                    No Admins
                  </div>
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
  data: state.admin_page.admins,
  loading: state.admin_page.loading,
});

export default connect(mapStateToProps, { removeAdmin })(AdminList);
