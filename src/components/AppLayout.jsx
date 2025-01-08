import React,{useState} from 'react';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Grid from "@mui/material/Grid2";

const AppLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
   
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Box>

      <Navbar onToggleSidebar={toggleSidebar} />


      <Grid container spacing={2} sx={{ marginTop: "60px", }}>

        <Grid item size={{xs:12,sm:3,md:2}}>
          <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
        </Grid>


        <Grid item size={{xs:12,sm:9,md:10}} sx={{ padding:{xs:"10px",sm:"20px",md:"30px"}}}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>




  );
};

export default AppLayout;
