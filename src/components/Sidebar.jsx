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
          position: "static",
          bgcolor: "black",
          color: "white",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {/* Dashboard Tab */}
        <ListItem button sx={{ "&:hover": { bgcolor: "red" } }}>
          <ListItemIcon>
            <DashboardIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider sx={{ borderColor: "white" }} />

        {/* Users Dropdown */}
        <ListItem button onClick={handleClickUsers} sx={{ "&:hover": { bgcolor: "red" } }}>
          <ListItemIcon>
            <PeopleIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Users" />
          {openUsers ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openUsers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4, "&:hover": { bgcolor: "red" } }}>
              <ListItemText primary="Create User" />
            </ListItem>
            <ListItem button sx={{ pl: 4, "&:hover": { bgcolor: "red" } }}>
              <ListItemText primary="List Users" />
            </ListItem>
          </List>
        </Collapse>
        <Divider sx={{ borderColor: "white" }} />

        {/* Booking Dropdown */}
        <ListItem button onClick={handleClickBooking} sx={{ "&:hover": { color: "red" } }}>
          <ListItemIcon>
            <EventNoteIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Booking" />
          {openBooking ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openBooking} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {["All", "Approved", "Pending", "Cancelled"].map((text) => (
              <ListItem button key={text} sx={{ pl: 4, "&:hover": { color: "red" } }}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <Divider sx={{ borderColor: "white" }} />

        {/* Reviews Tab */}
        <ListItem button sx={{ "&:hover": { color: "red" } }}>
          <ListItemIcon>
            <ReviewsIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Reviews" />
        </ListItem>
        <Divider sx={{ borderColor: "white" }} />

        {/* Bookmarks Tab */}
        <ListItem button sx={{ "&:hover": { color: "red" } }}>
          <ListItemIcon>
            <BookmarksIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Bookmarks" />
        </ListItem>
        <Divider sx={{ borderColor: "white" }} />

        {/* Messages Dropdown */}
        <ListItem button onClick={handleClickMessages} sx={{ "&:hover": { color: "red" } }}>
          <ListItemIcon>
            <MessageIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Messages" />
          {openMessages ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMessages} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {["Inbox", "Compose", "Starred", "Details", "Important", "Sent", "Drafts", "Trash"].map((text) => (
              <ListItem button key={text} sx={{ pl: 4, "&:hover": { color: "red" } }}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <Divider sx={{ borderColor: "white" }} />

        {/* Profile Dropdown */}
        <ListItem button onClick={handleClickProfile} sx={{ "&:hover": { color: "red" } }}>
          <ListItemIcon>
            <PersonIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
          {openProfile ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openProfile} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ pl: 4, "&:hover": { color: "red" } }}>
              <ListItemIcon>
                <PersonIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="View Profile" />
            </ListItem>
            <ListItem button sx={{ pl: 4, "&:hover": { color: "red" } }}>
              <ListItemIcon>
                <EditIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Edit Profile" />
            </ListItem>
            <ListItem button sx={{ pl: 4, "&:hover": { color: "red" } }}>
              <ListItemIcon>
                <LockIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Change Password" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;
