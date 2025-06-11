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
  Typography,
  Box,
} from "@mui/material";
import ReactLoading from "react-loading";
import {COLORS} from "../utils/colors.js";
const OutstationCabs = () => {
  const [outstationCabsData, setOutstationCabsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    ExtraDetailController.getExtraSerivce(Enquiry_Type.OUTSTATION_CABS)
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

          setOutstationCabsData(parsedData);
          // console.log("parsedData------------",parsedData)
        } else {
          setOutstationCabsData([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        setOutstationCabsData([]);
      });
  }, []);

  const OutstationCabsTableFields = [
    { key: "email", value: "Email" },
    { key: "mobileNumber", value: "Phone" },
     { key: "pickupLocation", value: "Pick Location" },
    { key: "dropLocation", value: "Drop Location" },
    { key: "pickupDate", value: "PickUp" },
    { key: "returnDate", value: "Return" },
    { key: "pickupTime", value: "Pickup Time" },
    { key: "numberOfPerson", value: "Persons" },
  ];


  if (loading) {
    return (
      <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: 300,
                            }}
                          >
                            <ReactLoading
                              type="bars"
                              width={40}
                              height={40}
                              color={COLORS.PRIMARY}
                            />
                          </Box>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        <p>Error loading data: {error.message || "Unknown error"}</p>
      </div>
    );
  }

  if (!outstationCabsData || outstationCabsData.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>No Outstation Cabs enquiry data available.</p>
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
          Outstation Cabs Bookings
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
          Track and Respond to Outstation Cabs Booking Enquiries
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ margin: "auto", mt: 5 }}>
        <Table stickyHeader aria-label="cab enquiries table">
          <TableHead>
            <TableRow>
              {OutstationCabsTableFields.map((tableHeading, index) => (
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
            {outstationCabsData.map((enquiryObject, rowIndex) => (
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

export default OutstationCabs;
