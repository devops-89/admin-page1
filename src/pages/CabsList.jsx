// import React, { useState } from "react";
// import {data} from '../assets/data.js'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   TextField,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Pagination,
//   Box,
// } from "@mui/material";

// const bookings = data.cab_page
// // console.log(bookings)

// const CabBookingList = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   const filteredBookings = bookings.filter(
//     (booking) =>
//       booking.pickup_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.drop_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.phone_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.status.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredBookings.length / entriesPerPage);
//   const displayedBookings = filteredBookings.slice(
//     (currentPage - 1) * entriesPerPage,
//     currentPage * entriesPerPage
//   );

//   const handleView = (id) => {
//     console.log("View booking Detail:", id);
//   };

//   return (
//     <Box>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: 2,
//         }}
//       >
//         <FormControl size="small" sx={{ minWidth: 120 }}>
//           <InputLabel id="entries-per-page-label">Entries</InputLabel>
//           <Select
//             labelId="entries-per-page-label"
//             value={entriesPerPage}
//             onChange={(e) => setEntriesPerPage(parseInt(e.target.value, 10))}
//           >
//             {[5, 10, 20, 50].map((count) => (
//               <MenuItem key={count} value={count}>
//                 {count}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <TextField
//           size="small"
//           label="Search"
//           variant="outlined"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </Box>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Pickup Location</TableCell>
//               <TableCell>Drop Location</TableCell>
//               <TableCell>Phone Number</TableCell>
//               <TableCell>Number of Passengers</TableCell>
//               <TableCell>Pickup Date</TableCell>
//               <TableCell>Pickup Time</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {displayedBookings.map((booking) => (
//               <TableRow
//                 key={booking.id}
//                 sx={{
//                   "&:hover": {
//                     backgroundColor: "rgba(0, 0, 0, 0.08)",
//                   },
//                 }}
//               >
//                 <TableCell>{booking.id}</TableCell>
//                 <TableCell>{booking.pickup_location}</TableCell>
//                 <TableCell>{booking.drop_location}</TableCell>
//                 <TableCell>{booking.phone_number}</TableCell>
//                 <TableCell>{booking.number_of_passengers}</TableCell>
//                 <TableCell>{booking.pickup_date}</TableCell>
//                 <TableCell>{booking.pickup_time}</TableCell>
//                 <TableCell>
//                   <span
//                     style={{
//                       color: booking.status === "Confirmed" ? "green" : "orange",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {booking.status}
//                   </span>
//                 </TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     size="small"
//                     onClick={() => handleView(booking.id)}
//                     style={{ marginRight: "5px" }}
//                   >
//                     View
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
//         <Pagination
//           count={totalPages}
//           page={currentPage}
//           onChange={(_, page) => setCurrentPage(page)}
//           color="primary"
//         />
//       </Box>
//     </Box>
//   );
// };

// export default CabBookingList;










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
    heading : 'Cab Services',
    para : 'Book and manage your cab rides for a seamless travel experience.'
  }

  const handleView = (id) => {
    console.log("View cab Detail:", id);
  };

  return <GenericTable data={data.cab_page} columns={columns} onActionClick={handleView} table_heading={table_heading} />;
};

export default CabsList;
