import React from "react";
import ListPage from "../../Product/pages/ListPage";

DeleteTrip.propTypes = {};

function DeleteTrip(props) {
  return (
    <div>
      <ListPage isAdmin={true}></ListPage>
    </div>
  );
}

export default DeleteTrip;
