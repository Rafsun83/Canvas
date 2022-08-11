import { Button } from '@mui/material';
import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Panel from './../Panel/Panel';
import Canvas from '../Canvas/Canvas';
import Properties from '../Properties/Properties';

const Home = () => {

    
    return (
        <Container maxWidth="xl" sx={{marginTop:'40px'}}>
          <Grid container spacing={3}>
                <Grid xs>
                 <Panel/>
                </Grid>
                <Grid xs={6}>
                    <Canvas/>
                </Grid>
                <Grid xs>
                    <Properties/>
                </Grid>
            </Grid>  
            
        </Container>
    );
};

export default Home;