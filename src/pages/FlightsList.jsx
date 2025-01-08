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

// const bookings = data.flight_page
// // console.log(bookings);

// const FlightBookingList = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   const filteredBookings = bookings.filter(
//     (booking) =>
//       booking.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
//               <TableCell>From</TableCell>
//               <TableCell>To</TableCell>
//               <TableCell>Depart Date</TableCell>
//               <TableCell>Adult</TableCell>
//               <TableCell>Children</TableCell>
//               <TableCell>Infant</TableCell>
//               <TableCell>Class</TableCell>
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
//                 <TableCell>{booking.from}</TableCell>
//                 <TableCell>{booking.to}</TableCell>
//                 <TableCell>{booking.depart_date}</TableCell>
//                 <TableCell>{booking.adult}</TableCell>
//                 <TableCell>{booking.children}</TableCell>
//                 <TableCell>{booking.infant}</TableCell>
//                 <TableCell>{booking.class}</TableCell>
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

// export default FlightBookingList;







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

  return <GenericTable data={data.flight_page} columns={columns} onActionClick={handleView} />;
};

export default FlightsList;




