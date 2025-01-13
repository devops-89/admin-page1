import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const TabsComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: "All Hotlers", path: "/dashboard/hotelers/all" },
    { label: "Active Hotlers", path: "/dashboard/hotelers/active" },
    { label: "Inactive Hotlers", path: "/dashboard/hotelers/inactive" },
  ];

  const activeTab = tabs.findIndex((tab) => location.pathname === tab.path);

  const handleTabChange = (event, newValue) => {
    navigate(tabs[newValue].path);
  };

  return (
    <Box>
      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        
        centered
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "var(--orange-color)", // CSS variable for indicator color
          },
        
          "& .Mui-selected": {
            color: "var(--orange-color)!important", // CSS variable for selected tab color
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>

      {/* Outlet for rendering child routes */}
      <Box sx={{ marginTop: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default TabsComponent;
