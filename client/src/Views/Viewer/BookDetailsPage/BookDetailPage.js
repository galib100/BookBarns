import React from "react";
import { BookDetails } from "../../../Components/Viewer/BookDetails";
import { Nav1 } from "../../../Components/Viewer/Navbar";
import { Footer } from "../../../Components/Viewer/Footer";

const BookDetailPage = () => {
  return (
    <div>
      <Nav1 />
      <BookDetails />
      <Footer />
    </div>
  );
};

export default BookDetailPage;
