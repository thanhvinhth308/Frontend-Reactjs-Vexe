import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import seatApi from "../../../api/seat";
import ProductSkeletonList from "../components/ProductSkeletonList";
import SeatList from "../components/SeatList";
ListSeats.propTypes = {};
const useStyle = makeStyles((theme) => ({
  root: {},
  left: {
    width: "250px",
  },
  right: {
    flex: "1 1 0",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    paddingBottom: "20px",
  },
}));
function ListSeats(props) {
  const classes = useStyle();
  const changedStatusCart = useSelector((state) => state.cart.cartItems.length);
  const {
    params: { productId },
    params,
  } = useRouteMatch();
  const [seatList, setSeatList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const data = await seatApi.getByTripId(productId);
        setSeatList(data);
      } catch (error) {}
      setLoading(false);
    })();
  }, [params, changedStatusCart]);
  return (
    <Box className={classes.root}>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.right}>
            <Paper elevation={2}>
              {loading ? (
                <ProductSkeletonList length={9} />
              ) : (
                <SeatList data={seatList}></SeatList>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListSeats;
