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

// const hotels = data.hotel_page
// // console.log(hotels)

// const HotelsList = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   const filteredHotels = hotels.filter(
//     (hotel) =>
//       hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       hotel.hotel_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       hotel.status.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredHotels.length / entriesPerPage);
//   const displayedHotels = filteredHotels.slice(
//     (currentPage - 1) * entriesPerPage,
//     currentPage * entriesPerPage
//   );

//   const handleView = (id) => {
//     console.log("View hotel Detail:", id);
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
//               <TableCell>City</TableCell>
//               <TableCell>Hotel Name</TableCell>
//               <TableCell>Nationality</TableCell>
//               <TableCell>Check In</TableCell>
//               <TableCell>Check Out</TableCell>
//               <TableCell>Room</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {displayedHotels.map((hotel) => (
//               <TableRow key={hotel.id} sx={{
//                 '&:hover': {
//                   backgroundColor: 'rgba(0, 0, 0, 0.08)', 
//                 },
//               }}>
//                 <TableCell>{hotel.id}</TableCell>
//                 <TableCell>{hotel.city}</TableCell>
//                 <TableCell>{hotel.hotel_name}</TableCell>
//                 <TableCell>{hotel.nationality}</TableCell>
//                 <TableCell>{hotel.check_in}</TableCell>
//                 <TableCell>{hotel.check_out}</TableCell>
//                 <TableCell>{hotel.room}</TableCell>
//                 <TableCell>
//                   <span
//                     style={{
//                       color: hotel.status === "Available" ? "green" : "red",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {hotel.status}
//                   </span>
//                 </TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     size="small"
//                     onClick={() => handleView(hotel.id)}
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

// export default HotelsList;






import React from "react";
import GenericTable from "../components/GenericTable.jsx";
import { data } from "../assets/data.js";

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

  const handleView = (id) => {
    console.log("View hotel Detail:", id);
  };

  return <GenericTable data={data.hotel_page} columns={columns} onActionClick={handleView} />;
};

export default HotelsList;