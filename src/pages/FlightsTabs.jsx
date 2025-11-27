import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import FullScreenDialog from "../components/FullScreenDialog.jsx";
import FlightTabOneWay from "../components/FlightTabOneWay.jsx";
import FlightTabRoundTrip from "../components/FlightTabRoundTrip.jsx";
import FlightTabMultiCity from "../components/FlightTabMultiCity.jsx";

const FlightsTabs = () => {
  const [tab, setTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleView = (id) => {
    setSelectedId("flightList_" + id);
    setOpenDialog(true);
  };

  return (
    <>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="scrollable"
        allowScrollButtonsMobile
        sx={{ mb: 2, borderBottom: "1px solid rgba(0,0,0,0.1)" }}
      >
        <Tab label="One way" />
        <Tab label="Round trip" />
        <Tab label="Multi city" />
      </Tabs>

      {/* Render only the active tab's component to avoid redundant fetches */}
      {tab === 0 && <FlightTabOneWay onView={handleView} />}
      {tab === 1 && <FlightTabRoundTrip onView={handleView} />}
      {tab === 2 && <FlightTabMultiCity onView={handleView} />}

      <FullScreenDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        selectedId={selectedId}
      />
    </>
  );
};

export default FlightsTabs;
