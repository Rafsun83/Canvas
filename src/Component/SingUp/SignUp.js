import React from 'react';
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from './../../Hooks/useAuth';

const SignUp = () => {
    // import Auth and Set state
    const {siginWithGoogle} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const redirect_uri = location.state?.from || '/'
    //Redirect page after Login
    const handleSigninWithGoogle = () => {
        siginWithGoogle()
            .then(result => {      
                navigate(redirect_uri)       
            })
    }

    return (
        <div className='usersection'>
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                width: 500,
                height: 480,
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
                    <h3>Signup For <span style={{ color: 'rgb(255,103,82)' }}>Canvas</span></h3>
                </Grid>
                <form >
                    <TextField
                        label='User Name'
                        name='name'
                        placeholder='Enter User Name'
                        variant="standard"
                        fullWidth required />
                    <TextField
                        label='User Email'
                        name='email'
                        type='email'
                        placeholder='Enter User email'
                        variant="standard"
                        fullWidth required />
                    <TextField
                        label='Password'
                        name='password'
                        type="password"
                        placeholder='password'
                        variant="standard"
                        fullWidth required />
                    <TextField
                        label='Confirm Password'
                        name='confirm_password'
                        type="password"
                        placeholder='Confirm password'
                        variant="standard"
                        fullWidth required />
                    <Box sx={{ paddingTop: '1.5rem' }}>
                        <Button type='submit' fullWidth variant="contained">Register</Button>
                    </Box>
                    <Box >
                        <Typography>
                            You have an account? <Link to="/sigin" >
                                Sign in?
                            </Link>
                        </Typography>
                    </Box>
                </form>
                <Box>
                    <Button type='submit' onClick={ handleSigninWithGoogle}  fullWidth variant="contained">Signin with google</Button>
                </Box>
            </Paper>
        </Box>
    </div>
    );
};

export default SignUp;