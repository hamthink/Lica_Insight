import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import { Container, Grid } from '@mui/material';
import Footer from '@/components/Footer';
import Heatmap from '@/content/Dashboards/Crypto/Heatmap';
import { faker } from '@faker-js/faker';

const data = Array.from({ length: 3500 }, () => ({
  x: faker.datatype.number({ min: 0, max: 1200 }),
  y: faker.datatype.number({ min: 0, max: 1000 }),
  value: faker.datatype.number({ min: 1, max: 5 })
}));

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
              <Heatmap data={data} map={map} />
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
