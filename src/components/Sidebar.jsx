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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openBooking, setOpenBooking] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) onClose();
  };

  const handleToggleBooking = () => setOpenBooking(!openBooking);

  const bookingSubItems = [
    { label: "Hotel Booking", icon: <HotelIcon />, path: "/dashboard/hotels" },
    { label: "Flight Booking", icon: <FlightIcon />, path: "/dashboard/flights" },
    { label: "Cab Booking", icon: <LocalTaxiIcon />, path: "/dashboard/cabs" },
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
          bgcolor: "var(--table-head-color)",
          position: "fixed",
          top: "60px",
        },
      }}
      anchor="left"
    >
      <List>
        <ListItem
          button
          sx={{
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
            <DashboardIcon sx={{ color: "var(--orange-color)" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem
          button
          onClick={() => handleNavigation("/dashboard/users")}
          sx={{
            "&:hover": {
              backgroundColor: "var(--orange-color)",
              color: "var(--white-color)",
              cursor: "pointer",
              "& .MuiSvgIcon-root": { color: "var(--white-color)" },
            },
          }}
        >
          <ListItemIcon>
            <PeopleIcon sx={{ color: "var(--orange-color)" }} />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>

        <ListItem
          button
          onClick={handleToggleBooking}
          sx={{
            "&:hover": {
              backgroundColor: "var(--orange-color)",
              color: "var(--white-color)",
              cursor: "pointer",
              "& .MuiSvgIcon-root": { color: "var(--white-color)" },
            },
          }}
        >
          <ListItemIcon>
            <EventNoteIcon sx={{ color: "var(--orange-color)" }} />
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
                  pl: 5,
                  "&:hover": {
                    backgroundColor: "var(--orange-color)",
                    color: "var(--white-color)",
                    cursor: "pointer",
                    "& .MuiSvgIcon-root": { color: "var(--white-color)" },
                  },
                }}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon sx={{ color: "var(--orange-color)", minWidth:'35px' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Collapse>

        <ListItem
          button
          onClick={() => handleNavigation("/dashboard/reviews")}
          sx={{
            "&:hover": {
              backgroundColor: "var(--orange-color)",
              color: "var(--white-color)",
              cursor: "pointer",
              "& .MuiSvgIcon-root": { color: "var(--white-color)" },
            },
          }}
        >
          <ListItemIcon>
            <ReviewsIcon sx={{ color: "var(--orange-color)" }} />
          </ListItemIcon>
          <ListItemText primary="Reviews" />
        </ListItem>

        <ListItem
          button
          onClick={() => handleNavigation("/dashboard/profile")}
          sx={{
            "&:hover": {
              backgroundColor: "var(--orange-color)",
              color: "var(--white-color)",
              cursor: "pointer",
              "& .MuiSvgIcon-root": { color: "var(--white-color)" },
            },
          }}
        >
          <ListItemIcon>
            <PersonIcon sx={{ color: "var(--orange-color)" }} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
