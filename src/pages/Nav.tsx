import React from "react";
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import styles from "./Nav.module.css";

function Nav() {
  return (
    <div className={styles.navRoot}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={process.env.PUBLIC_URL + '/logo.svg'} alt="" />
        </Link>
      </div>
      <div style={{ width: "100%" }}>
        <Link to="/guide">
          <div className={styles.navContent}>
            가이드
          </div>
        </Link>
        <Link to="/workbook/search">
          <div className={styles.navContent}>
            둘러보기
          </div>
        </Link>
        <Link to="/workbook/my">
          <div className={styles.navContent} style={{ borderRight: "solid 1px #b9b9b9" }}>
            나의 문제집
          </div>
        </Link>
        <div className={`${styles.navContent} ${styles.navLogin}`}>
          <IconButton sx={{ "&:hover": { backgroundColor: "transparent" }}}>
            <LoginIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Nav;