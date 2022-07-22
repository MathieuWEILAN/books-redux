import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddBooks from "./containers/AddBooks";
import SearchBook from "./containers/SearchBooks";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AddBooks />} />
        <Route path="/search" element={<SearchBook />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
