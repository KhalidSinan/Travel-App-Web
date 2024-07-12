import React from "react";
import LoginForm from "./LoginForm";
import { Grid,Paper } from "@mui/material";
import AuthLoginProvider from "../../Context/login_context";
const Login = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        background: "linear-gradient(to right,rgb(32,94,97),rgb(32,94,97),rgb(255,255,255))",
      }}
    >
      <Paper sx={{ boxShadow: 3, p: 5, backgroundColor: "white" }} md={3}>
       <AuthLoginProvider>
      <LoginForm/>
      </AuthLoginProvider>
      </Paper>
      
      {/* <Paper> component is used to create a paper-like container with shadows and padding */}
    </Grid>
  );
};

export default Login