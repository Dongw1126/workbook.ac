import React from "react";
import { Observer } from "mobx-react";
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';

import styles from "./Nav.module.css";
import useDialog from "../hooks/useDialog";
import LoginModal from "../components/auth/LoginModal";
import UserStore from "../stores/UserStore";

/**
 * Navigation Bar 컴포넌트
 */
function Nav() {
  const [modalOpen, handleModalOpen, handleModalClose] = useDialog();
  const userStore = UserStore;

  const handleLoginButton = () => {
    console.log(userStore.user);
    handleModalOpen();
  }

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
          <Link to="/issue">
            <div className={`${styles.navContent} ${styles.navContentLast}`}>
              건의하기
            </div>
          </Link>

          <Observer>
            {() => (
              <div className={styles.loginContent}>
                {userStore.loggedIn && 
                <>
                  <Link to="/workbook/my">
                    <div className={styles.navContent}>
                      나의 문제집
                    </div>
                  </Link>
                  <Link to="/workbook/fav">
                    <div className={styles.navContent}>
                      좋아요 목록
                    </div>
                  </Link>
                </>}
                <div className={`${styles.navContent} ${styles.navLogin}`}
                  onClick={handleLoginButton}>
                  <IconButton sx={{ "&:hover": { backgroundColor: "transparent" } }}>
                    {userStore.loggedIn ? <PersonIcon /> : <LoginIcon />}
                  </IconButton>
                </div>
            </div>)}
          </Observer>
        </div>
      </div>
      <LoginModal open={modalOpen} onClose={handleModalClose} />
    </>
  );
}

export default Nav;