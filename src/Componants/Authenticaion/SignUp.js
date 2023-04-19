import * as React from "react";
import {useState , useEffect} from "react"
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import SignUp from "./SignUp.css"
//import Headers from "../User/Headers.css";
import { useNavigate } from "react-router-dom";

//import { Email, Password } from "@mui/icons-material";


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      <Link color="inherit" href="https://mui.com/"></Link>{" "}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {

  const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');
  const navigate = useNavigate()

  useEffect(()=> {
    if (localStorage.getItem("token")){
      navigate("/")
    }
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    
    //const data = new FormData(event.currentTarget);
    const data = {
        type : 0 ,
        email : email ,
        password : password
    }

    axios.post('/auth/login' ,data , {
        headers:{
            'x-is-dashboard': 'true' 
        }
    }).then(response => {
        console.log(response);
        localStorage.setItem("token" , response.data.token);
        navigate("/")
    }).catch(erorr => {
        console.log(erorr);
    })

  };

  return (
    <ThemeProvider theme={theme}>
              <div className="padge" ><img className="photo" src="http://res.cloudinary.com/dqhzikck7/image/upload/v1681947726/k5id8r6cyhuwssjd8jbf.jpg"></img> Believe. Set. Go.</div>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:"url(http://res.cloudinary.com/dqhzikck7/image/upload/v1681947086/w9bp31ieyrygmzbblash.jpg)",
           // backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
  //                ? t.palette.grey[50]
  //              : t.palette.grey[900]
  ,
            backgroundSize: "900px",
            backgroundPosition: "center",
            maxHeight:"700px",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 13,
              mx: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <TextField
                margin="normal"
                //required
                fullWidth
                id="email"
                onChange={(e)=>setEmail(e.target.value)}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                //required
                fullWidth
                name="password"
                onChange={(e)=>setPassword(e.target.value)}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                //disabled
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                color="secondary"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="#" variant="body2"></Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
