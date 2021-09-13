import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField } from "@material-ui/core";
import FilterByCategory from "./Filters/FilterByCategory";
import FilterByPrice from "./Filters/FilterByPrice";
import FilterByToStation from "./Filters/FilterByToStation";

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilters({ filters, onChange, onSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleCategoryChange = (newProvince) => {
    if (!onChange) return;
    const newFilters = {
      ...filters,
      _province: newProvince,
    };
    onChange(newFilters);
  };
  const handleToStationChange = (newProvince) => {
    if (!onChange) return;
    const newFilters = {
      ...filters,
      _toProvince: newProvince,
    };
    onChange(newFilters);
  };
  const handleChange = (values) => {
    if (onChange) onChange(values);
  };
  const handleBrandSearch = () => {
    if (onSearch) {
      onSearch(searchText);
    }
  };
  return (
    <Box>
      <Box width="100%" display="flex">
        <TextField
          placeholder="Brand Name"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleBrandSearch}>
          Search
        </Button>
      </Box>
      <FilterByCategory onChange={handleCategoryChange} filters={filters} />
      <FilterByToStation onChange={handleToStationChange} filters={filters} />
      <FilterByPrice onChange={handleChange}></FilterByPrice>
    </Box>
  );
}

export default ProductFilters;
