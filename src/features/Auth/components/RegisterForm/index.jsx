import React from "react";
import PropTypes from "prop-types";
import InputField from "../../../../components/form-controls/InputField";
import PasswordField from "../../../../components/form-controls/PasswordField";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(5),
  },
  avatar: {
    margin: "0 auto",
    background: theme.palette.secondary.main,
  },
  title: {
    margin: theme.spacing(2, 0, 4, 0),
    textAlign: "center",
  },
  submit: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: "center",
  },
  progress: {
    position: "absolute",
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

function RegisterForm(props) {
  const classes = useStyles();
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("please enter fullname")
      .test(
        "should has at least two word",
        "please enter at least two word",
        (value) => {
          return value.split(" ").length >= 2;
        }
      ),
    password: yup
      .string()
      .required("please enter password")
      .min(6, "at least 6 characters"),
    numberPhone: yup.string().required("please type numberPhone "),
    // .oneOf([yup.ref("password")], "password does nota match"),
    email: yup
      .string()
      .required("please enter email")
      .email("enter valid email"),
  });
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      numberPhone: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmitForm = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
    form.reset();
  };
  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <Avatar className={classes.avatar}>
        <LockOutlined></LockOutlined>
      </Avatar>
      <Typography className={classes.title} component="h3" variant="h5">
        create an account
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmitForm)}>
        <InputField form={form} name="name" label="name" />
        <InputField form={form} name="email" label="email" />
        <PasswordField form={form} name="password" label="password" />
        <InputField form={form} name="numberPhone" label="numberPhone" />
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={classes.submit}
        >
          Create account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
