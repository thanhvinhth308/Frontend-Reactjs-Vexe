import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";
import productApi from "../../../../api/productApi";
FilterByCategory.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object,
};
const userStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  menu: {
    padding: 0,
    margin: 0,
    listStyle: "none",
    "&>li": {
      marginTop: theme.spacing(1),
      transition: "all .25s",
      "&:hover": {
        cursor: "pointer",
        color: theme.palette.primary.main,
      },
    },
  },
}));
function FilterByCategory({ onChange, filters }) {
  const [categoryList, setCategoryList] = useState([]);
  const classes = userStyles();
  useEffect(() => {
    (async () => {
      try {
        const list = await productApi.getAll(filters);
        let filteredList = list
          .map((value) => value["province"])
          .map((value, i, array) => array.indexOf(value) === i && i)
          .filter((value) => list[value])
          .map((value) => list[value]);
        setCategoryList(
          filteredList.map((item) => ({
            id: item.tripId,
            province: item.province,
          }))
        );
      } catch (error) {}
    })();
  }, []);
  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange(category.province);
    }
  };
  return (
    <Box className={classes.root}>
      <Box component="span" fontSize="16px" fontWeight="bold">
        Các nhà ga đi
      </Box>
      <ul className={classes.menu}>
        {categoryList.map((category) => (
          <li
            key={category.id}
            onClick={() => {
              handleCategoryClick(category);
            }}
          >
            <Typography variant="body2">{category.province}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByCategory;
