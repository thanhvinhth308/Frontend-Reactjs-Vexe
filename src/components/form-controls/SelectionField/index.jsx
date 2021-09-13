import { FormControl, InputLabel, makeStyles, Select } from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";

SelectionFiled.propTypes = {};
const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SelectionFiled({ form, name, label }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: "",
    name: "hai",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <FormControl
      style={{ width: "100%" }}
      // variant="outlined"
      className={classes.formControl}
    >
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <>
            <InputLabel htmlFor="age-native-simple">{name}</InputLabel>
            <Select
              native
              value={state.age}
              onChange={handleChange}
              inputProps={{
                name: "age",
                id: "age-native-simple",
              }}
              {...field}
            >
              <option aria-label="None" value="" />
              <option value={1}>Bến xe Mỹ Đình</option>
              <option value={2}>Bến xe Miền Tây</option>
              <option value={3}>Bến xe Giáp Bát</option>
              <option value={4}>Bến xe Nước Ngầm</option>
              <option value={5}>Bến xe Gia Lâm</option>
              <option value={6}>Bến xe trung tâm Đà Nẵng</option>
              <option value={7}>Bến xe Đức Linh</option>
              <option value={8}>Bến xe Nước Mát</option>
              <option value={9}>Bến xe liên tỉnh Đà Lạt</option>
              <option value={10}>Bến xe ngã tư Vũng Tàu</option>
              <option value={11}>Bến xe Tam Quan</option>
              <option value={12}>Bến xe Hoài Nhơn</option>
              <option value={13}>Bến xe Sông Hinh</option>
              <option value={14}>Bến xe Nam Tuy Hòa</option>
              <option value={15}>Bến xe huyện Sơn Hòa</option>
              <option value={16}>Bến xe thị trấn Hai Riêng</option>
              <option value={17}>Bến xe Miền Đông</option>
            </Select>
          </>
        )}
      />
    </FormControl>
  );
}

export default SelectionFiled;
