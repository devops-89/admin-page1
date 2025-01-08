import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ReviewsIcon from "@mui/icons-material/RateReview";

import PersonIcon from "@mui/icons-material/Person";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {useTheme, useMediaQuery} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = ({open,onClose}) => {
  const navigate = useNavigate();

  // getting Media query
   const theme=useTheme();
    const isMobile=useMediaQuery(theme.breakpoints.down("sm"));
    

  const [openUsers, setOpenUsers] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);

  const [openProfile, setOpenProfile] = useState(false);

  console.log("Sidebar: ",open);

  const handleClickUsers = () => {
    setOpenUsers(!openUsers);

    navigate("/dashboard/users");
  };
  const handleClickBooking = () => setOpenBooking(!openBooking);
  const handleClickProfile = () => setOpenProfile(!openProfile);

  return (
    <Drawer
       open={open}
       onClose={onClose}
       variant={isMobile? "temporary":"permanent"}
      sx={{
        height: "100vh",
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",

          bgcolor: "var(--white-tint-color)",
          position: "fixed",
          top: "60px",
        },
      }}
      
      anchor="left"
    >
      <List>
        <ListItem button sx={{ "&:hover": { bgcolor: "red", cursor:'pointer' } }}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider sx={{ borderColor: "gray" }} />

        {/* Users Dropdown */}
        <ListItem
          button
          onClick={handleClickUsers}
          sx={{ "&:hover": { bgcolor: "red", cursor:'pointer' } }}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>

        <Divider sx={{ borderColor: "gray" }} />

        <ListItem button onClick={handleClickBooking}  sx={{ "&:hover": { bgcolor: "red", cursor:'pointer' } }}>
          <ListItemIcon>
            <EventNoteIcon />
          </ListItemIcon>
          <ListItemText primary="Booking" />
          {openBooking ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openBooking} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {["Hotel Booking", "Flight Booking", "Cab Booking"].map(
              (text, index) => {
                const handleSubOptionClick = () => {
                  switch (text) {
                    case "Hotel Booking":
                      navigate("/dashboard/hotels");
                      break;
                    case "Flight Booking":
                      navigate("/dashboard/flights");
                      break;
                    case "Cab Booking":
                      navigate("/dashboard/cabs");
                      break;
                    default:
                      break;
                  }
                };

                return (
                  <ListItem
                    button
                    key={text}
                    sx={{ pl: 10, "&:hover": { color: "red", cursor:'pointer' } }}
                    onClick={handleSubOptionClick}
                  >
                    <ListItemText primary={text} />
                  </ListItem>
                );
              }
            )}
          </List>
        </Collapse>

        <Divider sx={{ borderColor: "gray" }} />

        <ListItem button sx={{ "&:hover": { bgcolor: "red", cursor:'pointer' } }}>
          <ListItemIcon>
            <ReviewsIcon />
          </ListItemIcon>
          <ListItemText primary="Reviews" />
        </ListItem>
        <Divider sx={{ borderColor: "gray" }} />

        {/* Profile Dropdown */}
        <ListItem button sx={{ "&:hover": { bgcolor: "red", cursor:'pointer' } }}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
