import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import { Container, Grid } from '@mui/material';
import Footer from '@/components/Footer';
import Camera from '@/content/Dashboards/Crypto/Camera';

function VideosCamera() {
  return (
    <>
      <Head>
        <title>Videos - Live Camera</title>
      </Head>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <Container sx={{ mt: 5 }}>
              <Camera />
            </Container>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

VideosCamera.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default VideosCamera;
