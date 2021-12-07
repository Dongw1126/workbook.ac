import React, { useState } from 'react';
import { DialogContent, DialogTitle, Dialog } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import * as Constants from "../../constants";
import { Authenticator, AmplifyProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { theme, services, krDict } from "./CustomAuth";

import { I18n } from "aws-amplify";
I18n.setLanguage("kr");
I18n.putVocabularies(krDict);

interface Props {
    open: boolean;
    onClose: () => void;
}

function LoginModal(props: Props) {
    return (
        <Dialog 
            onClose={(event, reason) => {
            if (reason !== 'backdropClick') {
              props.onClose()
            }}}
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
                        {({ signOut, user }) => (
                            <main>
                                <h1>Hello {user.username}</h1>
                                <button onClick={signOut}>Sign out</button>
                            </main>
                        )}
                    </Authenticator>
                </AmplifyProvider>
            </DialogContent>
        </Dialog>
    );
}

export default LoginModal;