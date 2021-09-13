import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import PropTypes from "prop-types";
import queryString from "query-string";
import React, { useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import productApi from "../../../api/productApi";
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from "../../../constants/common";
import AddTripController from "../../Admin/AddTripController";
import UpdateTrip from "../../Admin/UpdateTrip ";
import UpdateTripController from "../../Admin/UpdateTripController";
import Register from "../../Auth/components/Register";

Product.propTypes = {
  product: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  station: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "13px",
  },
  extraInfo: {
    textAlign: "center",
  },
  title: {
    textAlign: "center",
    color: "blue",
  },
  deleteButton: {
    color: "black",
    backgroundColor: "red",
    width: "100%",
  },
  updateButton: {
    color: "black",
    backgroundColor: "blue",
    width: "100%",
  },
}));

function Product({ product, isAdmin }) {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail}`
    : `${THUMBNAIL_PLACEHOLDER}`;
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      deleteId: product.tripId || 0,
    };
  }, [location.search]);

  const handleDeleteTrip = async () => {
    const deletedTrip = await productApi.deleteTrip({ tripId: product.tripId });
    history.push({
      pathname: location.pathname,
      search: queryString.stringify(queryParams),
    });
  };
  const handleClick = () => {
    history.push(`/products/seats/${product.tripId}`);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Box border="1px solid grey">
      <Box
        padding={1}
        minHeight="300px"
        border="1px solid grey"
        onClick={handleClick}
      >
        <Box minHeight="150px" height="150px" padding={1} overflow="hidden">
          <img src={thumbnailUrl} alt="" width="100%" height="100%" />
        </Box>
        <Typography className={classes.station} variant="body2">
          Bến xe đi: {product.fromName}
        </Typography>
        <Typography variant="body2" className={classes.title}>
          Hãng xe:{product.brandName}
        </Typography>
        <Typography className={classes.station} variant="body2">
          Bến xe đến: {product.toName}
        </Typography>
        {/* <Typography variant="body2">{product.toProvince}</Typography> */}
        <Typography variant="body2" className={classes.extraInfo}>
          <Box component="span" fontSize="16px" fontWeight="bold">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.price)}
          </Box>
          <Box>Thời gian xuất phát {product.startTime}</Box>
          {product.name > 0 ? ` - ${product.address}%` : ""}
        </Typography>
      </Box>
      {isAdmin ? (
        <Box style={{ textAlign: "center" }}>
          <Button onClick={handleDeleteTrip} className={classes.deleteButton}>
            Delete
          </Button>
          <Button onClick={handleClickOpen} className={classes.updateButton}>
            Update
          </Button>
        </Box>
      ) : (
        <></>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
        disableEscapeKeyDown
      >
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <Close></Close>
        </IconButton>
        <DialogContent>
          <>
            <UpdateTrip tripId={product.tripId} closeDialog={handleClose} />
          </>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Product;
