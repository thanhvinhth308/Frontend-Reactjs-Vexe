import { FormControl } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

FileFiled.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function FileFiled(props) {
  const { name, form, ref } = props;
  const onChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    form.setValue("anh", e.target.files[0]);
    console.log("file file file", file);
  };
  return (
    <FormControl style={{ width: "100%" }} variant="outlined">
      {/* <FormControl variant="outlined"> */}
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <TextField
            fullWidth
            placeholder={name}
            variant="outlined"
            ref={ref}
            type="file"
            onChange={onChange}
          />
        )}
      />
    </FormControl>
  );
}

export default FileFiled;
