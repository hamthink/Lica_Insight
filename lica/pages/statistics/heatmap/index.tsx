import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import { Container, Grid } from '@mui/material';
import Footer from '@/components/Footer';

import WatchList from '@/content/Dashboards/Crypto/WatchList';
import HeatMap from '@/content/Dashboards/Crypto/HeatMap';

function StatisticsHeatMap() {
  return (
		<>
			<Head>
				<title>Statistics - heatmap</title>
			</Head>
      		<Container maxWidth="lg">
				<Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={4}>
					<Grid item xs={12}>
						<HeatMap />
					</Grid>
				</Grid>
			</Container>
			<Footer />
		</>
	);
}

StatisticsHeatMap.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default StatisticsHeatMap;