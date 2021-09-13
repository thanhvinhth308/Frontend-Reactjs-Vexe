import React from "react";
import { useHistory } from "react-router-dom";
import productApi from "../../../api/productApi";
import seatApi from "../../../api/seat";
import AddTripController from "../AddTripController";

AddTrip.propTypes = {};

function AddTrip(props) {
  const history = useHistory();
  const handleSubmit = async (values) => {
    try {
      const newTrip = await productApi.createTrip(values);
      const newSeatList = await seatApi.createSeats({
        tripId: newTrip.id,
        quantity: values.seatQuantity,
        price: values.price,
      });
      history.push("/products");
    } catch (error) {
      console.log("failed to create trip", error);
    }
  };

  return (
    <div>
      <AddTripController onSubmit={handleSubmit} />
    </div>
  );
}

export default AddTrip;
