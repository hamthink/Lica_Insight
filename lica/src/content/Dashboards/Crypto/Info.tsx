import {
  Box,
  Card,
  Typography,
  Grid,
} from '@mui/material';


function Info() {
  
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
        <Typography variant="h3">Information</Typography>
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

export default Info;