import {
  Typography,
  Box,
  Card,
  Container,
  Button,
  styled
} from '@mui/material';
import type { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

import Link from 'src/components/Link';
import Head from 'next/head';

import Logo from 'src/components/LogoSign';
import Hero from 'src/content/Overview/Hero';

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  return (
    <OverviewWrapper>
      <Head>
        <title>LiCa Main</title>
      </Head>
      <HeaderWrapper>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <Logo />
            <Box display="flex" alignItems="center" justifyContent="space-between" flex={1}>
              <Box />
              <Box>
                <Button component={Link} href="/user/test1" variant="contained" sx={{ ml: 2 }}>TEST 1</Button>
                <Button component={Link} href="/user/signup" variant="contained" sx={{ ml: 2 }}>회원가입</Button>
                <Button component={Link} href="/user/login" variant="contained" sx={{ ml: 2 }}>로그인</Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </HeaderWrapper>
      {/* <Hero /> */}
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography mt={10} variant="h1" gutterBottom align='center'>Marketing Insight</Typography>
        <Typography mt={6} variant="h1" gutterBottom align='center'>service with</Typography>
        <Typography mt={6} variant="h1" gutterBottom align='center'>customer footprint track</Typography>
        <Typography mt={6} variant="h1" gutterBottom align='center'>and</Typography>
        <Typography mt={6} mb={10} variant="h1" gutterBottom align='center'>analysis</Typography>
        <Typography mt={6} mb={10} variant="h1" gutterBottom align='center'>LiCa</Typography>
       </Container>
      {/* <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography textAlign="center" variant="subtitle1">
          Crafted by{' '}
          <Link
            href="https://bloomui.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            BloomUI.com
          </Link>
        </Typography>
      </Container> */}
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};


// <Container maxWidth="lg">
//         <Grid
//           container
//           direction="row"
//           justifyContent="center"
//           alignItems="stretch"
//           spacing={4}
//         >
//           <Grid item xs={12}>
//             <Box component="span" sx={{ width: '100%', maxWidth: 500 }}>
//               <Typography mt={10} variant="h1" gutterBottom align='center'>Marketing Insight</Typography>
//               <Typography mt={6} variant="h1" gutterBottom align='center'>service with</Typography>
//               <Typography mt={6} variant="h1" gutterBottom align='center'>customer footprint track</Typography>
//               <Typography mt={6} variant="h1" gutterBottom align='center'>and</Typography>
//               <Typography mt={6} mb={10} variant="h1" gutterBottom align='center'>analysis</Typography>
//             </Box>
//           </Grid>
//         </Grid>
//       </Container>