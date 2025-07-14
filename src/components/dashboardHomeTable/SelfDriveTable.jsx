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

const SelfDriveTable = ({ data }) => {
  const SelfDriveTableFields = [
    { key: "fromDate", value: "From Date" },
    { key: "toDate", value: "To Date" },
    { key: "fullName", value: "Name" },
    { key: "phoneNumber", value: "Mobile" },
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
          Recent Self Drive Enquiry
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
          View and Respond to your recent Self-Drive Requests
        </Typography>
      </Box>
      <TableContainer component={Paper} sx={{ margin: "auto", mt: 2 }}>
        <Table stickyHeader aria-label="self drive enquiries table">
          <TableHead>
            <TableRow>
              {SelfDriveTableFields.map((tableHeading, index) => (
                <TableCell
                  sx={{
                    fontWeight: 500,
                    backgroundColor: "#000",
                    color: "#fff",
                    py: 1,
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
                {SelfDriveTableFields.map((field, colIndex) => (
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

export default SelfDriveTable;
