import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

const AuthGuard = (Component: React.ComponentType<any>) => {
  const AuthHoc: React.FC<any> = (props) => {
    const authCheck = () => {
      const user = auth.currentUser;

      if (user) {
        return <Component {...props} />;
      } else {
        return <Navigate to="/" />;
      }
    };

    
    return <>{authCheck()}</>;
  };

  return AuthHoc;
};

export default AuthGuard;
