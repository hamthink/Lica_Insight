import { Typography, Box, Card, Container, styled } from '@mui/material';
import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

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
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography mt={10} variant="h1" gutterBottom align="center">
          Marketing Insight
        </Typography>
        <Typography mt={6} variant="h1" gutterBottom align="center">
          service with
        </Typography>
        <Typography mt={6} variant="h1" gutterBottom align="center">
          customer footprint track
        </Typography>
        <Typography mt={6} variant="h1" gutterBottom align="center">
          and
        </Typography>
        <Typography mt={6} mb={10} variant="h1" gutterBottom align="center">
          analysis
        </Typography>
        <Typography mt={6} mb={35} variant="h1" gutterBottom align="center">
          LiCa
        </Typography>
      </Container>
    </OverviewWrapper>
  );
}

Overview.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Overview;
