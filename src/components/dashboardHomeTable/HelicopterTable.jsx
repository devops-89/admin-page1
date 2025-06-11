import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Typography } from '@mui/material';
import { Enquiry_Type } from '../../utils/enum';
import { ExtraDetailController } from '../../api/extraDetailController';

const HelicopterTable = ({setLoading}) => {
  const [helicopterData, setHelicopterData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    ExtraDetailController.getExtraSerivce(Enquiry_Type.HELICOPTER)
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

          setHelicopterData(parsedData.reverse());
        } else {
           setHelicopterData([]);
        }
        setLoading((prev) => ({
          ...prev,
          HelicopterLoading: false,
        }));
      })
      .catch(err => {
        setError(err);
        setLoading((prev) => ({
          ...prev,
          HelicopterLoading: false,
        }));
        setHelicopterData([]);
      });
  }, []);

  const HelicopterTableFields = [
    { key: "fullName", value: "Name" },
    { key: "phoneNumber", value: "Mobile" },
    { key: "email", value: "Email" },
    { key: "from", value: "From" },
    { key: "to", value: "To" },
    { key: "date", value: "Date" },
    { key: "time", value: "Time" },
    { key: "adults", value: "Adults" },
    { key: "children", value: "Children" },
  ];


  if (error) {
      return (
          <div style={{ textAlign: "center", marginTop: "50px", color: 'red' }}>
              <p>Error loading data: {error.message || 'Unknown error'}</p>
          </div>
      );
  }

  if (!helicopterData || helicopterData.length === 0) {
      return (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
              <p>No helicopter enquiry data available.</p>
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
          Recent Helicopter Bookings
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
          Track and Respond to your recent Helicopter Booking Enquiries
        </Typography>
      </Box>
   
    <TableContainer component={Paper} sx={{ margin: "auto", mt: 2 }}>
      <Table stickyHeader aria-label="helicopter enquiries table">
        <TableHead>
          <TableRow>
            {HelicopterTableFields.map((tableHeading, index) => (
              <TableCell sx={{ fontWeight: 500, backgroundColor: '#000', color:'#fff', py:1 }} key={index}>
                {tableHeading.value}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {helicopterData.slice(0,5).map((enquiryObject, rowIndex) => (
            <TableRow
              key={rowIndex}
              hover
              sx={{
                '&:nth-of-type(odd)': {
                  backgroundColor: '#f9f9f9',
                },
                '&:last-child td, &:last-child th': {
                  border: 0,
                },
              }}
            >
              {HelicopterTableFields.map((field, colIndex) => (
                <TableCell key={colIndex}>
                  {String(enquiryObject[field.key]) || ''}
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

export default HelicopterTable;