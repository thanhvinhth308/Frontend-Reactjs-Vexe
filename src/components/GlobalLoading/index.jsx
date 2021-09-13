import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    width: "100vw",
    height: "120vh",
    top: "0",
    left: "0",
    background: "white",
    opacity: "0.4",
  },
  loading: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: "center",
    width: "100vw",
    zIndex: "3",
  },
}));

export default function GlobalLoading() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.loading}>
        <CircularProgress color="secondary" />
      </div>
    </div>
  );
}
