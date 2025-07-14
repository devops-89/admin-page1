import React, { useState, useEffect } from "react";
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
import { Enquiry_Type } from "../utils/enum.js";
import CabTable from "../components/dashboardHomeTable/CabTable.jsx";
import SelfDriveTable from "../components/dashboardHomeTable/SelfDriveTable.jsx";
import HelicopterTable from "../components/dashboardHomeTable/HelicopterTable.jsx";
import ActivitiesTable from "../components/dashboardHomeTable/ActivitiesTable.jsx";
import OutstationCabTable from "../components/dashboardHomeTable/OutstationCabTable.jsx";
import DestinationWeddingTable from "../components/dashboardHomeTable/DestinationWeddingTable.jsx";
import { ExtraDetailController } from "../api/extraDetailController.js";
import ReactLoading from "react-loading";

const Dashboard = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [cabData, setCabData] = useState([]);
  const [selfDriveData, setSelfDriveData] = useState([]);
  const [helicopterData, setHelicopterData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [outstationCabData, setOutstationCabData] = useState([]);
  const [destinationWeddingData, setDestinationWeddingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          activitiesRes,
          cabsRes,
          destinationWeddingRes,
          helicopterRes,
          outstationCabsRes,
          selfDriveRes,
        ] = await Promise.all([
          ExtraDetailController.getExtraSerivce(Enquiry_Type.ACTIVITIE),
          ExtraDetailController.getExtraSerivce(Enquiry_Type.CABS),
          ExtraDetailController.getExtraSerivce(Enquiry_Type.DESTINATION_WEDDING),
          ExtraDetailController.getExtraSerivce(Enquiry_Type.HELICOPTER),
          ExtraDetailController.getExtraSerivce(Enquiry_Type.OUTSTATION_CABS),
          ExtraDetailController.getExtraSerivce(Enquiry_Type.SELF_DRIVE),
        ]);

        const parseData = (res) => {
          const rawData = res?.data?.data;
          return rawData && Array.isArray(rawData)
            ? rawData
                .map((item) => {
                  try {
                    return JSON.parse(item?.enquiry_description || "{}");
                  } catch (e) {
                    return null;
                  }
                })
                .filter((item) => item !== null)
                .reverse()
            : [];
        };

        setActivityData(parseData(activitiesRes));
        setCabData(parseData(cabsRes));
        setDestinationWeddingData(parseData(destinationWeddingRes));
        setHelicopterData(parseData(helicopterRes));
        setOutstationCabData(parseData(outstationCabsRes));
        setSelfDriveData(parseData(selfDriveRes));
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  return (
    <>
      <Box component="section" sx={{ py: 2 }}>
        <Grid container spacing={2}>
          {dashboardDataList.map((item, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 3 }}
              key={index}
              onClick={() => navigate(item.href)}
              sx={{
                borderRadius: "4px",
                backgroundColor: "var(--white-color)",
                boxShadow: "0px 0px 8px #cac9c9",
                cursor: "pointer",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", height: "90px" }}>
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
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                    mr: 2,
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
                    <CountUp
                      start={0}
                      end={item.quantity}
                      duration={2}
                      separator=","
                    />
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {loading ? (
        <Box component="section" sx={{ py: 2 }}>
          <Box
            sx={{
              textAlign: "center",
              mt: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ReactLoading type="bars" height={40} width={40} color="#dd800c" />
          </Box>
        </Box>
      ) : (
        <Box component="section" sx={{ py: 2 }}>
          {/* Show single message if all enquiry data is empty */}
          {cabData.length === 0 &&
            selfDriveData.length === 0 &&
            helicopterData.length === 0 &&
            activityData.length === 0 &&
            outstationCabData.length === 0 &&
            destinationWeddingData.length === 0 && (
              <Box
                sx={{
                  textAlign: "center",
                  mt: 4,
                  backgroundColor: "#fff3e0",
                  padding: 2,
                  borderRadius: 2,
                  color: "#ff6f00",
                  fontWeight: 500,
                }}
              >
                No enquiry data available for any service.
              </Box>
            )}

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CabTable data={cabData} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <SelfDriveTable data={selfDriveData} />
            </Grid>
            <Grid size={{ xs: 12, sm: 12 }}>
              <HelicopterTable data={helicopterData} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ActivitiesTable data={activityData} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <OutstationCabTable data={outstationCabData} />
            </Grid>
            <Grid size={{ xs: 12, sm: 12 }}>
              <DestinationWeddingTable data={destinationWeddingData} />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
