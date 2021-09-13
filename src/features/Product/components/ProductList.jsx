import { Box, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import Product from "./Product";

ProductList.propTypes = {
  data: PropTypes.array,
};
ProductList.defaultProps = {
  data: [],
};

function ProductList({ data, isAdmin }) {
  return (
    <div>
      <Box>
        <Grid container>
          {data.map((product) => (
            <Grid item key={product.tripId} xs={12} sm={6} md={4} lg={3}>
              <Box padding={1}>
                <Product product={product} isAdmin={isAdmin}></Product>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default ProductList;
