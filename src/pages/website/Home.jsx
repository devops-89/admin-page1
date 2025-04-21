import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import WebsiteTab from "../../components/WebsiteTab";
import Logo from "./home/Logo";
import Banner from "./home/Banner";
import About from "./home/About";
import Service from "./home/Service";


const Home = () => {
    const tabLabel = [
        {
          tabSelected : 0,
          label : 'Logo Section',
          tabComponent : <Logo/>
        },
        {
            tabSelected : 1,
            label : 'Banner Section',
            tabComponent : <Banner/>
        },
        {
            tabSelected : 2,
            label : 'Service Section',
            tabComponent : <Service/>
        },
        {
            tabSelected : 3,
            label : 'About Section',
            tabComponent : <About/>
        },
        {
            tabSelected : 4,
            label : 'Review Section',
            tabComponent : <Typography variant="body1">Banner Heading</Typography>
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
