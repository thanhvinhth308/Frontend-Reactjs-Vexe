import { Box } from "@material-ui/core";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ListPage from "./pages/ListPage";
import ListSeats from "./pages/ListSeats";

ProductFeature.propTypes = {};

function ProductFeature(props) {
  const math = useRouteMatch();
  return (
    <Box minHeight="80vh" pt={4}>
      <Switch>
        <Route path={math.url} exact component={ListPage}></Route>
        <Route
          path={`${math.url}/seats/:productId`}
          component={ListSeats}
          exact
        ></Route>
      </Switch>
    </Box>
  );
}

export default ProductFeature;
