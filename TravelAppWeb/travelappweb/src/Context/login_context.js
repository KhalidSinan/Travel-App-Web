import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthLogin = React.createContext({
  isLoggedIn: false,
  Token: "",
  login: (token) => {},
  logout: (token) => {},
});

const AuthLoginProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setmessage] = useState(null);
  // const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (event) => {
    event.preventDefault();

    const loginData = {
      username,
      password,
    };

    try {
      const response = await fetch("http://localhost:5000/dashboard/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        throw new Error(`Http error ! status : ${response.status}`);
      }

      const data = await response.json();
      console.log(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", true);
      setIsLoggedIn(true);
      setmessage("Login successful");
      //setToken(data.token);
      //<AutohideSnackbar message="Login successful"></AutohideSnackbar>;

      console.log("Login successful");
    } catch (error) {
      setmessage("Login Failed");
      //<AutohideSnackbar message=" Login Failed"></AutohideSnackbar>;

      console.error("Login failed");
    }
  };

  const logoutHandler = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('http://localhost:5000/dashboard/logout',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if(!response.ok){
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('token');
      console.log(data);
    } catch (error) {
      setmessage(error.message);
    }
  }

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
    message: message,
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
