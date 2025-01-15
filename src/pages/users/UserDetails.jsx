import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from 'react'
import { useLocation } from 'react-router-dom';

const UserDetails = () => {
  const location = useLocation();
  console.log(location);
  const { item } = location.state || {};

  return (
    <>
    <Grid container sx={{marginBottom:'10px'}}>
      <Grid sx={{xs:12}}>
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
                  User Details
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
                   Manage your personal details, bookings, and preferences.
                 </Typography>
      </Grid>
    </Grid>
    <Grid container spacing={2}>
      <Grid size={{xs:12, sm:3}}>
        <img src="https://i.pravatar.cc/200?img=8" alt='user name'/>
      </Grid>
      <Grid size={{xs:12, sm:9}} sx={{backgroundColor:'var(--white-color)', padding:'10px 20px', boxShadow: "0px 0px 4px #cac9c9"}}>
      <Typography
                   variant="h4"
                   sx={{
                     fontSize: "18px",
                     fontWeight: "500",
                     marginBottom: "10px",
                   }}
                 >
                  User ID : {item.id}
                 </Typography>
                 <Typography
                   variant="h4"
                   sx={{
                     fontSize: "24px",
                     fontWeight: "600",
                     marginBottom: "5px",
                     color:'var(--orange-color)'
                   }}
                 >
                  {item.full_name}
                 </Typography>
      </Grid>
    </Grid>
    </>
  )
}

export default UserDetails;