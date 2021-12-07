import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';

import styles from "./Nav.module.css";
import useDialog from "../hooks/useDialog";
import LoginModal from "../components/auth/LoginModal";

import { Hub } from 'aws-amplify';

function Nav() {
  const [modalOpen, handleModalOpen, handleModalClose] = useDialog();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    Hub.listen('auth', data => {
      switch (data.payload.event) {
        case 'signIn':
          setUser(data.payload.data);
          break;
        case 'signOut':
          setUser(null);
          break;
      }
    });
  }, []);

  return (
    <>
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
          <div className={`${styles.navContent} ${styles.navLogin}`}
            onClick={handleModalOpen}>
            <IconButton sx={{ "&:hover": { backgroundColor: "transparent" } }}>
              <LoginIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <LoginModal open={modalOpen} onClose={handleModalClose} />
    </>
  );
}

export default Nav;