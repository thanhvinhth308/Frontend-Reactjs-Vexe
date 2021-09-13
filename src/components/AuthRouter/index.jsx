import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
function AuthRouter({ component: Component, onLogin, ...rest }) {
  const LoggedInUser = useSelector((state) => state.user.current.id);
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          return !LoggedInUser ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/products", state: { from: props.location } }}
            />
          );
        }}
      />
    </div>
  );
}

export default AuthRouter;
