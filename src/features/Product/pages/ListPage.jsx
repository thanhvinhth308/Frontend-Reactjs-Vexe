import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import queryString from "query-string";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import productApi from "../../../api/productApi";
import FilterViewer from "../components/Filters/FilterViewer";
import ProductFilters from "../components/ProductFilters";
import ProductList from "../components/ProductList";
import ProductSkeletonList from "../components/ProductSkeletonList";
import ProductSort from "../components/ProductSort";
ListPage.propTypes = {};
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
function ListPage(props) {
  const { isAdmin } = props;
  const classes = useStyle();
  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _sort: params._sort || "ASC",
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const data = await productApi.getAll(queryParams);
        setProductList(data);
      } catch (error) {
        console.log("Failed to fetch Api ", error);
      }
      setLoading(false);
    })();
  }, [queryParams]);
  const handleFilersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const handleSortChange = (newSortValue) => {
    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const setNewFilters = (newFilters) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };
  const handleBrandSearch = async (value) => {
    const data = await productApi.getTripBySearch({ brandName: value });
    setProductList(data);
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={2}>
              <ProductFilters
                filters={queryParams}
                onChange={handleFilersChange}
                onSearch={handleBrandSearch}
              ></ProductFilters>
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <ProductSort
              currentSort={queryParams._sort}
              onChange={handleSortChange}
            ></ProductSort>
            <FilterViewer
              filters={queryParams}
              onChange={setNewFilters}
            ></FilterViewer>
            <Paper elevation={2}>
              {loading ? (
                <ProductSkeletonList length={9} />
              ) : (
                <ProductList isAdmin={isAdmin} data={productList}></ProductList>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
