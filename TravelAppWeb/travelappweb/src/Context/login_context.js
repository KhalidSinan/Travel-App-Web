import { LocalSeeOutlined } from "@mui/icons-material";
import { useLocalStorage } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../App";
import AutohideSnackbar from "../helper/snackbar";
export const AuthLogin = React.createContext({
  isLoggedIn: false,
  Token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWY4YzAyMzQzZDcyZGI5ZjQyMTZlMCIsInVzZXJuYW1lIjoiZWxvbk11c2stMjIiLCJpYXQiOjE3MjMyOTI3NzV9.1ht58PYIYPx1_qxW6b-1bZ_WB5T91lO4ze4gyCUsE1Q",
  login: (token) => {},
  logout: (token) => {},
});

const AuthLoginProvider = (props) => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Token, setToken] = useLocalStorage("token", null);
  const [message, setmessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setIsLoggedIn(Token ? true : false);
  }, [Token]);

  const loginHandler = async (event) => {
    event.preventDefault();

    const loginData = {
      username,
      password,
    };

    try {
      const response = await fetch(`${baseUrl}/dashboard/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        throw new Error(`Http error ! status : ${response.status}`);
      }

      const data = await response.json();
      console.log(data.token);
      setIsLoggedIn(true);
      setToken(data.token);
      setmessage("Login successful");
      setToken(data.token);
      // <AutohideSnackbar message="Login successful"></AutohideSnackbar>;

      console.log("Login successful");
    } catch (error) {
      setmessage("Login Failed");
      //<AutohideSnackbar message=" Login Failed"></AutohideSnackbar>;

      console.error("Login failed");
    }
  };

  const logoutHandler = async (event) => {
    event.preventDefault();
    setLogoutLoading(true);
    try {
      const response = await fetch(`${baseUrl}/dashboard/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setIsLoggedIn(false);
      setToken(null);
      setmessage(data.message);
      window.location.reload();
      localStorage.clear();
      console.log(data);
    } catch (error) {
      setmessage(error.message);
    }
    setLogoutLoading(true);
  };

  const usernameChangeHandler = (event) => {
    console.log(event.target.value);
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };

  const contextLoginValue = {
    isLoggedIn: isLoggedIn,
    loginHandler: loginHandler,
    logoutHandler: logoutHandler,
    logoutLoading: logoutLoading,
    message: message,
    Token: Token,
    passwordChangeHandler: passwordChangeHandler,
    usernameChangeHandler: usernameChangeHandler,
    isFormValid:
      username.trim() !== "" &&
      username.length >= 3 &&
      password.trim() !== "" &&
      password.length >= 8,
  };

  return (
    <AuthLogin.Provider value={contextLoginValue}>
      {props.children}
    </AuthLogin.Provider>
  );
};

export default AuthLoginProvider;
