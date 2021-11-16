import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <Link to="/">
        Main
      </Link>
      <Link to="/workbook/search">
        문제집
      </Link>
      <Link to="/info">
        Info
      </Link>
    </div>
  );
}

export default Nav;