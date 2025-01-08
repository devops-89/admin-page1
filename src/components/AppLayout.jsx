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
      <Grid container spacing={2} sx={{ marginTop: "60px" }}>

        <Grid item size={2}>
          <Sidebar />
        </Grid>
        <Grid item size={10}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
    
);
};
 

export default AppLayout;
