import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import { Container, Grid } from '@mui/material';
import Footer from '@/components/Footer';
import Heatmap from '@/content/Dashboards/Crypto/Heatmap';
import { faker } from '@faker-js/faker';

const data = Array.from({ length: 2000 }, () => ({
  x: Math.round((1140 / 11000) * faker.datatype.number({ min: 0, max: 11000 })),
  y: Math.round((600 / 7000) * faker.datatype.number({ min: 0, max: 7000 })),
  value: faker.datatype.number({ min: 1, max: 5 })
}));

// console.log(data);

const range = { width: 1140, height: 600 };
// const map = "url('/static/images/map/map1.png')";
const map = "url('')";

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
              <Heatmap data={data} map={map} range={range} />
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
