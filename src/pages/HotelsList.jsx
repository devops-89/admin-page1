import React from "react";
import GenericTable from "../components/GenericTable.jsx";
import { data } from "../assets/data.js";
import { useState } from "react";
import FullScreenDialog from "../components/FullScreenDialog.jsx";

const HotelsList = () => {
  const columns = [
    { key: "id", label: "ID" },
    { key: "city", label: "City" },
    { key: "hotel_name", label: "Hotel Name" },
    { key: "nationality", label: "Nationality" },
    { key: "check_in", label: "Check In" },
    { key: "check_out", label: "Check Out" },
    { key: "room", label: "Room" },
    { key: "status", label: "Status" },
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  

  const handleView = (id) => {
    setSelectedId("hotelList_"+id); 
    setOpenDialog(true); 
  };

  const table_heading = {
    heading: "Hotel Bookings",
    para: "Browse, book, and manage your hotel stays with ease.",
  };

  return (
    <>
    <GenericTable
      data={data.hotel_page}
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

export default HotelsList;
