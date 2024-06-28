import "./Login.css";
import { useEffect, useState } from "react";
import axios from "../../axios/axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../../hooks/useProductContext";
import { useToast } from "../../hooks/useToast";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

export const Login = () => {
  const axiosPrivate = useAxiosPrivate();
  const { state, dispatch } = useProductContext();
  const location = useLocation();
  const navigate = useNavigate();
  const showToast = useToast();
  const [userCredentials, setUserCredentials] = useState({
    name: "",
    password: "",
  });
  const { authState, setAuthState, persist, setPersist } = useAuth();
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
      } else {
        setLoginError({
          name: "Enter a valid username",
          password: "Enter a valid password",
        });
        setUserCredentials({
          name: "",
          password: "",
        });
      }
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 401) {
        showToast("Incorrect username/password", "fail");
        setUserCredentials({
          name: "",
          password: "",
        });
      }
    }
  };
  const inputChangeHandler = (event) => {
    setUserCredentials({
      ...userCredentials,
      [event.target.name]: event.target.value,
    });
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  useEffect(() => {
    if (authState) {
      const mergeCartAndUpdate = async () => {
        const mergeCart = await axiosPrivate.post("/user/mergecart", {
          clientCartItems: state.cartItems,
        });

        if (mergeCart.status === 201) {
          dispatch({
            type: "MERGE-LOCAL-CART-AND-DB-CART-ITEMS",
            payload: mergeCart.data.cartItems,
          });
        }
      };
      const fetchAndUpdateUserWishlist = async () => {
        const response = await axiosPrivate.get("/user/fetchwishlist");
        if (response.status === 200) {
          dispatch({
            type: "UPDATE-USER-WISHLIST-FROM-SERVER",
            payload: response.data.userWishlist,
          });
        }
      };
      mergeCartAndUpdate();
      fetchAndUpdateUserWishlist();
      navigate(location?.state?.path || "/", { replace: true });
      showToast("User logged in", "success");
    }
  }, [authState]);

  return (
    <>
      <div className="login-page-container">
        <div className="login-container">
          <div className="login-header-container">Plant Mart</div>
          <div className="login-input-container">
            <input
              type="text"
              placeholder="Username"
              onChange={inputChangeHandler}
              name="name"
              value={userCredentials?.name}
            />
            <span>{showLoginError.name}</span>
            <input
              type="password"
              placeholder="Password"
              onChange={inputChangeHandler}
              name="password"
              value={userCredentials?.password}
            />
            <span>{showLoginError.password}</span>
          </div>
          <div className="login-persist-container">
            <label htmlFor="persistcheckbox">
              <input
                type="checkbox"
                id="persistcheckbox"
                checked={persist}
                onChange={togglePersist}
              />
              Trust this device
            </label>
          </div>
          <div className="login-button-container">
            <button onClick={loginButtonHandler}>Log in</button>
          </div>
          <Link to="/signup">Create new account</Link>
        </div>
      </div>
    </>
  );
};
