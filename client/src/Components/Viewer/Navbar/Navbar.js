import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// API
import axios from "axios";
import { BASE_URL } from "../../../Constants/URL";
// COMPONENTS & ACTIONS
import BackDrop from "./BackDrop";
import SideDrawer from "./SideDrawer";
import Navigation from "./Navigation";
import RequestABook from "../Landing/RequestABook";
// ACTIONS
import { saveBooksToStore } from "../../../Actions/Viewer/BookRelated";
import { clearUser } from "../../../Actions/Viewer/userAction";

function Navbar({ savedBooks, saveBooksToStore, clearUser }) {
  const [state, setstate] = useState(false);
  const [showCardForRequest, setShowCardForRequest] = useState(false);

  const drawerToggleClickHnadler = () => {
    setstate(!state);
  };
  const backDropHandler = () => {
    setstate(false);
  };

  useEffect(() => {
    if (savedBooks.length === 0) {
      axios
        .get(`${BASE_URL}/api/admin/allBooks`)
        .then((res) => {
          saveBooksToStore(res.data.books);
        })
        .catch(() => {});
    }
  }, []);

  return (
    <div>
      <Navigation
        drawerToggleClickHnadler={drawerToggleClickHnadler}
        savedBooks={savedBooks}
      />
      <SideDrawer
        show={state}
        clear={drawerToggleClickHnadler}
        clearUser={clearUser}
        setShowCardForRequest={setShowCardForRequest}
      />
      <BackDrop click={backDropHandler} drawer={state} />
      {showCardForRequest ? (
        <RequestABook setShowCardForRequest={setShowCardForRequest} />
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  savedBooks: state.bookController.books,
  isLogedIn: state.viewer.isLogedIn,
});

const mapDispatchToProps = (dispatch) => {
  return {
    saveBooksToStore: (books) => dispatch(saveBooksToStore(books)),
    clearUser: (data) => dispatch(clearUser(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
