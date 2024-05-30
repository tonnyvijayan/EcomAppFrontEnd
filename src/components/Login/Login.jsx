import { useState } from "react";
import "./Login.css";
import axios from "../../axios/axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
  const [userCredentials, setUserCredentials] = useState({});
  const { authState, setAuthState } = useAuth();
  const [showLoginError, setLoginError] = useState({
    name: "",
    password: "",
  });

  const loginButtonHandler = async () => {
    try {
      if (userCredentials.name && userCredentials.password) {
        const response = await axios.post(
          "/user/authenticateuser",
          {
            name: userCredentials.name,
            password: userCredentials.password,
          },
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setAuthState(response.data.accessToken);

          setLoginError({
            name: "",
            password: "",
          });
        }

        console.log(response);
      } else {
        setLoginError({
          name: "Enter a valid username",
          password: "Enter a valid password",
        });
        setUserCredentials({});
      }
    } catch (error) {
      console.log("unable to authenticate user", error);
    }
  };

  const inputChangeHandler = (event) => {
    setUserCredentials({
      ...userCredentials,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="login-container">
        {JSON.stringify(authState)}
        <div className="login-header-container">Plant Mart</div>
        <div className="login-input-container">
          <input
            type="text"
            placeholder="Username"
            onChange={inputChangeHandler}
            name="name"
          />
          <span>{showLoginError.name}</span>
          <input
            type="password"
            placeholder="Password"
            onChange={inputChangeHandler}
            name="password"
          />
          <span>{showLoginError.password}</span>
        </div>
        <div className="login-persist-container">
          <label htmlFor="persistcheckbox">
            <input type="checkbox" id="persistcheckbox" />
            Trust this device
          </label>
        </div>
        <div className="login-button-container">
          <button onClick={loginButtonHandler}>Log in</button>
        </div>
        <Link to="/signup">Create new account</Link>
      </div>
    </>
  );
};
