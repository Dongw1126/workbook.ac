import React from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

function Nav() {
  return (
    <div className={styles.navRoot}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={process.env.PUBLIC_URL + '/logo.svg'} alt="" />
        </Link>
      </div>
      <div>
        <Link to="/workbook/search">
          <div className={styles.navContent}>
            문제집
          </div>
        </Link>
        <Link to="/guide">
          <div className={styles.navContent} style={{ borderRight: "solid 1px #b9b9b9" }}>
            가이드
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Nav;