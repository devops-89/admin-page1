import { Avatar, Button, Typography, Tabs, Tab } from "@mui/material";
import Grid from "@mui/material/Grid2";
import moment from "moment";
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import PaginatedTable from "./CustomerTable";


const CustomerDetails = () => {

  const [activeTab, setActiveTab] = useState(0);
  const location = useLocation();
  // console.log(location);
  const { item } = location.state || {};

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };


  const flightColumns = [
    { key: "BOOKING_ID", label: "Booking ID" },
    { key: "PASSENGER_NAME", label: "Passenger Name" },
    { key: "FLIGHT_NUMBER", label: "Flight Number" },
    { key: "DEPARTURE_DATE", label: "Departure Date" },
    { key: "ARRIVAL_DATE", label: "Arrival Date" },
    { key: "SEAT", label: "Seat" },
    { key: "PRICE", label: "Price" }

  ]
  return (
    <>
      <Grid container sx={{ marginBottom: '10px' }}>
        <Grid size={{ xs: 12, sm: 9 }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "5px",
              textAlign: { xs: "center", sm: "start" }
            }}
          >
            Customer Details
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "15px",
              fontWeight: "400",
              marginBottom: "5px",
              textAlign: { xs: "center", sm: "start" }
            }}
          >
            Manage your personal details, bookings, and preferences.
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
          <Link to='/dashboard/customers'><Button variant="contained" sx={{ backgroundColor: 'var(--orange-color)', marginBottom: '15px' }}>View All Customers</Button></Link>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 3 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Avatar src={item.avatar} sx={{ width: { xs: '90px', sm: '140px', md: '170px' }, height: { xs: '90px', sm: '140px', md: '170px' } }} />
        </Grid>
        <Grid size={{ xs: 12, sm: 9 }} sx={{ backgroundColor: 'var(--white-color)', padding: '10px 20px', boxShadow: "0px 0px 4px #cac9c9", borderRadius:'4px', position: 'relative' }}>
          <Typography
            variant="h5"
            sx={{
              fontSize: '18px',
              fontWeight: "500",
              marginBottom: "5px",
              textAlign: { xs: 'center', sm: 'start' },
              color: 'var(--orange-color)'
            }}
          >
            {item.full_name}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: '15px',
              fontWeight: "500",
              textAlign: { xs: 'center', sm: 'start' },
              marginBottom: "10px",
            }}
          >
            Email : {item.email}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: '15px',
              fontWeight: "500",
              textAlign: { xs: 'center', sm: 'start' },
              marginBottom: "10px",
            }}
          >
            Phone : {item.phone_number}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontSize: '15px',
              fontWeight: "500",
              textAlign: { xs: 'center', sm: 'start' },
              marginBottom: "10px",
            }}
          >
            Created At : {moment(item.created_at || "-").format("Do MMM YYYY")}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: '15px',
              fontWeight: "500",
              textAlign: { xs: 'center', sm: 'start' },
              marginBottom: "10px",
            }}
          >
            Last Login : {item.last_login ? moment(item.last_login).format("Do MMM YYYY") : "-"}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: "18px",
              fontWeight: "500",
              marginBottom: "10px",
              textAlign: { xs: 'center', sm: 'start' },
              position: 'absolute',
              right: '15px',
              top: { xs: '-40px', sm: '15px' }
            }}
          >
            <span className={item.status === 'ACTIVE' ? 'green' : 'red'}>{item.status}</span>
          </Typography>
        </Grid>
      </Grid>

      <Grid>
        <Grid size={{ xs: 12 }} sx={{ padding: "30px 0" }}>
          <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: '500', marginBottom: '10px' }}>Customer All Booking Details</Typography>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>A detailed summary of all bookings made by the customer, including dates, times, services, and statuses.</Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            sx={{
              marginBottom:'20px',
              "& .MuiTabs-indicator": {
                display: "none",
              },
              "& .Mui-selected": {
                color: "var(--white-color)!important",
                backgroundColor: "var(--orange-color)",
              },
            }}
          >
            <Tab label="Flight" />
            <Tab label="Hotel" />
            <Tab label="Cab" />
            <Tab label="Package" />
          </Tabs>
        </Grid>
        <Grid size={{ xs: 12 }} sx={{ backgroundColor: 'var(--white-color)', borderRadius:'4px', padding: '10px 20px', boxShadow: "0px 0px 4px #cac9c9" }}>
          {activeTab===0 && (<PaginatedTable flightColumns={flightColumns}/>)}
          {activeTab===1 && (<PaginatedTable flightColumns={flightColumns}/>)}
          {activeTab===2 && (<PaginatedTable flightColumns={flightColumns}/>)}
          {activeTab===3 && (<PaginatedTable flightColumns={flightColumns}/>)}  
        </Grid>
      </Grid>
    </>
  )
}

export default CustomerDetails;