import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import GroupIcon from "@mui/icons-material/Group";
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import CountUp from 'react-countup';

const Dashboard = () => {

  const dashboardDataList = [
    {
      icon: <GroupIcon sx={{fontSize:'50px'}}/>,
      label: "Users",
      quantity: 15305,
      bgColor: "#304ffe",
    },
    {
      icon: <ApartmentIcon sx={{fontSize:'50px'}}/>,
      label: "Hotel List",
      quantity: 12453,
      bgColor: "#e91e63",
    },
    {
      icon: <AirlineSeatReclineNormalIcon sx={{fontSize:'50px'}}/>,
      label: "Package",
      quantity: 10405,
      bgColor: "#4caf50",
    },
    {
      icon: <LocalTaxiIcon sx={{fontSize:'50px'}}/>,
      label: "Cabs",
      quantity: 9665,
      bgColor: "#ff8f00",
    },
    {
      icon: <LocalAirportIcon sx={{fontSize:'50px'}}/>,
      label: "Flights",
      quantity: 11444,
      bgColor: "#00bcd4",
    },
    {
      icon: <StoreMallDirectoryIcon sx={{fontSize:'50px'}}/>,
      label: "Hotelers",
      quantity: 25334,
      bgColor: "#ff5722",
    },
  ];

  return (
    <Box component="section" sx={{ p: 2 }}>
      <Grid container spacing={3}>
        {dashboardDataList.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{borderRadius:'4px',backgroundColor:'var(--white-color)', boxShadow:'0px 0px 8px #cac9c9'}} key={index}>
              <Box
                sx={{ display: "flex", alignItems: "center", height: "90px" }}
              >
                <Box
                  sx={{
                    width: "40%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: item.bgColor,
                    color: "white",
                    borderRadius: "4px",
                    m: "0px",
                    mr: 2,
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                  }}
                >
                 {item.icon}
                </Box>
                <Box sx={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                <Typography variant="h6" sx={{color:'var(--black-color)'}}>{item.label}</Typography>
                <Typography variant="body1" sx={{color:item.bgColor,fontWeight:600}}> <CountUp start={0} end={item.quantity} duration={2} separator="," onUpdate={(num) => Math.floor(num / 10) * 1000} /> </Typography>
                </Box>
              </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
