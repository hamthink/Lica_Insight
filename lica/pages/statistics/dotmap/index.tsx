import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import { Container, Grid } from '@mui/material';
import Footer from '@/components/Footer';
import Dotmap from '@/content/Dashboards/Crypto/Dotmap';
import { faker } from '@faker-js/faker';

const data = {
  datasets: [
    {
      label: 'A dataset',
      data: Array.from({ length: 500 }, () => ({
        x: faker.datatype.number({ min: 0, max: 100 }),
        y: faker.datatype.number({ min: 0, max: 100 })
      })),
      backgroundColor: 'rgba(255, 99, 132, 1)'
    },
    {
      label: 'B dataset',
      data: Array.from({ length: 500 }, () => ({
        x: faker.datatype.number({ min: 0, max: 100 }),
        y: faker.datatype.number({ min: 0, max: 100 })
      })),
      backgroundColor: 'rgba(0, 200, 132, 1)'
    }
  ]
};

const range = { width: 1000, height: 600 };
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
              <Dotmap dataset={data} map={map} range={range} />
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
