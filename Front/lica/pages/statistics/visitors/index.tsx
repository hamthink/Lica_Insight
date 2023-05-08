import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import { Container, Grid } from '@mui/material';
import Footer from '@/components/Footer';

import WatchList from '@/content/Dashboards/Crypto/WatchList';

function StatisticsVisitors() {
  return (
		<>
			<Head>
				<title>Statistics - visitors</title>
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
						<WatchList />
					</Grid>
				</Grid>
			</Container>
			<Footer />
		</>
	);
}

StatisticsVisitors.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default StatisticsVisitors;