import { FormControl } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { name, form } = props;
  const {
    formState: { errors },
  } = form;
  const hasError = errors[name];

  return (
    <FormControl style={{ width: "100%" }} variant="outlined">
      {/* <FormControl variant="outlined"> */}
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => {
          // console.log(field);
          return (
            <TextField
              fullWidth
              placeholder={name}
              variant="outlined"
              margin="normal"
              error={!!hasError}
              helperText={errors[name]?.message}
              {...field}
            />
          );
        }}
      />
    </FormControl>
  );
}

export default InputField;
