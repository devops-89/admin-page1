import { Tabs, Tab, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";

const WebsiteTab = ({ tabLabel }) => {

    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
    return (
        <>
            <Grid container size={{ xs: 12 }} spacing={2}>
                <Grid size={{ xs: 12, sm:3, md:2 }}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={selectedTab}
                        onChange={handleChange}
                        sx={{
                            "& .MuiTabs-indicator": {
                                display: "none",
                            },
                            "& .Mui-selected": {
                                color: "var(--white-color)!important",
                                backgroundColor: "var(--orange-color)",
                            },
                        }}
                    >
                        {tabLabel.map((tab, index) => {
                            return (
                                <Tab key={index} label={tab.label} sx={{backgroundColor:"var(--white-color)", borderBottom:'1px solid #d1d1d1', boxShadow:"0px 2px 1px #d8d6d6"}}/>
                            )
                        })}
                    </Tabs>
                </Grid>

                <Grid size={{ xs: 12, sm:9, md:10 }}>
                    <Box sx={{backgroundColor:'var(--white-color)', height:'100%', borderRadius:'4px', boxShadow:"0px 2px 1px #d8d6d6", padding:'20px 30px'}}>
                        {tabLabel.map((tab, index) => {

                            return (
                                <>
                                    {selectedTab === tab.tabSelected && (
                                        tab.tabComponent
                                    )}  
                                </>
                            )
                        })}

                    </Box>
                </Grid>

            </Grid>
        </>
    )
}

export default WebsiteTab