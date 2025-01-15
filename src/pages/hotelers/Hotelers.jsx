import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import AllHotelers from '../hotelers/AllHotelers'
import ActiveHotelers from '../hotelers/ActiveHotelers'
import InactiveHotelers from '../hotelers/InactiveHotelers'



const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        sx={{
          "& .MuiTabs-indicator": {
            display:'none'
          },
          "& .Mui-selected": {
            color: "var(--white-color)!important",
            backgroundColor:'var(--orange-color)'
          },
        }}
      >
        <Tab label="All Hotelers" />
        <Tab label="Active Hotelers" />
        <Tab label="Inactive Hotelers" />
      </Tabs>
      <Box sx={{ marginTop: 3 }}>
        {activeTab === 0 && <AllHotelers />}
        {activeTab === 1 && <ActiveHotelers />}
        {activeTab === 2 && <InactiveHotelers />}
      </Box>
    </Box>
  );
};

export default TabsComponent;
