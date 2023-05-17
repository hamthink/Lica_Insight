import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import { Container, Grid } from '@mui/material';
import Footer from '@/components/Footer';
import Trace from '@/content/Dashboards/Crypto/Trace';

function StatisticsTrace() {
  const offset = { x: -25, y: 30 };
  const domain = { xStart: 0, xEnd: 11000, yStart: 0, yEnd: 7000 };
  const range = { width: 1100, height: 600 };

  const map = "url('/static/images/map/map1.png')";

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
              <Trace offset={offset} range={range} domain={domain} map={map} />
            </Container>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

StatisticsTrace.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default StatisticsTrace;
