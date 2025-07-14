import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
} from "@mui/material";
import { ExtraDetailController } from "../../api/extraDetailController";
import { Enquiry_Type } from "../../utils/enum";

const DestinationWeddingTable = ({data}) => {


 
  const DestinationWeddingTableFields = [
    { key: "fullName", value: "Name" },
    { key: "phoneNumber", value: "Phone No" },
    { key: "email", value: "Email" },
    { key: "date", value: "Date" },
    { key: "numberOfGuests", value: "Guests" },
    { key: "propertyType", value: "Property Type" },
    { key: "destination", value: "Destination" },
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
          Recent Destination Wedding Enquiry
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
          Track and Respond to your Recent Destination Wedding Enquiries
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ margin: "auto", mt: 2 }}>
        <Table stickyHeader aria-label="destination wedding enquiries table">
          <TableHead>
            <TableRow>
              {DestinationWeddingTableFields.map((tableHeading, index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontWeight: 500,
                    backgroundColor: "#000",
                    color: "#fff",
                    py: 1,
                  }}
                >
                  {tableHeading.value}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(0, 5)
              .map((enquiryObject, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  hover
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  {DestinationWeddingTableFields.map((field, colIndex) => (
                    <TableCell key={colIndex}>
                      {Array.isArray(enquiryObject[field.key])
                        ? enquiryObject[field.key].join(", ")
                        : String(enquiryObject[field.key]) || ""}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DestinationWeddingTable;
