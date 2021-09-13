import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};
const userStyles = makeStyles((theme) => ({
  root: {
    borderTop: "1px solid grey",
    padding: theme.spacing(2),
  },
  range: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    listStyle: "none",
    "&>span": {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
}));
function FilterByPrice({ onChange }) {
  const classes = userStyles();
  const [values, setValues] = useState({
    price_gte: 0,
    price_lte: 0,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    if (onChange) onChange(values);
  };
  return (
    <Box className={classes.root}>
      <Typography>Khoảng giá</Typography>
      <Box className={classes.range}>
        <TextField
          name="price_gte"
          value={values.price_gte}
          onChange={handleChange}
        />
        <span>-</span>
        <TextField
          name="price_lte"
          value={values.price_lte}
          onChange={handleChange}
        />
      </Box>
      <Button variant="outlined" color="primary" onClick={handleSubmit}>
        Áp dụng
      </Button>
    </Box>
  );
}

export default FilterByPrice;
