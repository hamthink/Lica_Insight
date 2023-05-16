import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import { Container, Grid } from '@mui/material';
import Footer from '@/components/Footer';
import Trace from '@/content/Dashboards/Crypto/Trace';

function StatisticsTrace() {
  // dummy start
  const data = [
    [
      { x: 20, y: 20 },
      { x: 20, y: 50 },
      { x: 30, y: 20 },
      { x: 40, y: 50 },
      { x: 50, y: 20 },
      { x: 60, y: 50 }
    ],
    [
      { x: 10, y: 10 },
      { x: 60, y: 80 },
      { x: 70, y: 60 },
      { x: 80, y: 80 },
      { x: 90, y: 60 },
      { x: 100, y: 80 }
    ],
    [
      { x: 10, y: 80 },
      { x: 30, y: 20 },
      { x: 50, y: 50 },
      { x: 70, y: 80 },
      { x: 90, y: 60 },
      { x: 100, y: 10 }
    ]
  ];

  const offset = { x: 50, y: 20 };
  const domain = { xStart: 0, xEnd: 100, yStart: 0, yEnd: 100 };
  const range = { width: 1140, height: 700 };

  const map = "url('/static/images/map/map1.png')";

  // dummy end

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
              <Trace
                data={data}
                offset={offset}
                range={range}
                domain={domain}
                map={map}
              />
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
