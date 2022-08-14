import React from 'react';
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';

const SignIn = () => {
    return (
        <div className='usersection'>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                    m: 1,
                    width: 500,
                    height: 450,
                    },
                }}
            >
                <Paper
                    sx={{
                        bgcolor: 'rgb(255,239,239)',
                        position: 'absolute',
                        top: '18%',
                        right: '36.5%',
                        zIndex: '1',
                        padding: '2rem'
                    }}
                    elevation={10} >
                    <Grid align="center" padding='10px'>
                        <Avatar>
                            <AccountCircleOutlinedIcon />
                        </Avatar>
                        <h3>Login Your <span style={{ color: 'rgb(255,103,82)' }}>Canvas</span></h3>
                    </Grid>
                    <form>
                        <TextField
                            label='User Email'
                            type='email'
                            name='email'
                            placeholder='Enter User email'
                            variant="standard"
                            fullWidth required />
                        <TextField
                            name='password'
                            label='User Password'
                            type="password"
                            placeholder='Enter User password'
                            variant="standard"
                            fullWidth required />
                        <Box sx={{ paddingTop: '1.5rem' }}>
                            <Button type='submit' fullWidth variant="contained">Login</Button>
                        </Box>
                    </form>
                    <Link to="">
                        Forgot password?
                    </Link>
                    <Box>
                        <Typography>
                            Do you have no account? <Link to="/signup">
                            Sign Up?
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </div >
    );
};

export default SignIn;