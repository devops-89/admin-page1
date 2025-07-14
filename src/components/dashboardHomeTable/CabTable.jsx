import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ExtraDetailController } from "../../api/extraDetailController";
import { Enquiry_Type } from "../../utils/enum";


const CabTable = ({data}) => {


  const CabsTableFields = [
     { key: "taxiType", value: "Taxi Type" },
    { key: "drop", value: "Drop" },
    { key: "fullName", value: "Name" },
    { key: "pickup", value: "Pick Up" },
    { key: "taxiType", value: "Taxi Type" },
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
          Recent Cab Bookings
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
          Track and Respond to your Recent Cab Booking Enquiries
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ margin: "auto", mt: 2 }}>
        <Table stickyHeader aria-label="cab enquiries table">
          <TableHead>
            <TableRow>
              {CabsTableFields.map((tableHeading, index) => (
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
            {data.slice(0, 5).map((enquiryObject, rowIndex) => (
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
                {CabsTableFields.map((field, colIndex) => (
                  <TableCell key={colIndex}>
                    {String(enquiryObject[field.key]) || ""}
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

export default CabTable;
