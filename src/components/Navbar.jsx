import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  alignItems: "center",
  marginRight: theme.spacing(2),
}));

const Navbar = ({
  logo = "MyLogo",
  searchPlaceholder = "Search...",
  mailCount = 0,
  notificationCount = 0,
  avatarSrc = "/static/images/avatar/1.jpg",
}) => {
  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Toolbar>
      
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {logo}
        </Typography>

       
        <Box display="flex" alignItems="center">
          
          <Search>
            <InputBase placeholder={searchPlaceholder} />
          </Search>

         
          <IconButton color="inherit">
            <Badge badgeContent={mailCount} color="error">
              <MailIcon />
            </Badge>
          </IconButton>

          
          <IconButton color="inherit">
            <Badge badgeContent={notificationCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

       
          <IconButton color="inherit">
            <Avatar alt="User" src={avatarSrc} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
