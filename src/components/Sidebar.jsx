import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard"; 
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ReviewsIcon from "@mui/icons-material/RateReview";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import PersonIcon from "@mui/icons-material/Person";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const [openBooking, setOpenBooking] = useState(false);
  const [openUsers,setOpenUsers]=useState(false);
  const [openPackages,setOpenPackages]=useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) onClose();
  };

  const handleToggleBooking = () => setOpenBooking(!openBooking);
  const handleToggleUsers=()=> setOpenUsers(!openUsers);
  const handleTogglePackages=()=>setOpenPackages(!openPackages);

  const bookingSubItems = [
    { label: "Hotel Booking", icon: <HotelIcon />, path: "/dashboard/hotels" },
    { label: "Flight Booking", icon: <FlightIcon />, path: "/dashboard/flights" },
    { label: "Cab Booking", icon: <LocalTaxiIcon />, path: "/dashboard/cabs" },
  ];

  const packagesSubItems=[
    { label: "All Packages", icon: <HotelIcon />, path: "/dashboard/hotels" },
    { label: "Add Packages", icon: <FlightIcon />, path: "/dashboard/flights" },
 
  ]

  const usersSubItems = [
    { label: "Users", icon: <HotelIcon />, path: "/dashboard/users" },
    { label: "Hotlers", icon: <FlightIcon />, path: "/dashboard/hotelers/all" },
   
  ];

  return (
    <Drawer
      open={open}
      onClose={onClose}
      variant={isMobile ? "temporary" : "permanent"}
      sx={{
        height: "100vh",
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          bgcolor: "var(--sidebar-color)",
          position: "fixed",
          top: { xs:'72px', sm:'78px', md:"80px"},
        },
      }}
      anchor="left"
    >
      <List sx={{padding:"0"}}>
        <ListItem
          button
          sx={{
            color:'var(--white-color)',
            "&:hover": {
              backgroundColor: "var(--orange-color)",
              color: "var(--white-color)",
              cursor: "pointer",
              "& .MuiSvgIcon-root": { color: "var(--white-color)" },
            },
          }}
          onClick={() => handleNavigation("/dashboard")}
        >
          <ListItemIcon>
            <DashboardIcon sx={{ color: "var(--white-color)" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

      

     

         <ListItem
          button
          onClick={handleToggleUsers}
          sx={{
            color:'var(--white-color)',
            "&:hover": {
              backgroundColor: "var(--orange-color)",
              color: "var(--white-color)",
              cursor: "pointer",
              "& .MuiSvgIcon-root": { color: "var(--white-color)" },
            },
          }}
        >
          <ListItemIcon>
          <PeopleIcon sx={{ color: "var(--white-color)" }} />
          </ListItemIcon>
          <ListItemText primary="Users" />
          {openUsers ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openUsers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {usersSubItems.map((item, index) => (
              <ListItem
                button
                key={index}
                sx={{
                  pl:5,
                  color:'var(--white-color)',
                  "&:hover": {
                    backgroundColor: "var(--orange-color)",
                    color: "var(--white-color)",
                    cursor: "pointer",
                    "& .MuiSvgIcon-root": { color: "var(--white-color)" },
                  },
                }}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon sx={{ color: "var(--white-color)", minWidth:'35px' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Collapse>


        <ListItem
          button
          onClick={handleToggleBooking}
          sx={{
            color:'var(--white-color)',
            "&:hover": {
              backgroundColor: "var(--orange-color)",
              color: "var(--white-color)",
              cursor: "pointer",
              "& .MuiSvgIcon-root": { color: "var(--white-color)" },
            },
          }}
        >
          <ListItemIcon>
            <EventNoteIcon sx={{ color: "var(--white-color)" }} />
          </ListItemIcon>
          <ListItemText primary="Booking" />
          {openBooking ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openBooking} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {bookingSubItems.map((item, index) => (
              <ListItem
                button
                key={index}
                sx={{
                  pl:5,
                  color:'var(--white-color)',
                  "&:hover": {
                    backgroundColor: "var(--orange-color)",
                    color: "var(--white-color)",
                    cursor: "pointer",
                    "& .MuiSvgIcon-root": { color: "var(--white-color)" },
                  },
                }}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon sx={{ color: "var(--white-color)", minWidth:'35px' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Collapse>

        <ListItem
          button
          onClick={handleTogglePackages}
          sx={{
            color:'var(--white-color)',
            "&:hover": {
              backgroundColor: "var(--orange-color)",
              color: "var(--white-color)",
              cursor: "pointer",
              "& .MuiSvgIcon-root": { color: "var(--white-color)" },
            },
          }}
        >
          <ListItemIcon>
            <ReviewsIcon sx={{ color: "var(--white-color)" }} />
          </ListItemIcon>
          <ListItemText primary="Packages" />
          {openPackages? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openBooking} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {bookingSubItems.map((item, index) => (
              <ListItem
                button
                key={index}
                sx={{
                  pl:5,
                  color:'var(--white-color)',
                  "&:hover": {
                    backgroundColor: "var(--orange-color)",
                    color: "var(--white-color)",
                    cursor: "pointer",
                    "& .MuiSvgIcon-root": { color: "var(--white-color)" },
                  },
                }}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon sx={{ color: "var(--white-color)", minWidth:'35px' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Collapse>

        <ListItem
          button
          onClick={() => handleNavigation("/dashboard/profile")}
          sx={{
            color:'var(--white-color)',
            "&:hover": {
              backgroundColor: "var(--orange-color)",
              color: "var(--white-color)",
              cursor: "pointer",
              "& .MuiSvgIcon-root": { color: "var(--white-color)" },
            },
          }}
        >
          <ListItemIcon>
            <PersonIcon sx={{ color: "var(--white-color)" }} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
