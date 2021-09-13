import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
PrivateRouter.propTypes = {};

function PrivateRouter({ component: Component, ...rest }) {
  const LoggedInUser = useSelector((state) => state.user.current.id);
  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          LoggedInUser ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
        }
      />
    </div>
  );
}

export default PrivateRouter;
