import { FormControl, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";

TimeInputField.propTypes = {};
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    width: 200,
  },
}));

function TimeInputField({ form, label, name }) {
  const classes = useStyles();
  return (
    <FormControl
      style={{ width: "100%" }}
      variant="outlined"
      className={classes.formControl}
    >
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <TextField
            style={{ width: "100%" }}
            id="time"
            label="Start Time"
            type="time"
            defaultValue="07:30"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            {...field}
          />
        )}
      />
    </FormControl>
  );
}

export default TimeInputField;
