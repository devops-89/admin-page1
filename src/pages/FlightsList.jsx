import React from "react";
import GenericTable from "../components/GenericTable.jsx";
import { data } from "../assets/data.js";
import { useState } from "react";
import FullScreenDialog from "../components/FullScreenDialog.jsx";

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
 
   const [openDialog, setOpenDialog] = useState(false);
   const [selectedId, setSelectedId] = useState(null);
   
 
   const handleView = (id) => {
     setSelectedId("flightList_"+id); 
     setOpenDialog(true); 
   };

  const table_heading = {
    heading: "Flight Reservations",
    para: "Explore, book, and track your flights conveniently.",
  };

  return (
    <>
    <GenericTable
      data={data.flight_page}
      columns={columns}
      onActionClick={handleView}
      table_heading={table_heading}
    />
    <FullScreenDialog
    open={openDialog}
    onClose={() => setOpenDialog(false)}
    selectedId={selectedId}
  />
  </>
    
  );
};

export default FlightsList;
