import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, InputLabel, Paper } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FileFiled from "../../../components/form-controls/FileField";
import InputField from "../../../components/form-controls/InputField";
import NumberField from "../../../components/form-controls/NumberField";
import SelectionField from "../../../components/form-controls/SelectionField";
import TimeInputField from "../../../components/form-controls/TimeInputField";
AddTripController.propTypes = {};

function AddTripController({ onSubmit }) {
  const schema = yup.object().shape({
    fromStation: yup.number().required("please enter station"),
    toStation: yup.number().required("please enter station"),
    price: yup.number().required("please enter price"),
    seatQuantity: yup
      .number()
      .min(1, "please at least 1")
      .typeError("please type number seats"),
  });

  const form = useForm({
    defaultValues: {
      fromStation: 1,
      toStation: 2,
      startTime: "07:30",
      price: 100000,
      brandName: null,
      seatQuantity: 7,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmitForm = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
    form.reset();
  };

  return (
    <Paper elevation={4}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        enctype={"multipart/form-data"}
      >
        <Container maxWidth="md" style={{ paddingBottom: "20px" }}>
          <Box marginTop="20px">
            <SelectionField
              form={form}
              name="fromStation"
              label="fromStation"
            ></SelectionField>
          </Box>
          <Box marginTop="20px">
            <SelectionField
              form={form}
              name="toStation"
              label="toStation"
            ></SelectionField>
          </Box>
          <Box marginTop="20px">
            <TimeInputField
              form={form}
              name="startTime"
              label="startTime"
            ></TimeInputField>
          </Box>
          <Box marginTop="20px">
            <NumberField form={form} name="price" label="price"></NumberField>
          </Box>
          <Box marginTop="20px">
            <InputField
              form={form}
              name="brandName"
              label="brandName"
            ></InputField>
          </Box>
          <Box marginTop="20px">
            <NumberField
              form={form}
              name="seatQuantity"
              label="seatQuantity"
            ></NumberField>
          </Box>
          <InputLabel style={{ marginTop: "20px" }}>Choose image</InputLabel>
          <FileFiled
            ref={form.register("anh")}
            form={form}
            name="anh"
            label="anh"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ padding: "15px 0px" }}
            // className={classes.submit}
          >
            Create
          </Button>
        </Container>
      </form>
    </Paper>
  );
}

export default AddTripController;
