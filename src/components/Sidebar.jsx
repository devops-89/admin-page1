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
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InboxIcon from "@mui/icons-material/Inbox";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
import DeleteIcon from "@mui/icons-material/Delete";

const Sidebar = () => {
  const [openUsers, setOpenUsers] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);
  const [openMessages, setOpenMessages] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const handleClickUsers = () => setOpenUsers(!openUsers);
  const handleClickBooking = () => setOpenBooking(!openBooking);
  const handleClickMessages = () => setOpenMessages(!openMessages);
  const handleClickProfile = () => setOpenProfile(!openProfile);

  return (
    <Drawer
      sx={{
        height: "100vh",
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
         
          bgcolor: "var(--white-tint-color)",
          position:"fixed",
          top:"60px"
         
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem button sx={{ "&:hover": { bgcolor: "red", cursor:'pointer' } }}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider sx={{ borderColor: "gray",  }} />

        <ListItem button  sx={{ "&:hover": { bgcolor: "red", cursor:'pointer' } }}>
          <ListItemIcon>
            <PeopleIcon  />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
       
        <Divider sx={{ borderColor: "gray",  }} />

        <ListItem button onClick={handleClickBooking}  sx={{ "&:hover": { bgcolor: "red", cursor:'pointer' } }}>
          <ListItemIcon>
            <EventNoteIcon  />
          </ListItemIcon>
          <ListItemText primary="Booking" />
          {openBooking ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openBooking} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {["Hotel Booking", "Flight Booking", "Cab Booking"].map((text) => (
              <ListItem button key={text} sx={{ pl: 10, "&:hover": { color: "red",  cursor:'pointer' } }}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Collapse>
       
        <Divider sx={{ borderColor: "gray",  }} />

        <ListItem button sx={{ "&:hover": { bgcolor: "red", cursor:'pointer' } }}>
          <ListItemIcon>
            <ReviewsIcon  />
          </ListItemIcon>
          <ListItemText primary="Reviews" />
        </ListItem>
        <Divider sx={{ borderColor: "gray",  }} />

        <ListItem button sx={{ "&:hover": { bgcolor: "red", cursor:'pointer' } }}>
          <ListItemIcon>
            <BookmarksIcon  />
          </ListItemIcon>
          <ListItemText primary="Bookmarks" />
        </ListItem>
        <Divider sx={{ borderColor: "gray",  }} />

        <ListItem button  sx={{ "&:hover": { bgcolor: "red", cursor:'pointer' } }}>
          <ListItemIcon>
            <MessageIcon  />
          </ListItemIcon>
          <ListItemText primary="Messages" />
       
        </ListItem>
      
        <Divider sx={{ borderColor: "gray",  }} />

        <ListItem button  sx={{ "&:hover": { bgcolor: "red", cursor:'pointer' } }}>
          <ListItemIcon>
            <PersonIcon  />
          </ListItemIcon>
          <ListItemText primary="Profile" />
       
        </ListItem>
       
      </List>
    </Drawer>
  );
};

export default Sidebar;
