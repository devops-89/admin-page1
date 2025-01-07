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
import { useTheme } from "@mui/material/styles";
import logoSrc from "../assets/logo.png";

// Utility function to determine if a color is light or dark
const isColorDark = (color) => {
  const rgb = getComputedStyle(document.documentElement).getPropertyValue(color);
  const [r, g, b] = rgb
    .replace(/[^\d,]/g, "")
    .split(",")
    .map(Number);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 140; // Threshold for dark color
};

// Styled search box with dynamic text color
const Search = styled("div")(({ theme, textColor }) => ({
  backgroundColor: "rgba(22, 19, 19, 0.2)",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  alignItems: "center",
  marginRight: theme.spacing(2),
  color: textColor,
  "& .MuiInputBase-input": {
    color: textColor,
  },
}));

const Navbar = ({
  logo = logoSrc,
  searchPlaceholder = "Search...",
  mailCount = 0,
  notificationCount = 0,
  avatarSrc = "/static/images/avatar/1.jpg",
  bgcolor = "var(--white-tint-color)", // Default background color
}) => {
  const theme = useTheme();

  // Determine item color dynamically based on background color
  const textColor = isColorDark(bgcolor) ? "#fff" : "#000";

  return (
    <AppBar
      sx={{
        bgcolor,
        position: "fixed",
        boxShadow: "none",
        top: 0,
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <img src={logo} alt="Logo" style={{ height: 50, marginRight: 10 }} />
        </Box>

        {/* Items */}
        <Box display="flex" alignItems="center">
          {/* Search */}
          <Search textColor={textColor}>
            <InputBase placeholder={searchPlaceholder} />
          </Search>

          {/* Mail Icon */}
          <IconButton sx={{ color: textColor }}>
            <Badge badgeContent={mailCount} color="error">
              <MailIcon />
            </Badge>
          </IconButton>

          {/* Notifications Icon */}
          <IconButton sx={{ color: textColor }}>
            <Badge badgeContent={notificationCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Avatar */}
          <IconButton sx={{ color: textColor }}>
            <Avatar alt="User" src={avatarSrc} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
