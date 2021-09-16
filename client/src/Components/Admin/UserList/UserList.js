import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { VscTrash } from "react-icons/vsc";
import styles from "./UserList.module.css";
import { ShadowCard } from "../../shared/ShadowCard";
import data from "./data";
import swal from "sweetalert";
const UserList = () => {
  const [userList, setuserList] = useState(data);
  const [searchText, setSearchText] = useState("");

  const deleteHandeler = (id, title) => {
    swal({
      title: "Are you sure you want to Delete?",
      text: `User : ${title}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        //DELETE ACTION OF THE BOOK USING ID

        console.log(id);
        swal("User has been deleted!", {
          icon: "success",
        });
      }
    });
  };

  const searchHandeler = (text) => {
    if (text !== "") {
      setuserList(
        data.filter((item) => {
          return item.name
            .toLocaleLowerCase()
            .includes(text.toLocaleLowerCase());
        })
      );
    } else {
      setuserList(data);
    }
    setSearchText(text);
  };

  return (
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
                    <td className="text-left">
                      <Link to={`/admin/users/${item.id}`}>{item.name}</Link>
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
  );
};

export default UserList;
