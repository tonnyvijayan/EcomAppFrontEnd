import { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import axios from "../../axios/axios";
//
export const SignUp = () => {
  const [userCredentials, setUserCredentials] = useState({});
  const [signupError, setSignupError] = useState({
    name: "",
    password: "",
    email: "",
  });

  const singUpButtonHandler = async () => {
    try {
      if (
        userCredentials.name &&
        userCredentials.email &&
        userCredentials.password
      ) {
        const response = await axios.post("/user/createuser", {
          name: userCredentials.name,
          email: userCredentials.email,
          password: userCredentials.password,
        });
        if (response.status === 201) {
          console.log("Account created");
          //show toast
        }
        console.log(response);
        setSignupError({
          name: "",
          password: "",
          email: "",
        });
      } else {
        setSignupError({
          name: "Please enter username",
          password: "Please enter a password",
          email: "Please enter an email",
        });
      }
    } catch (error) {
      if (error.response.status === 409) {
        console.log(error.response.data.message);
        //add toast to let user know
      }
      console.log(error);
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
      <div className="signup-container">
        <div className="signup-header-container">Plant Mart</div>
        <div className="signup-input-container">
          <input
            onChange={inputChangeHandler}
            type="text"
            placeholder="Username"
            name="name"
          />
          <span>{signupError?.name}</span>
          <input
            onChange={inputChangeHandler}
            type="email"
            placeholder="Email"
            name="email"
          />
          <span>{signupError?.email}</span>

          <input
            onChange={inputChangeHandler}
            type="password"
            placeholder="Password"
            name="password"
          />
          <span>{signupError?.password}</span>
        </div>

        <div className="signup-button-container">
          <button onClick={singUpButtonHandler}>Sign Up</button>
          {/* <button>Sign Up</button> */}
        </div>
        <Link to="/login">Go to log in</Link>
      </div>
    </>
  );
};
