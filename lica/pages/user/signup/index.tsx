import Head from 'next/head';
// import SidebarLayout from '@/layouts/SidebarLayout';
import { ReactElement, useState } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

import Footer from '@/components/Footer';
import { styled } from '@mui/material/styles';
import {
  Card,
  Typography,
  Container,
  Box,
  Button,
  CardContent
} from '@mui/material';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';

import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';

import Logo from 'src/components/LogoSign';
import Link from 'src/components/Link';
import {
  getEmailVerificationCode,
  postCheckVerificationCode,
  postJoin
} from '@/api/user';

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
    width: 100%;
    display: flex;
    align-items: center;
    height: ${theme.spacing(10)};
    margin-bottom: ${theme.spacing(10)};
    `
);

const SignupWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function UserSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkpass, setCheckPass] = useState('');
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');

  const [passflag, setPassFlag] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const [checkVerification, setCheckVerification] = useState(false);
  const [checkButton, setCheckButton] = useState(false);

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeCheckPass = (e) => {
    setCheckPass(e.target.value);
  };

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeBirtyday = (e) => {
    setBirthday(e.target.value);
  };

  const changeGender = (e) => {
    setGender(e.target.value);
  };

  const changeVerificationCode = (e) => {
    setVerificationCode(e.target.value);
  };

  function handleSubmit() {
    // e.preventDefault();

    if (password === checkpass) {
      setPassFlag(true);

      const data = {
        email: email,
        password: password,
        name: name,
        birthday: birthday,
        gender: gender
      };

      postJoin(
        data,
        ({ data }) => {
          if (data.result === 'success') {
            if (confirm('회원가입 성공')) {
              window.location.href = '/user/login';
            } else {
              alert('회원가입 실패');
            }
          }
        },
        (error) => {
          console.error(error);
          alert(error.message);
        }
      );
    } else {
      setPassFlag(false);
    }
  }

  function handleVerification() {
    setShowVerificationCode(true);

    getEmailVerificationCode(
      { email: email },
      ({ data }) => {
        if (data.result === 'success') {
          console.log('이메일 인증번호 전송 완료!');
          alert('이메일 인증번호 전송 완료! 3분 이내에 인증을 완료해주세요!');
          setCheckVerification(true);
        } else {
          throw new Error('이메일 인증번호 전송 실패');
        }
      },
      (error) => {
        console.error(error);
        alert(error.message);
      }
    );
  }

  function handleCheck() {
    const data = {
      code: verificationCode,
      email: email
    };

    postCheckVerificationCode(
      data,
      ({ data }) => {
        if (data.result === 'success') {
          console.log('result : ' + data.result);
          setCheckButton(true);
          alert('이메일 인증 성공!!');
        } else if (data.result === 'fail') {
          alert('이메일 인증 실패ㅠㅠ');
        }
      },
      (error) => {
        console.error(error);
        alert(error.message);
      }
    );
    // setCheckVerification(true);
  }

  return (
    <SignupWrapper>
      <Head>
        <title>회원가입</title>
      </Head>
      <HeaderWrapper>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <Logo />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex={1}
            >
              <Box />
              <Box>
                <Button
                  component={Link}
                  href="/user/signup"
                  variant="contained"
                  sx={{ ml: 2 }}
                >
                  {' '}
                  회원가입{' '}
                </Button>
                <Button
                  component={Link}
                  href="/user/login"
                  variant="contained"
                  sx={{ ml: 2 }}
                >
                  로그인
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </HeaderWrapper>
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Typography variant="h1" component="h1" gutterBottom align="center">
          회원가입
        </Typography>
        <Typography variant="subtitle2" align="center">
          LiCa를 사용하기 위해 회원가입을 해주세요.
        </Typography>
        <Card sx={{ mt: 5, mb: 5 }}>
          <CardContent>
            <Box
              component="form"
              sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
              noValidate
              autoComplete="off"
            >
              <Box sx={{ display: 'flex' }} justifyContent="space-between">
                <FormControl variant="standard" sx={{ m: 2, width: '90%' }}>
                  <InputLabel htmlFor="email">이메일</InputLabel>
                  <Input
                    id="email"
                    type="text"
                    value={email}
                    onChange={changeEmail}
                  />
                  <FormHelperText id="email">
                    LiCa ID로 사용할 주소입니다.
                  </FormHelperText>
                </FormControl>
                <Box />
                <Button
                  component={Link}
                  href="#"
                  variant="contained"
                  sx={{ mt: 4, mr: 4, width: '20%', height: '20%' }}
                  onClick={handleVerification}
                >
                  인증번호 전송
                </Button>
              </Box>
              {showVerificationCode && (
                <Box sx={{ display: 'flex' }} justifyContent="space-between">
                  <FormControl variant="standard" sx={{ ml: 2, width: '90%' }}>
                    <InputLabel htmlFor="email">인증번호</InputLabel>
                    <Input
                      id="email"
                      type="text"
                      value={verificationCode}
                      onChange={changeVerificationCode}
                    />
                    <FormHelperText id="email">
                      3분 이내 인증 필요!
                    </FormHelperText>
                  </FormControl>
                  <Box />
                  <Button
                    component={Link}
                    href="#"
                    variant="contained"
                    onClick={handleCheck}
                    sx={{ mt: 2, mr: 4, ml: 2, width: '20%', height: '20%' }}
                  >
                    인증
                  </Button>
                </Box>
              )}
              {checkVerification && (
                <Box sx={{ ml: 2, width: '90%', color: 'green' }}>
                  인증 성공!
                </Box>
              )}
              {showVerificationCode && !checkVerification && checkButton && (
                <Box sx={{ ml: 2, width: '90%', color: 'red' }}>인증 실패!</Box>
              )}

              <FormControl variant="standard" sx={{ m: 2, width: '90%' }}>
                <InputLabel htmlFor="password">비밀번호</InputLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={changePassword}
                />
              </FormControl>
              <FormControl variant="standard" sx={{ m: 2, width: '90%' }}>
                <InputLabel htmlFor="password-check">비밀번호 확인</InputLabel>
                <Input
                  id="password-check"
                  type="password"
                  value={checkpass}
                  onChange={changeCheckPass}
                />
              </FormControl>
              {/* {passflag && (
                <Box sx={{ ml: 2, width: '90%', color: 'green' }}>
                  인증 성공!
                </Box>
              )}
              {!passflag && (
                <Box sx={{ ml: 2, width: '90%', color: 'red' }}>인증 실패!</Box>
              )} */}
              <FormControl variant="standard" sx={{ m: 2, width: '90%' }}>
                <InputLabel htmlFor="name">이름</InputLabel>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={changeName}
                />
              </FormControl>
              <FormControl variant="standard" sx={{ m: 2, width: '90%' }}>
                <InputLabel htmlFor="birth">생년월일</InputLabel>
                <Input
                  id="birth"
                  type="text"
                  value={birthday}
                  onChange={changeBirtyday}
                />
                <FormHelperText id="birth">
                  ####-##-## 형식으로 입력바랍니다.
                </FormHelperText>
              </FormControl>
              <FormControl sx={{ m: 1, width: '90%' }}>
                <FormLabel component="legend">
                  <br />
                  성별
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="row-radio-buttons-group"
                  // onChange={changeGender}
                >
                  <FormControlLabel
                    control={
                      <Radio
                        value="0"
                        checked={gender === '0'}
                        onChange={changeGender}
                      />
                    }
                    label="Female"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        value="1"
                        checked={gender === '1'}
                        onChange={changeGender}
                      />
                    }
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  component={Link}
                  href="/"
                  variant="contained"
                  sx={{ ml: 2 }}
                  color="error"
                >
                  취소
                </Button>
                <Button
                  variant="contained"
                  sx={{ ml: 2 }}
                  onClick={handleSubmit}
                >
                  확인
                </Button>
              </div>
            </Box>
          </CardContent>
        </Card>
      </Container>

      <Footer />
    </SignupWrapper>
  );
}

// UserSignUp.getLayout = (page) => (
//   <SidebarLayout>{page}</SidebarLayout>
// );

UserSignup.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default UserSignup;
