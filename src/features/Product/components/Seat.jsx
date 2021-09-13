import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import seatApi from "../../../api/seat";
import { addToCart } from "../../Cart/CartSlice";
import AddToCardForm from "../components/AddToCardForm";
Seat.propTypes = {
  seat: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  bookedTicket: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "13px",
    color: "red",
  },
  ticket: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "13px",
    color: "blue",
  },
  code: {
    textAlign: "center",
  },
  extraInfo: {
    textAlign: "center",
  },
}));
const handleClick = () => {};
function Seat({ seat = {} }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const {
    params: { ticketId },
  } = useRouteMatch();
  const handleAddToCartSubmit = async (seatId) => {
    const [data] = await seatApi.getById(seatId);
    const action = addToCart(data);
    dispatch(action);
    enqueueSnackbar("Mua vé xe thành công", { variant: "success" });
  };
  return (
    <Box padding={1} onClick={handleClick}>
      <Paper variant={4}>
        <Box variant="body2">
          {seat.isBooked === 0 ? (
            <Typography variant="body2" className={classes.ticket}>
              CHƯA ĐẶT
            </Typography>
          ) : (
            <Typography variant="body2" className={classes.bookedTicket}>
              ĐÃ ĐẶT
            </Typography>
          )}
        </Box>
        <Typography variant="body2" className={classes.code}>
          Mã số ghế:{seat.code}
        </Typography>
        <Typography variant="body2" className={classes.extraInfo}>
          <Box component="span" fontSize="16px" fontWeight="bold">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(seat.price)}
          </Box>
          <Box>Thời gian xuất phát {seat.startTime}</Box>
          <AddToCardForm seat={seat} onSubmit={handleAddToCartSubmit} />
        </Typography>
      </Paper>
    </Box>
  );
}

export default Seat;
