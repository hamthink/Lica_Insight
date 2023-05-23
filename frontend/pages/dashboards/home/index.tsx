import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import { Container, Grid } from '@mui/material';

import Footer from '@/components/Footer';

import Maps from '@/content/Dashboards/Crypto/Maps';
import WatchList from '@/content/Dashboards/Crypto/WatchList';

function DashboardCrypto() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <Maps />
          </Grid>
          <Grid item xs={12}>
            <WatchList />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
