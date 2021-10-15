import React from "react";
// import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <Link to="/">
        내 문제집
      </Link>
      <Link to="/info">
        소개
      </Link>
    </div>
  );
}

export default Nav;