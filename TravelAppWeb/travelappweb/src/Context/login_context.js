import React, { useState } from "react";
export const AuthLogin = React.createContext({
  isLoggedIn: false,
  Token: "",
  login: (token) => {},
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
