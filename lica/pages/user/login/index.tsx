import Head from 'next/head';
import { ReactElement, useState } from 'react';

import Footer from '@/components/Footer';
import { styled } from '@mui/material/styles';
import {
  Card,
  Typography,
  Container,
  Box,
  Button,
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  Modal
} from '@mui/material';

import CardMedia from '@mui/material/CardMedia';

import React from 'react';
import { postLogin } from '@/api/user';
import { useSetRecoilState } from 'recoil';
import { authState, userState } from 'atoms';
import SidebarLayout from '@/layouts/SidebarLayout';

const SignupWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
};

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setAccessToken = useSetRecoilState(authState);
  const setUser = useSetRecoilState(userState);

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    if (email === '') alert('이메일을 입력하세요!');
    else if (password === '') alert('비밀번호를 입력하세요!');
    else {
      e.preventDefault();

      const data = {
        email: email,
        password: password
      };

      console.log({
        email: data.email,
        password: data.password
        // email: `"${email}"`,
        // password: `"${password}"`
      });

      postLogin(
        data,
        ({ data }) => {
          if (data.result === 'success') {
            alert('로그인 성공');
            const accessToken = data['access-token'];
            setAccessToken({ isLoggedIn: true, accessToken }); // AccessToken 저장
            sessionStorage.setItem(
              'auth',
              JSON.stringify({ isLoggedIn: true, accessToken })
            );
            setUser({
              name: email,
              avatar: '/static/images/avatars/1.jpg',
              jobtitle: 'SSAFY'
            });
            sessionStorage.setItem(
              'user',
              JSON.stringify({
                name: email,
                avatar: '/static/images/avatars/1.jpg',
                jobtitle: 'SSAFY'
              })
            );
            console.log('access-token : ' + accessToken);
            window.location.href = '/dashboards/home';
          } else {
            alert('로그인 실패');
          }
        },
        (error) => {
          console.error(error);
          alert(error.message);
        }
      );
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SignupWrapper>
      <Head>
        <title>로그인</title>
      </Head>

      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Typography variant="h1" component="h1" gutterBottom align="center">
          로그인
        </Typography>
        <Typography variant="subtitle2" align="center">
          LiCa를 사용하기 위해 로그인 해주세요.
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CardMedia
            component="img"
            sx={{ width: '30%', mt: 7 }}
            image="/static/images/logo/footprint.png"
            alt="LiCa LOGO"
          />
        </div>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={changeEmail}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={changePassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            // href="/dashboards/home"
          >
            로그인
          </Button>
          <Grid container>
            <Grid item xs>
              <Button onClick={handleOpen}>Forgot password?</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
              >
                <Box sx={{ ...style, width: 500 }}>
                  <h2 id="modal-title">비밀번호를 잊어버리셨습니까?</h2>
                  <p id="modal-description">다시 회원가입하세요.</p>
                  <Button onClick={handleClose}>닫기</Button>
                </Box>
              </Modal>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Footer />
    </SignupWrapper>
  );
}

UserLogin.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default UserLogin;
