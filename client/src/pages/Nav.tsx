import React from "react";
// import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <Link to="/">
        Main
      </Link>
      <Link to="/info">
        Info
      </Link>
    </div>
  );
}

export default Nav;