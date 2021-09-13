import {
  Box,
  Button,
  Container,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import emailApi from "../../api/email";
import seatApi from "../../api/seat";
import ticketApi from "../../api/ticketApi";
import vnpayApi from "../../api/vnpayApi";
import { removeFromCart, resetCart } from "./CartSlice";
import GlobalLoading from "../../components/GlobalLoading";
CartItemList.propTypes = {};
const useStyles = makeStyles((theme) => ({
  box: {
    textAlign: "center",
    listStyleType: "none",
    width: "80%",
    margin: "15px auto",
    padding: "0 0",
    minHeight: "80vh",
  },
  item: {
    border: "1px solid grey",
  },
  "btn-delete": {
    backgroundColor: "red",
    border: "1px solid black",
    width: "100%",
    color: "black",
    fontWeight: "bold",
    padding: "10px",
  },
}));

function CartItemList(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const itemList = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user.current);
  const { enqueueSnackbar } = useSnackbar();

  const totalPrice = itemList.reduce((total, current) => {
    return total + current.price;
  }, 0);

  const handleRemoveClick = async (seatId) => {
    const seatIdFromEvent = seatId;
    const updatedSeat = await seatApi.updateSeat({
      id: seatIdFromEvent,
      userId: 0,
    });
    const action = removeFromCart(seatIdFromEvent);
    dispatch(action);
    enqueueSnackbar("Huỷ đặt vé xe thành công", { variant: "success" });
  };
  const handleOrderConfirm = async () => {
    try {
      setIsLoading(true);
      await emailApi.sendEmail({
        itemList: itemList,
        user: user,
        price: totalPrice,
      });
      const url = await vnpayApi.payPrice(totalPrice);
      await ticketApi.createTicket({
        id: user.id,
        price: totalPrice,
      });
      const action = resetCart();
      dispatch(action);
      setIsLoading(false);
      enqueueSnackbar("Xác nhận đặt vé xe thành công", { variant: "success" });
      // history.push(`${url}`);
      window.open(`${url}`);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <GlobalLoading />}
      <Box textAlign="center">
        <Typography variant="h4" component="h4" color="secondary">
          Nhấn Đặt Vé Để Xác Nhận
        </Typography>
      </Box>
      <ul className={classes.box}>
        {itemList.map((item) => (
          <Paper variant={4} className={classes.item}>
            <Box
              component="li"
              display="flex"
              justifyContent="space-around"
              padding="20px 20px  "
            >
              <Box>
                <Typography color="primary" variant="h6">
                  Hãng xe
                </Typography>
                {item.brandName}
              </Box>
              <Box>
                <Typography color="primary" variant="h6">
                  Code vé
                </Typography>{" "}
                {item.code}
              </Box>
              <Box>
                <Typography color="primary" variant="h6">
                  {" "}
                  Thời Gian xuất phát
                </Typography>{" "}
                {item.startTime}
              </Box>
              <Box
                alignSelf="center"
                component="span"
                fontSize="16px"
                fontWeight="bold"
                color="red"
              >
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item.price)}
              </Box>
              <Box>
                <Button
                  onClick={() => handleRemoveClick(item.id)}
                  className={classes["btn-delete"]}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Paper>
        ))}
        <li>
          <Paper variant={4} className={classes.item}>
            <Box
              component="li"
              display="flex"
              justifyContent="space-around"
              padding="15px"
            >
              <Box
                component="span"
                fontSize="25px"
                fontWeight="bold"
                color="red"
              >
                Total:
              </Box>
              <Box
                component="span"
                fontSize="25px"
                fontWeight="bold"
                color="red"
              >
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalPrice)}
              </Box>
            </Box>
          </Paper>
        </li>
        <li>
          <Paper variant={4} className={classes.item}>
            <Box
              component="button"
              display="flex"
              justifyContent="space-around"
              width="100%"
              fontSize="25px"
              fontWeight="bold"
              padding="20px"
              color="white"
              onClick={handleOrderConfirm}
              bgcolor="blue"
            >
              Đặt vé
            </Box>
          </Paper>
        </li>
      </ul>
    </div>
  );
}

export default CartItemList;
