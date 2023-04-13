import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import UserService from "../services/UserSevices";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Login() {
const navigate = useNavigate();
const[email,setEmail]=useState('');
const[password,setPassword]=useState('');

const handleSubmit = async (e) => {
e.preventDefault();
console.log("form submitted");
const data = {
email,
password,
};
try {
const response = await UserService.signin(data);
console.log("response===>", response);
localStorage.setItem('user_data', JSON.stringify(response.data.user));
localStorage.setItem('token', response.data.token);
toast.success('user login ...');
setEmail('');
setPassword('');
navigate('/quizzes');
} catch (err) {
console.log(err);
toast.error(err.response.data.message);
}
};

return (
<ThemeProvider theme={theme}>
<Container component="main" maxWidth="xs">
<CssBaseline />
<Toaster />

<Box
sx={{
  marginTop: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#034694',
  backdropFilter: 'blur(6px)',
  borderRadius: '10px',
  padding: '20px',
  background: 'linear-gradient(to bottom, #034694, #0088C9)'
}}
>
<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
<LockOutlinedIcon  color='secondary.main'/>
</Avatar>
<Typography component="h1" variant="h5">
Sign in
</Typography>
<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
<TextField
margin="normal"
required
fullWidth
id="email"
label="Email Address"
name="email"
autoComplete="email"
autoFocus
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
<TextField
margin="normal"
required
fullWidth
name="password"
label="Password"
type="password"
id="password"
autoComplete="current-password"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>
<FormControlLabel
control={<Checkbox value="remember" color="primary" />}
label="Remember me"
/>
<Button
type="submit"
fullWidth
variant="contained"
sx={{ mt: 3, mb: 2 }}

>
Sign In
</Button>
<Grid container>
<Grid item xs>
<Link href="#" variant="body2"style={{color:"black"}}>
Forgot password?
</Link>
</Grid>
<Grid item>
<Link component={RouterLink} to="/register" variant="body2" style={{color:"black"}}>
{"Don't have an account? Sign Up"}
</Link>
</Grid>
</Grid>
</Box>
</Box>

</Container>
</ThemeProvider>
);
}
