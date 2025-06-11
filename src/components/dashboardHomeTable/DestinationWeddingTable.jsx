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

const DestinationWeddingTable = ({setLoading}) => {
  const [destinationWeddingData, setDestinationWeddingData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    ExtraDetailController.getExtraSerivce(Enquiry_Type.DESTINATION_WEDDING)
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

          setDestinationWeddingData(parsedData.reverse());
        } else {
          setDestinationWeddingData([]);
        }
        setLoading((prev) => ({
          ...prev,
          DestinationWeddingLoading: false,
        }));
      })
      .catch((err) => {
        setError(err);
         setLoading((prev) => ({
          ...prev,
          DestinationWeddingLoading: false,
        }));
        setDestinationWeddingData([]);
      });
  }, []);

  const DestinationWeddingTableFields = [
    { key: "fullName", value: "Name" },
    { key: "phoneNumber", value: "Phone No" },
    { key: "email", value: "Email" },
    { key: "date", value: "Date" },
    { key: "numberOfGuests", value: "Guests" },
    { key: "propertyType", value: "Property Type" },
    { key: "destination", value: "Destination" },
  ];

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        <p>Error loading data: {error.message || "Unknown error"}</p>
      </div>
    );
  }

  if (!destinationWeddingData || destinationWeddingData.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>No Destination Wedding enquiry data available.</p>
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
            {destinationWeddingData
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
