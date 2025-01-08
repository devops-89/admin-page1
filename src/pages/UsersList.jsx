import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  Box,
} from "@mui/material";

const users = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  profileImage: `https://i.pravatar.cc/150?img=${i + 1}`,
  firstName: `First${i + 1}`,
  lastName: `Last${i + 1}`,
  username: `user${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone: `123-456-78${i % 10}${i}`,
  status: i % 2 === 0 ? "Active" : "Inactive",
}));

const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter users based on the search term
  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleEdit = (id) => {
    console.log("Edit user:", id);
    // Add your edit logic here
  };

  const handleDelete = (id) => {
    console.log("Delete user:", id);
    // Add your delete logic here
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Top Controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        {/* Entries Dropdown */}
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="entries-per-page-label">Entries</InputLabel>
          <Select
            labelId="entries-per-page-label"
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(parseInt(e.target.value, 10))}
          >
            {[5, 10, 20, 50].map((count) => (
              <MenuItem key={count} value={count}>
                {count}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Search TextField */}
        <TextField
          size="small"
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Profile</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedUsers.map((user) => (
              <TableRow key={user.id}  sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)', 
                },
              }}>
                <TableCell>
                  <Avatar alt={user.firstName} src={user.profileImage} />
                </TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <span
                    style={{
                      color: user.status === "Active" ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(user.id)}
                    style={{ marginRight: "5px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default UsersList;
