import React, { useState, useEffect } from 'react';
import { ComissionController } from '../../api/comission.controller';
import ComissionList from '../../components/comission/ComissionList';
import AddComission from '../../components/comission/AddComission';
import Grid from "@mui/material/Grid2";
import {
 
  Typography, Box,
} from '@mui/material';
import ReactLoading from "react-loading";
import {COLORS} from "../../utils/colors";



const ComissionSettings = () => {
  const [comissionList, setComissionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
   ComissionController.getComissions()
      .then((response) => {
        console.log(response);
        setComissionList(response?.data?.commissionlist || []);
        setError('');
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to load packages. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleComissionAdded = (newComission) => {
    setComissionList((prev) => [...prev, newComission]);
  };

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
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (comissionList.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography>No comissions available.</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid size={8}>
  <ComissionList data={comissionList} />
      </Grid>
       <Grid size={4}>
  <AddComission onAddSuccess={handleComissionAdded} />
      </Grid>
  
   
    </Grid>);
};

export default ComissionSettings;

