import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const PrivateRoute = () => {
  const { authState } = useAuth();
  const location = useLocation();
  console.log(location);

  return (
    <>
      {authState ? (
        <Outlet />
      ) : (
        <Navigate
          to="/login"
          replace={true}
          state={{ path: location.pathname }}
        />
      )}
    </>
  );
};
