import React, { useEffect, useState } from 'react';
import { ExtraDetailController } from '../api/extraDetailController';
import { Enquiry_Type } from '../utils/enum';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';

const HelicopterList = () => {
  const [helicopterData, setHelicopterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    ExtraDetailController.getHelicopter(Enquiry_Type.HELICOPTER)
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

          setHelicopterData(parsedData);
        } else {
           setHelicopterData([]);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
        setHelicopterData([]);
      });
  }, []);

  const HelicopterTableFields = [
    { key: "fullName", value: "Full Name" },
    { key: "phoneNumber", value: "Phone Number" },
    { key: "email", value: "Email" },
    { key: "from", value: "From" },
    { key: "to", value: "To" },
    { key: "date", value: "Date" },
    { key: "time", value: "Time" },
    { key: "adults", value: "Adults" },
    { key: "children", value: "Children" },
    // Removed the 'message' field
    { key: "permission", value: "Permission" }
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

  if (!helicopterData || helicopterData.length === 0) {
      return (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
              <p>No helicopter enquiry data available.</p>
          </div>
      );
  }

  return (
    <TableContainer component={Paper} sx={{ margin: "auto", mt: 5 }}>
      <Table stickyHeader aria-label="helicopter enquiries table">
        <TableHead>
          <TableRow>
            {HelicopterTableFields.map((tableHeading, index) => (
              <TableCell sx={{ fontWeight: 500, backgroundColor: '#000', color:'#fff' }} key={index}>
                {tableHeading.value}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {helicopterData.map((enquiryObject, rowIndex) => (
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
  );
};

export default HelicopterList;