import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import WebsiteTab from "../../components/WebsiteTab";
import Logo from "./home/Logo";

const Home = () => {
    const tabLabel = [
        {
          tabSelected : 0,
          label : 'Logo',
          tabComponent : <Logo/>
        },
        {
            tabSelected : 1,
            label : 'Favicon',
            tabComponent : <Typography variant="body1">Favicon</Typography>
        },
        {
            tabSelected : 2,
            label : 'Menu',
            tabComponent : <Typography variant="body1">Menu</Typography>
        },
        {
            tabSelected : 3,
            label : 'Banner Image',
            tabComponent : <Typography variant="body1">Banner Image</Typography>
        },
        {
            tabSelected : 4,
            label : 'Banner Heading',
            tabComponent : <Typography variant="body1">Banner Heading</Typography>
        },
        {
            tabSelected : 5,
            label : 'Banner Subheading',
            tabComponent : <Typography variant="body1">Banner Subheading</Typography>
        },
        {
            tabSelected : 5,
            label : 'Banner Subheading',
            tabComponent : <Typography variant="body1">Banner Subheading</Typography>
        },

    ]

    return (
        <>

            <Grid container>
                <Grid size={{ xs: 12 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: "18px",
                            fontWeight: "600",
                            marginBottom: "5px",
                            textAlign: { xs: "center", md: "start" },
                        }}
                    >
                        Homepage Edit Detail
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: "15px",
                            fontWeight: "400",
                            marginBottom: "25px",
                            textAlign: { xs: "center", md: "start" },
                        }}
                    >
                        Customize and Manage Your Homepage Details
                    </Typography>
                </Grid>

                <WebsiteTab tabLabel={tabLabel}/>
            </Grid>
        </>
    );
};

export default Home;
