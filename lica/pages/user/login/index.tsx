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
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  Modal
} from '@mui/material';

import CardMedia from '@mui/material/CardMedia';

import Logo from 'src/components/LogoSign';
import Link from 'src/components/Link';
import React from 'react';
import { postLogin } from '@/api/user';
import { useSetRecoilState } from 'recoil';
import { authState, userState } from 'atoms';

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
          setUser({
            name: email,
            avatar: '/static/images/avatars/1.jpg',
            jobtitle: 'SSAFY'
          });
          console.log('access-token : ' + accessToken);
          // window.location.href = '/dashboards/home';
        } else {
          alert('로그인 실패');
        }
      },
      (error) => {
        console.error(error);
        alert(error.message);
      }
    );
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
            {/* <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
          </Grid>
        </Box>

        {/* <Card sx={{ mt: 10, mb: 15 }}>
          <CardContent>
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }}} noValidate autoComplete="off">
              <FormControl variant="standard" sx={{ m: 2, width: '90%'}}>
                <InputLabel htmlFor="email">이메일</InputLabel>
                <Input id="email" type='text' />
              </FormControl>
              <FormControl variant="standard" sx={{ m: 2, mb: 10, width: '90%'}}>
                <InputLabel htmlFor="password">비밀번호</InputLabel>
                <Input id="password" type='password' />
                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
              </FormControl> */}
        {/* <Button component={Link} href="/user/signup" variant="contained" sx={{ ml: 2 }} >회원가입</Button> */}
        {/* <Button component={Link} href="/dashboards/home" variant="contained" sx={{ ml: 2 }}>확인</Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card> */}
      </Container>

      <Footer />
    </SignupWrapper>
  );
}

// UserSignUp.getLayout = (page) => (
//   <SidebarLayout>{page}</SidebarLayout>
// );

UserLogin.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default UserLogin;
