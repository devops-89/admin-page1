import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import logoSrc from "../assets/logo.png";
import { Menu, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

import { setToast } from "../redux/reducers/toast";
import { useDispatch } from "react-redux";
import { TOAST_STATUS } from "../utils/enum";

const Navbar = ({
  logo = logoSrc,
  mailCount = 0,
  notificationCount = 0,
  bgcolor = "var(--white-color)",
  onToggleSidebar = () => {},
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setMenuOpen(!open);
    onToggleSidebar();
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    if (confirm("Are are sure?")) {
      localStorage.removeItem("access_token");
      navigate("/");
      dispatch(
        setToast({
          open: true,
          message: "Logout Successful",
          severity: TOAST_STATUS.SUCCESS,
        })
      );
    }
  };

  return (
    <AppBar
      sx={{
        bgcolor,
        position: "fixed",
        boxShadow: "none",
        top: 0,
        py: 1,
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          {isMobile && (
            <IconButton onClick={handleMenuToggle} sx={{ color: "black" }}>
              <MenuIcon />
            </IconButton>
          )}
          <img
            src={logo}
            alt="Logo"
            style={{
              height: isMobile ? 40 : 50,
              marginLeft: isMobile ? 10 : 0,
            }}
          />
        </Box>

        {/* Items */}
        <Box display="flex" alignItems="center">
          {/* Mail Icon */}
          {/* <IconButton sx={{ color: "var(--orange-color)" }}>
            <Badge badgeContent={mailCount} color="error">
              <MailIcon />
            </Badge>
          </IconButton> */}

          {/* Notifications Icon */}
          {/* <IconButton sx={{ color: "var(--orange-color)" }}>
            <Badge badgeContent={notificationCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}

          {/* Avatar */}
          <IconButton
            sx={{ color: "black" }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar alt="User">N</Avatar>
          </IconButton>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                return navigate("/dashboard/profile"), handleClose();
              }}
              sx={{ fontSize: "15px" }}
            >
              <AccountCircleIcon sx={{ marginRight: "10px" }} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ fontSize: "15px" }}>
              <LogoutIcon sx={{ marginRight: "10px" }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
