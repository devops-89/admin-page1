import React from "react";
import GenericTable from "../components/GenericTable.jsx";
import { data } from "../assets/data.js";

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

  const table_heading = {
    heading: "User Details",
    para: "Manage your personal details, bookings, and preferences.",
  };

  const handleView = (id) => {
    console.log("View user details:", id);
  };

  return (
    <GenericTable
      data={data.users_page}
      columns={columns}
      onActionClick={handleView}
      table_heading={table_heading}
    />
  );
};

export default UsersList;
