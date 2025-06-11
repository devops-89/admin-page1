import React, { useEffect, useState } from "react";
import { ExtraDetailController } from "../api/extraDetailController";
import { Enquiry_Type } from "../utils/enum";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";

const CabsList = () => {
  const [cabsData, setCabsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    ExtraDetailController.getExtraSerivce(Enquiry_Type.CABS)
      .then((res) => {
        const rawData = res?.data?.data;
        if (rawData && Array.isArray(rawData)) {
          const parsedData = rawData
            .map((item) => {
              try {
                return JSON.parse(item?.enquiry_description || "{}");
              } catch (e) {
                return null;
              }
            })
            .filter((item) => item !== null);

          setCabsData(parsedData.reverse());
          // console.log("parsedData------------",parsedData)
        } else {
          setCabsData([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        setCabsData([]);
      });
  }, []);

  const CabsTableFields = [
    { key: "capacity", value: "Capacity" },
    { key: "date", value: "Date" },
    { key: "drop", value: "Drop" },
    { key: "email", value: "Email" },
    { key: "fullName", value: "FullName" },
    { key: "phoneNumber", value: "Phone Number" },
    { key: "pickup", value: "Pick Up" },
    { key: "taxiType", value: "Taxi Type" },
  ];

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        <p>Error loading data: {error.message || "Unknown error"}</p>
      </div>
    );
  }

  if (!cabsData || cabsData.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>No Cabs enquiry data available.</p>
      </div>
    );
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
          Cab Bookings
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "15px",
            fontWeight: "400",
            marginBottom: "5px",
            textAlign: { xs: "center", sm: "center", md: "start" },
            "@media (min-width: 831px) and (max-width: 900px)": {
              textAlign: "start",
            },
          }}
        >
          Track and Respond to Cab Booking Enquiries
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ margin: "auto", mt: 5 }}>
        <Table stickyHeader aria-label="cab enquiries table">
          <TableHead>
            <TableRow>
              {CabsTableFields.map((tableHeading, index) => (
                <TableCell
                  sx={{
                    fontWeight: 500,
                    backgroundColor: "#000",
                    color: "#fff",
                  }}
                  key={index}
                >
                  {tableHeading.value}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {cabsData.map((enquiryObject, rowIndex) => (
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

export default CabsList;
