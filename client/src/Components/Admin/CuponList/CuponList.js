import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { VscTrash } from "react-icons/vsc";
import styles from "./CuponList.module.css";
import { connect } from "react-redux";
import loadingImg from "../../../Assets/Admin/loading.gif";
import swal from "sweetalert";
import {
  deleteCupon,
  editCuponModalToggleAction,
} from "../../../Actions/Admin/CuponActions";

const CuponList = ({
  data,
  loading,
  deleteCupon,
  editCuponModalToggleAction,
}) => {
  const [cuponList, setCuponList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!loading) {
      setCuponList(data);
    }
  }, [data]);

  const searchHandeler = (text) => {
    if (text !== "") {
      setCuponList(
        data.filter((item) => {
          return item.cuponcode.toLowerCase().includes(text.toLowerCase());
        })
      );
    } else {
      setCuponList(data);
    }
    setSearchText(text);
  };

  const deleteHandeler = (id, title) => {
    swal({
      title: "Are you sure you want to Delete?",
      text: `Coupon : ${title}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        //DELETE ACTION OF THE CUPON USING ID
        let flag = false;
        flag = deleteCupon(id);
        if (flag) {
          swal("Coupon has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Something Went Wrong", {
            icon: "warning",
          });
        }
      }
    });
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="p-4 mr-md-4 bg-white">
      <div className="d-flex flex-md-row flex-column justify-content-between align-items-center pb-3">
        <div className="">
          <h4>All Coupons</h4>
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
        {loading ? (
          <div className="text-center">
            <img src={loadingImg} style={{ width: "100px" }} />
          </div>
        ) : (
          <Table bordered striped hover className="text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Coupon Code</th>
                <th>Type</th>
                <th>Ammount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cuponList.map((item, i) => (
                <tr key={item._id}>
                  <td className="font-weight-bolder">{i + 1}</td>
                  <td>{item.cuponcode}</td>

                  <td>{capitalizeFirstLetter(item.cupontype)}</td>
                  <td>
                    {item.amount}
                    {item.cupontype === "percantage" ? (
                      <span>%</span>
                    ) : (
                      <sapn>tk</sapn>
                    )}
                  </td>
                  <td>
                    <span
                      className={styles.icons}
                      onClick={() => editCuponModalToggleAction(item._id)}
                    >
                      <FaRegEdit />
                    </span>
                    <span
                      className={styles.icons}
                      onClick={() => deleteHandeler(item._id, item.cuponcode)}
                    >
                      <VscTrash />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {cuponList.length === 0 && (
          <div className="alert alert-danger text-center">No Cupon Found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.auth_cupon.cupons,
  loading: state.auth_cupon.loading,
});

export default connect(mapStateToProps, {
  deleteCupon,
  editCuponModalToggleAction,
})(CuponList);
