import React from "react";
import GenericTable from "../components/GenericTable.jsx";
import { data } from "../assets/data.js";

const FlightsList = () => {
  const columns = [
    { key: "id", label: "Flight ID" },
    { key: "from", label: "From" },
    { key: "to", label: "To" },
    { key: "depart_date", label: "Departure Date" },
    { key: "adult", label: "Adults" },
    { key: "children", label: "Children" },
    { key: "infant", label: "Infants" },
    { key: "class", label: "Class" },
    { key: "status", label: "Status" },
  ];
  const handleView = (id) => {
    console.log("View flight Detail:", id);
  };

  const table_heading = {
    heading: "Flight Reservations",
    para: "Explore, book, and track your flights conveniently.",
  };

  return (
    <GenericTable
      data={data.flight_page}
      columns={columns}
      onActionClick={handleView}
      table_heading={table_heading}
    />
  );
};

export default FlightsList;
