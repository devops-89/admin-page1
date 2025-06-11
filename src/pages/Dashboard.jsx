import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import GroupIcon from "@mui/icons-material/Group";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
import AirplanemodeInactiveIcon from "@mui/icons-material/AirplanemodeInactive";
import DomainDisabledIcon from "@mui/icons-material/DomainDisabled";

import CabTable from "../components/dashboardHomeTable/CabTable.jsx";
import SelfDriveTable from "../components/dashboardHomeTable/SelfDriveTable.jsx";
import HelicopterTable from "../components/dashboardHomeTable/HelicopterTable.jsx";
import ActivitiesTable from "../components/dashboardHomeTable/ActivitiesTable.jsx";
import OutstationCabTable from "../components/dashboardHomeTable/OutstationCabTable.jsx";
import DestinationWeddingTable from "../components/dashboardHomeTable/DestinationWeddingTable.jsx";
import ReactLoading from 'react-loading';
import { Button } from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    CabLoading: true,
    ActivitiesLoading: true,
    DestinationWeddingLoading: true,
    HelicopterLoading: true,
    OutstationLoading: true,
    SelfDriveLoading: true,
  });

  console.log("loading--------", loading)

  const dashboardDataList = [
    {
      icon: <GroupIcon sx={{ fontSize: "50px" }} />,
      label: "Users",
      quantity: 15305,
      bgColor: "#304ffe",
      href: "/dashboard/users",
    },
    {
      icon: <ApartmentIcon sx={{ fontSize: "50px" }} />,
      label: "Hotels",
      quantity: 12453,
      bgColor: "#e91e63",
      href: "/dashboard/hotels",
    },

    {
      icon: <DomainDisabledIcon sx={{ fontSize: "50px" }} />,
      label: "Cancel Hotels",
      quantity: 453,
      bgColor: "#42a5f5",
      href: "/dashboard/cancel-hotels",
    },
    {
      icon: <AirplanemodeInactiveIcon sx={{ fontSize: "50px" }} />,
      label: "Cancel Flights",
      quantity: 105,
      bgColor: "#4a148c",
      href: "/dashboard/cancel-flights",
    },
    {
      icon: <AirlineSeatReclineNormalIcon sx={{ fontSize: "50px" }} />,
      label: "Packages",
      quantity: 10405,
      bgColor: "#4caf50",
      href: "/dashboard/packages",
    },
    {
      icon: <LocalTaxiIcon sx={{ fontSize: "50px" }} />,
      label: "Cabs",
      quantity: 9665,
      bgColor: "#ff8f00",
      href: "/dashboard/cabs",
    },
    {
      icon: <LocalAirportIcon sx={{ fontSize: "50px" }} />,
      label: "Flights",
      quantity: 11444,
      bgColor: "#00bcd4",
      href: "/dashboard/flights",
    },
    {
      icon: <StoreMallDirectoryIcon sx={{ fontSize: "50px" }} />,
      label: "Hotelers",
      quantity: 25334,
      bgColor: "#ff5722",
      href: "/dashboard/hotelers",
    },
  ];

  function refresh(){
    setLoading((prev) => ({
          ...prev,
    CabLoading: false,
    ActivitiesLoading: false,
    DestinationWeddingLoading: false,
    HelicopterLoading: false,
    OutstationLoading: false,
    SelfDriveLoading: false,
  
        }));
  }

  console.log("loading----------", loading)

  return (
    <>
      <Box component="section" sx={{ py: 2 }}>
        <Grid container spacing={2}>
          {dashboardDataList.map((item, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 3 }}
              sx={{
                borderRadius: "4px",
                backgroundColor: "var(--white-color)",
                boxShadow: "0px 0px 8px #cac9c9",
                cursor: "pointer",
              }}
              key={index}
              onClick={() => navigate(item.href)}
            >
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "var(--black-color)",
                      fontSize: "18px",
                      "&:hover": { color: "var(--orange-color)" },
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: item.bgColor, fontWeight: 600 }}
                  >
                    {" "}
                    <CountUp
                      start={0}
                      end={item.quantity}
                      duration={2}
                      separator=","
                      onUpdate={(num) => Math.floor(num / 10) * 1000}
                    />{" "}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Tables  */}

     {Object.values(loading).some((val) => val) ? (
  <Box component="section" sx={{ py: 2 }}>

    <div style={{ textAlign: "center", marginTop: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Button onClick={refresh}>Refresh</Button>
      <ReactLoading type="bars" height={40} width={40} color="#dd800c" />
    </div>
  </Box>
) : (
  <Box component="section" sx={{ py: 2 }}>
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <CabTable setLoading={setLoading} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <SelfDriveTable setLoading={setLoading} />
      </Grid>
      <Grid size={{ xs: 12, sm: 12 }}>
        <HelicopterTable setLoading={setLoading} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <ActivitiesTable setLoading={setLoading} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <OutstationCabTable setLoading={setLoading} />
      </Grid>
      <Grid size={{ xs: 12, sm: 12 }}>
        <DestinationWeddingTable setLoading={setLoading} />
      </Grid>
    </Grid>
  </Box>
)}

    </>
  );
};

export default Dashboard;
