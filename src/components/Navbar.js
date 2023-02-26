import { useEffect } from "react";
import Menu from "./Menu";

import "../css/nav.css";
import { Link } from "react-router-dom";

function Navbar({ type }) {
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light border-bottom border-1">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <span className="text-success display-6 fw-bolder">
             JMS
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="me-auto mb-2 mb-lg-0"></div>
          <div className="d-flex">
            <Menu />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
