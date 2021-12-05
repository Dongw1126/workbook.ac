import React, { useEffect } from 'react';
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';

function Login() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <AmplifyAuthenticator>
                <AmplifySignUp
                    slot="sign-up"
                    formFields={[
                        {
                            type: "username",
                            label: "아이디"
                        },
                        {
                            type: "password",
                            label: "비밀번호"
                        },
                        {
                            type: "nickname",
                            label: "닉네임"
                        },
                        {
                            type: "email",
                            label: "이메일"
                        }
                    ]}
                />
            </AmplifyAuthenticator>
        </div>
    );
}

export default Login;