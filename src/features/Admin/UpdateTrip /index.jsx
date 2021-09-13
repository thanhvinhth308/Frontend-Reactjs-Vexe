import React from "react";
import { useHistory } from "react-router-dom";
import productApi from "../../../api/productApi";
import seatApi from "../../../api/seat";
import UpdateTripController from "../UpdateTripController";

UpdateTrip.propTypes = {};

function UpdateTrip(props) {
  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      const newTrip = await productApi.updateTrip({
        tripId: props.tripId,
        ...values,
      });
      history.push("/");
    } catch (error) {
      console.log("failed to create trip", error);
    }
  };

  return (
    <div>
      <UpdateTripController onSubmit={handleSubmit} />
    </div>
  );
}

export default UpdateTrip;
