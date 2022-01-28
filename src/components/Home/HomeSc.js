import React from 'react';
import Cards from './cards';
import { Grid } from '@mui/material';
function HomeSc() {
  return( <div>
        <h1>DSA 450 Cracker</h1>
        <Grid container sm={4}>
        <Grid items>
            <Cards />
        </Grid>
        </Grid>
    </div>);
}

export default HomeSc;
