import { createTheme, defaultTheme } from '@aws-amplify/ui-react';

/*const gray = {
  10: { value: "#f5f5f5" },
  20: { value: "#000000" }, 
  40: { value: "#000000" }, 
  60: { value: "#000000" }, 
  80: { value: "#000000" }, 
  90: { value: "#000000" }, 
  100: { value: "#000000" }, 
}*/

export const theme =  createTheme({
  name: 'my-theme',
  tokens: {
    colors: {
      brand : {
        primary: defaultTheme.tokens.colors.neutral
      }
    },
  },
});

export const services = {
  async validatePreferredUsername(formData: any) {
    if (!formData.preferred_username) {
      formData['preferred_username'] = "";
    }
  },
}

export const krDict = {
  kr: {
    'Back to Sign In': '로그인으로 돌아가기',
    Birthdate: '생년월일',
    'Change Password': '비밀번호 변경하기',
    Changing: '변경중',
    Code: '코드',
    'Confirm Password': '비밀번호 재확인',
    'Reset your Password': '비밀번호 재설정',
    'Confirm Sign Up': '회원가입 확인',
    'Confirm SMS Code': '휴대폰 본인 확인',
    'Confirm TOTP Code': 'TOTP 인증번호 확인',
    Confirm: '확인',
    'Confirmation Code': '인증번호',
    Confirming: '확인중',
    'Create Account': '회원가입',
    'Creating Account': '회원가입 중',
    Email: '이메일',
    'Enter your code': '인증번호를 입력해주세요',
    'Enter your username': '아이디를 입력해주세요',
    'Family Name': '성',
    'Given Name': '이름',
    'Forgot your password? ': '비밀번호를 잊으셨나요?',
    'Hide password': '비밀번호 숨기기',
    Loading: '로딩중',
    Username: '아이디',
    Name: '성함',
    Nickname: '닉네임',
    'New password': '새 비밀번호',
    Password: '비밀번호',
    'Phone Number': '전화번호',
    'Preferred Username': '닉네임',
    Profile: '프로필',
    'Resend Code': '인증번호 재전송',
    'Reset your password': '비밀번호 재설정',
    'Reset Password': '비밀번호 재설정',
    'Send code': '인증코드 보내기',
    Sending: '전송중',
    'Setup TOTP': 'TOTP 설정하기',
    'Show password': '비밀번호 보이기',
    'Sign in': '로그인',
    'Sign In': '로그인',
    'Sign In with Amazon': 'Amazon 로그인',
    'Sign In with Apple': 'Apple 로그인',
    'Sign In with Facebook': 'Facebook 로그인',
    'Sign In with Google': 'Google 로그인',
    'Sign in to your account': '로그인',
    'Create a new account': '회원가입',
    'Signing in': '로그인 중',
    Skip: '다음에 하기',
    Submit: '확인',
    Submitting: '확인중',
    'Verify Contact': '연락처 확인',
    'Account recovery requires verified contact information':
      '계정 복구를 위해 확인이 필요합니다',
    Verify: '인증',
    Website: '웹사이트'
  }
};