import { AppBar, Box, makeStyles, Tab, Tabs } from "@material-ui/core";
import { TabContext, TabPanel } from "@material-ui/lab";
import React, { useState } from "react";
import AddTrip from "./AddTrip";
import DeleteTrip from "./DeleteTrip";
AdminFeature.propTypes = {};
const useStyles = makeStyles({});

function AdminFeature(props) {
  const classes = useStyles();
  const handleFeatureChange = (event, newValue) => {
    setValue(newValue);
  };
  const [value, setValue] = useState(0);

  return (
    <Box className={classes.root}>
      <TabContext value={value}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleFeatureChange}
            aria-label="simple tabs example"
            className={classes.root}
          >
            <Tab label="EDIT Trips" />
            <Tab label="Add Trips" />
          </Tabs>
        </AppBar>
        <TabPanel value={1} index={1}>
          <AddTrip />
        </TabPanel>
        <TabPanel value={0} index={0}>
          <DeleteTrip />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default AdminFeature;
