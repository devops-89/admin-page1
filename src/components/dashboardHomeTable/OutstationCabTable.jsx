import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import { ExtraDetailController } from "../../api/extraDetailController";
import { Enquiry_Type } from "../../utils/enum";

const OutstationCabTable = ({data}) => {
 

 
  const OutstationCabsTableFields = [
     { key: "pickupLocation", value: "PickUp" },
    { key: "dropLocation", value: "Drop" },
    { key: "pickupDate", value: "PickUp Date" },
    { key: "returnDate", value: "Return Date" },
    { key: "pickupTime", value: "P.Time" },
    { key: "numberOfPerson", value: "Persons" },
  ];


  

  if (!data || data.length === 0) {
    return null;
  }


  return (
    <>
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "5px",
            textAlign: { xs: "center", sm: "center", md: "start" },
            "@media (min-width: 831px) and (max-width: 900px)": {
              textAlign: "start",
            },
          }}
        >
          Recent Outstation Cabs Bookings
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "15px",
            fontWeight: "400",
            textAlign: { xs: "center", sm: "center", md: "start" },
            "@media (min-width: 831px) and (max-width: 900px)": {
              textAlign: "start",
            },
          }}
        >
          Track and Respond to your Recent Outstation Cabs Booking Enquiries
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ margin: "auto", mt: 2 }}>
        <Table stickyHeader aria-label="cab enquiries table">
          <TableHead>
            <TableRow>
              {OutstationCabsTableFields.map((tableHeading, index) => (
                <TableCell
                  sx={{
                    fontWeight: 500,
                    backgroundColor: "#000",
                    color: "#fff",
                    py:1
                  }}
                  key={index}
                >
                  {tableHeading.value}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(0,5).map((enquiryObject, rowIndex) => (
              <TableRow
                key={rowIndex}
                hover
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "#f9f9f9",
                  },
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                {OutstationCabsTableFields.map((field, colIndex) => (
                    <>
                    {/* {console.log("field-----------",enquiryObject)} */}
                  <TableCell key={colIndex}>
                    {enquiryObject[field.key] ? String(enquiryObject[field.key]) : "-"}

                  </TableCell>
                  </>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OutstationCabTable;
