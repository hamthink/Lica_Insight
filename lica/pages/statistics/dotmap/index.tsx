import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import { Container, Grid } from '@mui/material';
import Footer from '@/components/Footer';
import Dotmap from '@/components/Dotmap';

function StatisticsHeatMap() {
  return (
    <>
      <Head>
        <title>Statistics - heatmap</title>
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
            <Dotmap />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

StatisticsHeatMap.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default StatisticsHeatMap;
