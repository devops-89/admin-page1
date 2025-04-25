import React, { useEffect, useState } from 'react';
import { ExtraDetailController } from '../api/extraDetailController';
import { Enquiry_Type } from '../utils/enum';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Box, Typography } from '@mui/material';

const SelfDriveList = () => {
  const [selfDriveData, setSelfDriveData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    ExtraDetailController.getExtraSerivce(Enquiry_Type.SELF_DRIVE)
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

          setSelfDriveData(parsedData);
          // console.log("parsedData------------",parsedData)
        } else {
          setSelfDriveData([]);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
        setSelfDriveData([]);
      });
  }, []);

  const SelfDriveTableFields = [
    { key: "email", value: "Email" },
    { key: "fromDate", value: "From Date" },
    { key: "fullName", value: "Full Name" },
    { key: "phoneNumber", value: "Phone Number" },
    { key: "toDate", value: "To Date" },
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

  if (!selfDriveData || selfDriveData.length === 0) {
      return (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
              <p>No Self Drive enquiry data available.</p>
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
                  '@media (min-width: 831px) and (max-width: 900px)': {
                textAlign: 'start', 
              },
                }}
              >
                Self Drive Enquiry
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "15px",
                  fontWeight: "400",
                  marginBottom: "5px",
                  textAlign: { xs: "center", sm: "center", md: "start" },
                  '@media (min-width: 831px) and (max-width: 900px)': {
                textAlign: 'start', 
              },
                }}
              >
               View and Respond to Self-Drive Requests
              </Typography>
            </Box>
    <TableContainer component={Paper} sx={{ margin: "auto", mt: 5 }}>
      <Table stickyHeader aria-label="self drive enquiries table">
        <TableHead>
          <TableRow>
            {SelfDriveTableFields.map((tableHeading, index) => (
              <TableCell sx={{ fontWeight: 500, backgroundColor: '#000', color:'#fff' }} key={index}>
                {tableHeading.value}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {selfDriveData.map((enquiryObject, rowIndex) => (
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
              {SelfDriveTableFields.map((field, colIndex) => (
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

export default SelfDriveList;