import {
  Card,
  Grid,
  Box,
  Typography,
} from '@mui/material';

function HeatMap() {

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3
        }}
      >
        <Typography variant="h3">HeatMap / </Typography>
      </Box>
      <Card>
        <Grid spacing={0} container>
          <Grid item xs={12} md={6}>
            <Box p={4}>
    
            </Box>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default HeatMap;