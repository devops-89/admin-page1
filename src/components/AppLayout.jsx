import React from 'react';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Grid from "@mui/material/Grid2";

const AppLayout = () => {
  return (
    <Box>
     
      <Navbar />

      
      <Grid container spacing={2} sx={{marginTop:"60px"}}>
      
        <Grid item xs={3} md={4}>
          <Sidebar />
        </Grid>

        
        <Grid item xs={9} md={8}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>


      


  );
};

export default AppLayout;
