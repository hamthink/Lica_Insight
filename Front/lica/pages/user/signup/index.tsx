import { useState, ChangeEvent } from 'react';
import Head from 'next/head';
// import SidebarLayout from '@/layouts/SidebarLayout';
import type { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

import Footer from '@/components/Footer';
import { styled } from '@mui/material/styles';
import { Card, Typography, Container, Box, Button, CardHeader, Divider, CardContent, TextField, MenuItem, Grid } from '@mui/material';

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
    const [currency, setCurrency] = useState('EUR');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };
  return (
    <SignupWrapper>
      <Head>
        <title>회원가입</title>
      </Head>
      <HeaderWrapper>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <Logo />
            <Box display="flex" alignItems="center" justifyContent="space-between" flex={1}>
              <Box />
              <Box>
                <Button component={Link} href="/user/signup" variant="contained" sx={{ ml: 2 }} > 회원가입 </Button>
                <Button component={Link} href="/dashboards/crypto" variant="contained" sx={{ ml: 2 }}>로그인</Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </HeaderWrapper>
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Typography variant="h1" component="h1" gutterBottom align='center'>회원가입</Typography>
        <Typography variant="subtitle2" align='center'>LiCa를 사용하기 위해 회원가입을 해주세요.</Typography>
        <Card>
            <CardHeader title = "회원가입" />
            <Divider />
            <CardContent>
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }}} noValidate autoComplete="off">
                 {/* <div>
                     <TextField required id="standard-required" label="이메일" variant="standard" helperText="LiCa ID로 사용할 주소입니다." /><br />
                     <TextField id="standard-password-input" label="비밀번호" type="password" autoComplete="current-password" variant="standard" /><br />
                     <TextField id="standard-password-input" label="비밀번호 확인" type="password" autoComplete="current-password" variant="standard" /><br />
                     <TextField id="standard-number" label="Number" type="number"
                      InputLabelProps={{
                        shrink: true
                      }}
                      variant="standard"
                    /><br />
                    <TextField id="standard-search" label="이름" type="search" variant="standard" /><br />
                  </div> */}
                  
                  <FormControl variant="standard" sx={{ m: 2, width: '54ch'}}>
                    <InputLabel htmlFor="email">이메일</InputLabel>
                    <Input id="email" type='text' />
                    <FormHelperText id="email">LiCa ID로 사용할 주소입니다.</FormHelperText>
                  </FormControl>
                  <FormControl variant="standard" sx={{ m: 2, width: '54ch'}}>
                    <InputLabel htmlFor="password">비밀번호</InputLabel>
                    <Input id="password" type='password' />
                  </FormControl>
                  <FormControl variant="standard" sx={{ m: 2, width: '54ch'}}>
                    <InputLabel htmlFor="password-check">비밀번호 확인</InputLabel>
                    <Input id="password-check" type='password' />
                  </FormControl>
                  <FormControl variant="standard" sx={{ m: 2, width: '54ch'}}>
                    <InputLabel htmlFor="name">이름</InputLabel>
                    <Input id="name" type='text' />
                  </FormControl>
                  <FormControl variant="standard" sx={{ m: 2, width: '54ch'}}>
                    <InputLabel htmlFor="birth">생년월일</InputLabel>
                    <Input id="birth" type='text' />
                    <FormHelperText id="birth">####-##-## 형식으로 입력바랍니다.</FormHelperText>
                  </FormControl>
                  <FormControl sx={{ m: 1, width: '54ch'}}>
                    <FormLabel component="legend"><br/>성별</FormLabel>
                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                  </FormControl>
                  <div style={{ display: "flex", justifyContent: "center"}}>
                    <Button component={Link} href="/" variant="contained" sx={{ ml: 2 }} color="error">취소</Button>
                    <Button component={Link} href="/dashboards/crypto" variant="contained" sx={{ ml: 2 }}>확인</Button>
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
