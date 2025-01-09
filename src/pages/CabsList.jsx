import React from "react";
import GenericTable from "../components/GenericTable.jsx";
import { data } from "../assets/data.js";

const CabsList = () => {
  const columns = [
    { key: "id", label: "Cab ID" },
    { key: "pickup_location", label: "Pickup Location" },
    { key: "drop_location", label: "Drop Location" },
    { key: "phone_number", label: "Phone Number" },
    { key: "number_of_passengers", label: "Number of Passengers" },
    { key: "pickup_date", label: "Pickup Date" },
    { key: "pickup_time", label: "Pickup Time" },
    { key: "status", label: "Status" },
  ];

  const table_heading = {
    heading: "Cab Services",
    para: "Book and manage your cab rides for a seamless travel experience.",
  };

  const handleView = (id) => {
    console.log("View cab Detail:", id);
  };

  return (
    <GenericTable
      data={data.cab_page}
      columns={columns}
      onActionClick={handleView}
      table_heading={table_heading}
    />
  );
};

export default CabsList;
