import React, { useEffect, useState } from 'react';
import { ExtraDetailController } from '../api/extraDetailController';
import { Enquiry_Type } from '../utils/enum';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';

const DestinationWeddingList = () => {
  const [destinationWeddingData, setDestinationWeddingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    ExtraDetailController.getExtraSerivce(Enquiry_Type.DESTINATION_WEDDING)
      .then((res) => {
        const rawData = res?.data?.data;
        if (rawData && Array.isArray(rawData)) {
          const parsedData = rawData
            .map(item => {
              try {
                return JSON.parse(item?.enquiry_description || '{}');
              } catch (e) {
                return null;
              }
            })
            .filter(item => item !== null);

          setDestinationWeddingData(parsedData);
          // console.log("parsedData------------", parsedData);
        } else {
          setDestinationWeddingData([]);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
        setDestinationWeddingData([]);
      });
  }, []);

  const DestinationWeddingTableFields = [
    { key: "fullName", value: "Full Name" },
    { key: "phoneNumber", value: "Phone Number" },
    { key: "email", value: "Email" },
    { key: "date", value: "Date" },
    { key: "numberOfGuests", value: "Guests" },
    { key: "propertyType", value: "Property Type" },
    { key: "destination", value: "Destination" },
    { key: "budget", value: "Budget" },
    { key: "weddingSide", value: "Wedding Side" },
    { key: "weddingTheme", value: "Theme" },
    { key: "foodType", value: "Food Preference" },
    { key: "clothing", value: "Clothing" },
    { key: "eventType", value: "Event Types" },
    { key: "entryVehicle", value: "Entry Vehicle" },
    { key: "musicTheme", value: "Music Theme" },
    { key: "additionalServices", value: "Additional Services" },
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
      <div style={{ textAlign: "center", marginTop: "50px", color: 'red' }}>
        <p>Error loading data: {error.message || 'Unknown error'}</p>
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
          Destination Wedding Enquiry
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
          Track and Respond to Destination Wedding Enquiries
        </Typography>
      </Box>
   
    <TableContainer component={Paper} sx={{ margin: "auto", mt: 5 }}>
      <Table stickyHeader aria-label="destination wedding enquiries table">
        <TableHead>
          <TableRow>
            {DestinationWeddingTableFields.map((tableHeading, index) => (
              <TableCell
                key={index}
                sx={{ fontWeight: 500, backgroundColor: '#000', color: '#fff' }}
              >
                {tableHeading.value}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {destinationWeddingData.map((enquiryObject, rowIndex) => (
            <TableRow
              key={rowIndex}
              hover
              sx={{
                '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              {DestinationWeddingTableFields.map((field, colIndex) => (
                <TableCell key={colIndex}>
                  {Array.isArray(enquiryObject[field.key])
                    ? enquiryObject[field.key].join(', ')
                    : String(enquiryObject[field.key]) || ''}
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

export default DestinationWeddingList;
