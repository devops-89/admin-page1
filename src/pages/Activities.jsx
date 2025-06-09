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

const Activities = () => {
  const [activitiesData, setActivitiesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    ExtraDetailController.getExtraSerivce(Enquiry_Type.ACTIVITIE)
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

          setActivitiesData(parsedData);
        //   console.log("parsedData------------",parsedData)
        } else {
          setActivitiesData([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        setActivitiesData([]);
      });
  }, []);

  const AcitvitiesTableFields = [
    { key: "name", value: "Name" },
    { key: "email", value: "Email" },
    { key: "mobile", value: "Phone" },
    { key: "activity", value: "Activity" },
    { key: "message", value: "Message" },
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

  if (!activitiesData || activitiesData.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>No Activity enquiry data available.</p>
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
          Activity Bookings
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
          Track and Respond to Activity Booking Enquiries
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ margin: "auto", mt: 5 }}>
        <Table stickyHeader aria-label="cab enquiries table">
          <TableHead>
            <TableRow>
              {AcitvitiesTableFields.map((tableHeading, index) => (
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
            {activitiesData.map((enquiryObject, rowIndex) => (
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
                {AcitvitiesTableFields.map((field, colIndex) => (
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

export default Activities;
