import React, { useContext } from "react";
import StyledForm, { SubmitButton } from "./styledForm";
import { TextField } from "@mui/material";
import  { AuthLogin } from "../Context/login_context";

const LoginForm = () => {
  const {
    isFormValid,
    loginHandler,
    usernameChangeHandler,
    passwordChangeHandler,
    username,
    password,
  } = useContext(AuthLogin);

  return (
    <StyledForm onSubmit={loginHandler}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        value={username}
        onChange={usernameChangeHandler}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={passwordChangeHandler}
      />
      <SubmitButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={!isFormValid}
      >
        Submit
      </SubmitButton>
    </StyledForm>
  );
};

export default LoginForm;
