import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Box, Chip, makeStyles } from "@material-ui/core";

FilterViewer.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(2, 0),
    listStyleType: "none",
    padding: 0,
  },
  "&>li": {
    margin: 0,
    padding: theme.spacing(1),
  },
}));
const FILTER_LIST = [
  // {
  //   id: 1,
  //   getLabel: (filters) => "Giao hàng miễn phí",
  //   isActive: (filters) => filters.isFreeShip,
  //   isVisible: () => true, //luôn luôn show
  //   isRemovable: false,
  //   onRemove: () => {},
  //   onToggle: (filters) => {
  //     const newFilters = { ...filters };
  //     if (newFilters.isFreeShip) {
  //       delete newFilters.isFreeShip;
  //     } else {
  //       newFilters.isFreeShip = true;
  //     }
  //     return newFilters;
  //   },
  // },
  // {
  //   id: 2,
  //   getLabel: () => "Có khuyến mãi",
  //   isActive: () => true,
  //   isVisible: (filters) => filters.isPromotion,
  //   isRemovable: true,
  //   onRemove: (filters) => {
  //     const newFilters = { ...filters };
  //     delete newFilters.isPromotion;
  //     return newFilters;
  //   },
  //   onToggle: null,
  // },
  {
    id: 1,
    getLabel: (filters) =>
      `Giá từ ${filters.price_gte} đến ${filters.price_lte}`,
    isActive: () => true,
    isVisible: (filters) =>
      Object.keys(filters).includes("price_lte") &&
      Object.keys(filters).includes("price_gte"),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.price_lte;
      delete newFilters.price_gte;
      return newFilters;
    },
    onToggle: null,
  },
  {
    id: 2,
    getLabel: (filters) => `Ga đi ${filters._province}`,
    isActive: (filters) => true,
    isVisible: (filters) => Object.keys(filters).includes("_province"),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters._province;
      return newFilters;
    },
    onToggle: () => null,
  },
  {
    id: 3,
    getLabel: (filters) => `Ga đến ${filters._toProvince}`,
    isActive: (filters) => true,
    isVisible: (filters) => Object.keys(filters).includes("_toProvince"),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters._toProvince;
      return newFilters;
    },
    onToggle: () => null,
  },
];
function FilterViewer({ filters = {}, onChange = null }) {
  const classes = useStyles();
  const visitbleFilters = useMemo(
    () => FILTER_LIST.filter((x) => x.isVisible(filters)),
    [filters]
  );
  return (
    <Box component="ul" className={classes.root}>
      {visitbleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? "primary" : "default"}
            clickable={!x.isRemovable}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return;
                    const newFilters = x.onToggle(filters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;
                    const newFilters = x.onRemove(filters);
                    onChange(newFilters);
                  }
                : null
            }
          ></Chip>
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
