import React from "react";
import GenericTable from "../../components/GenericTable.jsx";
import { data } from "../../assets/data.js";
import FullScreenDialog from "../../components/FullScreenDialog.jsx";
import { useState } from "react";


const UsersList = () => {
  const columns = [
    { key: "id", label: "ID" },
    { key: "profileImage", label: "Profile" },
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "status", label: "Status" },
  ];

   const [openDialog, setOpenDialog] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleView = (id) => {
      setSelectedId("usersList_"+id); 
      setOpenDialog(true); 
    };

  const table_heading = {
    heading: "User Details",
    para: "Manage your personal details, bookings, and preferences.",
  };

 
  return (
    <>
    <GenericTable
      data={data.users_page}
      columns={columns}
      onActionClick={handleView}
      table_heading={table_heading}
      actionPath="/dashboard/users/user-details"
    />
    <FullScreenDialog
    open={openDialog}
    onClose={() => setOpenDialog(false)}
    selectedId={selectedId}
  />
  </>
  );
};

export default UsersList;
