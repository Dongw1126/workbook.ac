import React, { useEffect, useState } from 'react';
import { DialogContent, DialogTitle, Dialog } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import * as Constants from "../../constants";

import { Authenticator, AmplifyProvider, Button, Flex } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import UserStore from "../../stores/UserStore";
import { theme, services, krDict } from "./CustomAuth";

import { I18n } from "aws-amplify";
import userStore from '../../stores/UserStore';
I18n.setLanguage("kr");
I18n.putVocabularies(krDict);

interface Props {
    open: boolean;
    onClose: () => void;
}

interface UserInfoProps {
    signOut: any;
    user: any;
}

/**
 * 로그인 후 사용자 정보 컴포넌트
 */
function UserInfo(props: UserInfoProps) {
    const userStore = UserStore;
    useEffect(() => userStore.login(props.user), []);

    return (
        <main>
            <h2 style={{ padding: "1rem" }}>{props.user.username}</h2>
            <hr style={{ marginTop: "1rem", marginBottom: "1rem" }} />
            <Flex direction="row">
                <Button variation="link">이메일 변경</Button>
                <Button variation="link">비밀번호 변경</Button>
                <Button variation="primary"
                    onClick={() => {
                        console.log("sign out");
                        props.signOut();
                        userStore.logout();
                    }}>
                    로그아웃
                </Button>
            </Flex>
        </main>
    );
}

/**
 * aws-amplify 로그인 모달
 */
function LoginModal(props: Props) {
    return (
        <Dialog
            onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                    props.onClose()
                }
            }}
            open={props.open}
            style={{ zIndex: Constants.MODAL_Z_INDEX }}>
            <DialogTitle sx={{ p: 1.2 }}>
                <IconButton onClick={props.onClose} sx={{ float: "right" }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <AmplifyProvider theme={theme}>
                    <Authenticator loginMechanisms={['username']} signUpAttributes={['email']} services={services}>
                        {({ signOut, user }) => {
                            return(
                              <UserInfo signOut={signOut} user={user}/>  
                            );
                        }}
                    </Authenticator>
                </AmplifyProvider>
            </DialogContent>
        </Dialog>
    );
}

export default LoginModal;