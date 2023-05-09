import React, {useEffect} from "react";
import h337 from "heatmap.js"

import {
    Button,
    Card,
    Grid,
    Box,
    CardContent,
    Typography,
    Avatar,
    alpha,
    Tooltip,
    CardActionArea,
    styled
  } from '@mui/material';
  import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

  function HeatMap() {
    useEffect(() => {
        var heatmap = h337.create({
            container: document.querySelector('.Heat')
        });

        heatmap.setData({
            max: 50,
            data: [{ x: 10, y: 15, value: 5}, { x: 10, y: 14, value: 4}, { x: 10, y: 13, value: 5}, { x: 10, y: 11, value: 5}, 
                { x: 100, y: 20, value: 5}, { x: 100, y: 30, value: 4}, { x: 100, y: 40, value: 5}, { x: 100, y: 50, value: 5},
                { x: 100, y: 60, value: 5}, { x: 100, y: 70, value: 4}, { x: 100, y: 80, value: 5}, { x: 100, y: 90, value: 5},
                { x: 20, y: 15, value: 5}, { x: 20, y: 14, value: 4}, { x: 20, y: 13, value: 5}, { x: 20, y: 11, value: 5}, 
                { x: 500, y: 20, value: 5}, { x: 600, y: 30, value: 4}, { x: 700, y: 40, value: 5}, { x: 800, y: 50, value: 5},
                { x: 900, y: 60, value: 5}, { x: 900, y: 70, value: 4}, { x: 900, y: 80, value: 5}, { x: 900, y: 90, value: 5},
                { x: 500, y: 200, value: 5}, { x: 600, y: 300, value: 4}, { x: 700, y: 400, value: 5}, { x: 800, y: 500, value: 5},
                { x: 900, y: 600, value: 5}, { x: 900, y: 700, value: 4}, { x: 900, y: 800, value: 5}, { x: 900, y: 900, value: 5},
                { x: 100, y: 150, value: 5}, { x: 100, y: 140, value: 4}, { x: 100, y: 130, value: 5}, { x: 100, y: 110, value: 5}]
        });
    })
    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ pb: 3, mt: 10 }}>
                <Typography variant="h3">HeatMap</Typography>
            </Box>
            <div className="Heat" style={{ width: 1000, height: 1000}}>
                {/* <h1>First Heatmap</h1>
                <h2>Heatmap test test test</h2> */}
            </div>
        </>
    );
  }

  export default HeatMap;