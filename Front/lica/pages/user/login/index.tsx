import { useState, ChangeEvent } from 'react';
import Head from 'next/head';
// import SidebarLayout from '@/layouts/SidebarLayout';
import type { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

import Footer from '@/components/Footer';
import { styled } from '@mui/material/styles';
import { Card, Typography, Container, Box, Button, CardHeader, Divider, CardContent, TextField, MenuItem, Grid } from '@mui/material';

import FormControl from '@mui/material/FormControl';

import CardMedia from '@mui/material/CardMedia';

import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';

import Logo from 'src/components/LogoSign';
import Link from 'src/components/Link';

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

function UserLogin() {
  return (
    <SignupWrapper>
      <Head>
        <title>로그인</title>
      </Head>
      <HeaderWrapper>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <Logo />
            <Box display="flex" alignItems="center" justifyContent="space-between" flex={1}>
              <Box />
              <Box>
                <Button component={Link} href="/user/signup" variant="contained" sx={{ ml: 2 }} > 회원가입 </Button>
                <Button component={Link} href="/user/login" variant="contained" sx={{ ml: 2 }}>로그인</Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </HeaderWrapper>
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Typography variant="h1" component="h1" gutterBottom align='center'>로그인</Typography>
        <Typography variant="subtitle2" align='center'>LiCa를 사용하기 위해 로그인 해주세요.</Typography>
        
        <div style={{ display: "flex", justifyContent: "center"}}>
          <CardMedia component="img" sx={{ width: '30%', mt: 7 }} image="/static/images/logo/footprint.png" alt="LiCa LOGO"/>
        </div>
        
        <Card sx={{ mt: 10, mb: 15 }}>
          <CardContent>
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }}} noValidate autoComplete="off">
              <FormControl variant="standard" sx={{ m: 2, width: '90%'}}>
                <InputLabel htmlFor="email">이메일</InputLabel>
                <Input id="email" type='text' />
              </FormControl>
              <FormControl variant="standard" sx={{ m: 2, mb: 10, width: '90%'}}>
                <InputLabel htmlFor="password">비밀번호</InputLabel>
                <Input id="password" type='password' />
              </FormControl>
              <div style={{ display: "flex", justifyContent: "center"}}>
                <Button component={Link} href="/user/signup" variant="contained" sx={{ ml: 2 }} >회원가입</Button>
                <Button component={Link} href="/dashboards/home" variant="contained" sx={{ ml: 2 }}>확인</Button>
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

UserLogin.getLayout = function getLayout(page: ReactElement) {
    return <BaseLayout>{page}</BaseLayout>;
  };

export default UserLogin;