import { Button, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import seatApi from "../../../api/seat";
import { removeFromCart } from "../../Cart/CartSlice";
import { useSnackbar } from "notistack";
AddToCardForm.propTypes = {
  onSubmit: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(5),
  },
  avatar: {
    margin: "0 auto",
    background: theme.palette.secondary.main,
  },
  title: {
    margin: theme.spacing(2, 0, 4, 0),
    textAlign: "center",
  },
  submit: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: "center",
  },
  progress: {
    position: "absolute",
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));
function AddToCardForm({ onSubmit = null, seat = {} }) {
  const userId = useSelector((state) => state.user.current.id);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async () => {
    if (onSubmit) {
      const updatedSeat = await seatApi.updateSeat({
        id: seat.id,
        userId: userId,
      });
      await onSubmit(seat.id);
      setTimeout(async () => {
        const seatIdFromEvent = seat.id;
        const updatedSeat = await seatApi.updateSeat({
          id: seatIdFromEvent,
          userId: 0,
        });
        const action = removeFromCart(seatIdFromEvent);
        dispatch(action);
        enqueueSnackbar("Quá thời gian giữ vé", { variant: "error" });
      }, 500000);
    }
  };

  return (
    <div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ width: "250px" }}
        size="large"
        onClick={handleSubmit}
        disabled={seat.isBooked == 0 ? false : true}
      >
        ĐẶT VÉ
      </Button>
    </div>
  );
}

export default AddToCardForm;
