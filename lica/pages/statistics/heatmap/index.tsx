import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import { Container, Grid } from '@mui/material';
import Footer from '@/components/Footer';
import Heatmap from '@/content/Dashboards/Crypto/Heatmap';

const range = { width: 1140, height: 700 };
const map = "url('/static/images/map/map1.png')";

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
            <Container sx={{ mt: 5 }}>
              <Heatmap map={map} range={range} />
            </Container>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

StatisticsHeatMap.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default StatisticsHeatMap;
