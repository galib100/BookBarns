import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import AddAdminForm from "../../../Components/Admin/AddAdminForm/AddAdminForm";
import { NavbarAdmin } from "../../../Components/Admin/NavbarAdmin";
import { PageHeader } from "../../../Components/Admin/PageHeader";
import { SidebarAdmin } from "../../../Components/Admin/SidebarAdmin";

const AddAdminPage = (props) => {
  const [headline, setHeadline] = useState("Add Admin");
  let adminId = props.match.params.id ? props.match.params.id : -1;
  useEffect(() => {
    const title = () => {
      let path = window.location.href;
      path = path.split("/");
      if (
        path[path.length - 3] === "admin" &&
        path[path.length - 2] === "edit"
      ) {
        setHeadline("Edit Admin");
      }
    };

    title();
  }, [window.location.href]);

  return (
    <div className="bg-light">
      <NavbarAdmin />
      <Container fluid style={{ overflowX: "hidden" }} className="px-0">
        <Row>
          <Col md={3}>
            <SidebarAdmin />
          </Col>
          <Col md={9} className="pb-5 pr-md-5 pr-0">
            <PageHeader
              title={headline}
              btnLink="/admin/users"
              btnText="All Users"
              backLink="/admin/all-admin"
              backText="All Admins"
            />
            <AddAdminForm edit={adminId} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddAdminPage;
