import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, Paper } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FileFiled from "../../../components/form-controls/FileField";
import InputField from "../../../components/form-controls/InputField";
import NumberField from "../../../components/form-controls/NumberField";
import SelectionField from "../../../components/form-controls/SelectionField";
import TimeInputField from "../../../components/form-controls/TimeInputField";
UpdateTripController.propTypes = {};

function UpdateTripController({ onSubmit }) {
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
      // seatQuantity: 7,
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
        <Container maxWidth="md">
          <Box>
            <SelectionField
              form={form}
              name="fromStation"
              label="fromStation"
            ></SelectionField>
          </Box>
          <Box>
            <SelectionField
              form={form}
              name="toStation"
              label="toStation"
            ></SelectionField>
          </Box>
          <Box>
            <TimeInputField
              form={form}
              name="startTime"
              label="startTime"
            ></TimeInputField>
          </Box>
          <Box>
            <NumberField form={form} name="price" label="price"></NumberField>
          </Box>
          <Box>
            <InputField
              form={form}
              name="brandName"
              label="brandName"
            ></InputField>
          </Box>
          {/* <Box>
            <NumberField
              form={form}
              name="seatQuantity"
              label="seatQuantity"
            ></NumberField>
          </Box> */}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update
          </Button>
        </Container>
      </form>
    </Paper>
  );
}

export default UpdateTripController;
