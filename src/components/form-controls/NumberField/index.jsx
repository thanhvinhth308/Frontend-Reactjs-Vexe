import { FormControl, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";

NumberField.propTypes = {};
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function NumberField({ form, label, name }) {
  const classes = useStyles();
  const {
    formState: { errors },
  } = form;
  const hasError = errors[name];

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
            id="standard-number"
            label={label}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={100000}
            placeholder="100000"
            error={!!hasError}
            helperText={errors[name]?.message}
            {...field}
          />
        )}
      />
    </FormControl>
  );
}

export default NumberField;
