import { Box, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import Seat from "./Seat";

SeatList.propTypes = {
  data: PropTypes.array,
};
function SeatList({ data = [] }) {
  return (
    <div>
      <Box>
        <Grid container>
          {data.map((seat) => (
            <Grid item key={seat.id} xs={12} sm={6} md={4} lg={3}>
              <Box padding={1}>
                <Seat seat={seat}></Seat>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default SeatList;
