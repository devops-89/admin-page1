import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@mui/material";

import AddBoxIcon from "@mui/icons-material/AddBox";
import CategoryIcon from "@mui/icons-material/Category";
import RowingIcon from "@mui/icons-material/Rowing";

import DashboardIcon from "@mui/icons-material/Dashboard";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ReviewsIcon from "@mui/icons-material/RateReview";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import TaxiAlertIcon from "@mui/icons-material/TaxiAlert";
import { useTheme, useMediaQuery } from "@mui/material";
import HikingIcon from "@mui/icons-material/Hiking";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ApartmentIcon from "@mui/icons-material/Apartment";
import EditNoteIcon from "@mui/icons-material/EditNote";
import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from "@mui/icons-material/Public";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import BluetoothDriveIcon from "@mui/icons-material/BluetoothDrive";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const [openBooking, setOpenBooking] = useState(false);
  const [openHoteliers, setOpenHoteliers] = useState(false);
  const [openPackages, setOpenPackages] = useState(false);
  const [openWebsite, setOpenWebsite] = useState(false);
  const [openComission, setOpenComission] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const handleToggleBooking = () => setOpenBooking(!openBooking);
  const handleToggleHoteliers = () => setOpenHoteliers(!openHoteliers);
  const handleTogglePackages = () => setOpenPackages(!openPackages);
  const handleToggleWebsite = () => setOpenWebsite(!openWebsite);
  const handleToggleComission = () => setOpenComission(!openComission);

  const bookingSubItems = [
    { label: "Hotel Booking", icon: <HotelIcon />, path: "/dashboard/hotels" },
    {
      label: "Flight Booking",
      icon: <FlightIcon />,
      path: "/dashboard/flights",
    },
  ];

  const packagesSubItems = [
    {
      label: "All Packages",
      icon: <HikingIcon />,
      path: "/dashboard/packages",
    },
    {
      label: "Add Packages",
      icon: <AddBoxIcon />,
      path: "/dashboard/add-packages",
    },
    {
      label: "Package Settings",
      icon: <CategoryIcon />,
      path: "/dashboard/package-settings",
    },
  ];

  const hoteliersSubItems = [
    {
      label: "All Hoteliers",
      icon: <GroupAddIcon />,
      path: "/dashboard/hoteliers",
    },
    {
      label: "Add Hotelier",
      icon: <DomainAddIcon />,
      path: "/dashboard/hotelier/add-hotelier",
    },
  ];

  const enquirysSubItems = [
    { label: "Cab Booking", icon: <LocalTaxiIcon />, path: "/dashboard/cabs" },
    {
      label: "Helicopter Booking",
      icon: <PublicIcon />,
      path: "/dashboard/helicopters",
    },
    {
      label: "Destination Wedding",
      icon: <AddLocationIcon />,
      path: "/dashboard/destination-wedding",
    },
    {
      label: "Self Drive",
      icon: <BluetoothDriveIcon />,
      path: "/dashboard/self-drive",
    },
    {
      label: "Outstation Cabs",
      icon: <TaxiAlertIcon />,
      path: "/dashboard/outstation-cabs",
    },
    {
      label: "Activities",
      icon: <RowingIcon />,
      path: "/dashboard/activities",
    },
     {
      label: "Forex",
      icon: <RowingIcon />,
      path: "/dashboard/forex",
    },
     {
      label: "Holiday Pacakges",
      icon: <RowingIcon />,
      path: "/dashboard/holiday-packages",
    },
  ];

  // website
  // const websiteSubItems = [
  //   { label: "Home", icon: <HomeIcon />, path: "/dashboard/home" },
  // ];

  const itemStyles = {
    color: "var(--white-color)",
    "&:hover": {
      backgroundColor: "var(--orange-color)",
      color: "var(--white-color)",
      cursor: "pointer",
      "& .MuiSvgIcon-root": { color: "var(--white-color)" },
    },
  };

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
          top: { xs: "72px", sm: "78px", md: "80px" },
        },
      }}
      anchor="left"
    >
      <List sx={{ padding: 0 }}>
        <ListItem
          button
          onClick={() => handleNavigation("/dashboard")}
          sx={itemStyles}
        >
          <ListItemIcon sx={{ color: "var(--white-color)" }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem
          button
          onClick={() => handleNavigation("/dashboard/customers")}
          sx={itemStyles}
        >
          <ListItemIcon sx={{ color: "var(--white-color)" }}>
            <GroupAddIcon />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>

        {/* Hoteliers */}
        <ListItem button onClick={handleToggleHoteliers} sx={itemStyles}>
          <ListItemIcon sx={{ color: "var(--white-color)" }}>
            <ApartmentIcon />
          </ListItemIcon>
          <ListItemText primary="Hoteliers" />
          {openHoteliers ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openHoteliers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {hoteliersSubItems.map((item, index) => (
              <ListItem
                button
                key={index}
                sx={{ pl: 5, ...itemStyles }}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon sx={{ color: "var(--white-color)" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Collapse>

        {/* Booking */}
        <ListItem button onClick={handleToggleBooking} sx={itemStyles}>
          <ListItemIcon sx={{ color: "var(--white-color)" }}>
            <EventNoteIcon />
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
                sx={{ pl: 5, ...itemStyles }}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon sx={{ color: "var(--white-color)" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Collapse>

        {/* Packages */}
        <ListItem button onClick={handleTogglePackages} sx={itemStyles}>
          <ListItemIcon sx={{ color: "var(--white-color)" }}>
            <ReviewsIcon />
          </ListItemIcon>
          <ListItemText primary="Packages" />
          {openPackages ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openPackages} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {packagesSubItems.map((item, index) => (
              <ListItem
                button
                key={index}
                sx={{ pl: 5, ...itemStyles }}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon sx={{ color: "var(--white-color)" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Collapse>

        {/* Comission */}
        <ListItem
          button
          onClick={() => handleNavigation("/dashboard/comission")}
          sx={itemStyles}
        >
          <ListItemIcon sx={{ color: "var(--white-color)" }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Comission" />
        </ListItem>

        {/* Website enquiry*/}
        {/* <ListItem button onClick={handleToggleWebsite} sx={itemStyles}>
          <ListItemIcon sx={{ color: "var(--white-color)" }}>
            <EditNoteIcon />
          </ListItemIcon>
          <ListItemText primary="Website" />
          {openWebsite ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openWebsite} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {websiteSubItems.map((item, index) => (
              <ListItem button key={index} sx={{ pl: 5, ...itemStyles }} onClick={() => handleNavigation(item.path)}>
                <ListItemIcon sx={{ color: "var(--white-color)" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Collapse> */}

        <ListItem button onClick={handleToggleWebsite} sx={itemStyles}>
          <ListItemIcon sx={{ color: "var(--white-color)" }}>
            <EditNoteIcon />
          </ListItemIcon>
          <ListItemText primary="Enquiry" />
          {openWebsite ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openWebsite} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {enquirysSubItems.map((item, index) => (
              <ListItem
                button
                key={index}
                sx={{ pl: 5, ...itemStyles }}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon sx={{ color: "var(--white-color)" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;
