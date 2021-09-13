import React from "react";
import PropTypes from "prop-types";
import RegisterForm from "../RegisterForm";
import { useDispatch } from "react-redux";
import { register } from "../../userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const dispatch = useDispatch();
  const { closeDialog } = props;
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const action = register(values);
      console.log(
        "🚀 ~ file: index.jsx ~ line 20 ~ handleSubmit ~ action",
        action
      );
      const resultAction = await dispatch(action);
      console.log(
        "🚀 ~ file: index.jsx ~ line 21 ~ handleSubmit ~ resultAction",
        resultAction
      );
      const user = unwrapResult(resultAction);
      console.log("new user", user);
      enqueueSnackbar("register sucessfully", { variant: "success" });
      if (closeDialog) {
        closeDialog();
      }
    } catch (error) {
      console.log("fail to register", error);
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
//cha
