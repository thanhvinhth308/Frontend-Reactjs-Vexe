import { FormHelperText } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function PasswordField(props) {
  const { name, label, form } = props;
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };
  const {
    formState: { errors },
  } = form;
  const hasError = errors[name];

  return (
    <div style={{ width: "500px" }}>
      <FormControl margin="normal" fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
        <Controller
          control={form.control}
          name={name}
          id={name}
          render={({ field }) => (
            <OutlinedInput
              label={label}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              {...field}
            />
          )}
        />
        <FormHelperText error={!!hasError}>
          {errors[name]?.message}
        </FormHelperText>
        {/* onChange={handleChange("password")}
        endAdornment=
        {
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleShowPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={70} */}
      </FormControl>
    </div>
  );
}

export default PasswordField;
