import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormLabel, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';
import { Form, Formik } from "formik";
import ImageUpload from "../../../components/ImageUpload";

const About = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const BannersData = [
        {
            id: 1,
            bannerImg: "http://localhost:5173/src/assets/logo.png",
            bannerHeading: 'Your Next Adventure Awaits',
            bannerSubheading: 'Start exploring today.'
        },
        {
            id: 2,
            bannerImg: "http://localhost:5173/src/assets/logo.png",
            bannerHeading: 'Explore More, Worry Less',
            bannerSubheading: 'Travel made simple.'
        },
        {
            id: 3,
            bannerImg: "http://localhost:5173/src/assets/logo.png",
            bannerHeading: 'Journey Beyond the Ordinary',
            bannerSubheading: 'Discover your dream destination.'
        }
    ]

    const tableHeads = [
        {
            id: 1,
            label: 'ID',
        },
        {
            id: 2,
            label: 'Banner Image',
        },
        {
            id: 3,
            label: 'Heading',
        },
        {
            id: 4,
            label: 'Subheading',
        },
        {
            id: 5,
            label: 'Action',
        }
    ]

    return (
        <>
            <Grid container>
                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ fontWeight: 600, marginBottom: "25px" }}>
                        Edit Banner
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead sx={{ backgroundColor: 'var(--sidebar-color)' }}>
                                <TableRow>
                                    {tableHeads.map((tableHead, index) => {
                                        return (
                                            <TableCell align="center" sx={{ color: 'var(--white-color)' }} key={index}>{tableHead.label}</TableCell>
                                        )
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {BannersData.map((BannerData, index) => {
                                    return (
                                        <TableRow>
                                            <TableCell align="center">{BannerData.id}</TableCell>
                                            <TableCell align="center"><img style={{ width: "100px" }} src={BannerData.bannerImg} alt={BannerData.bannerHeading} /></TableCell>
                                            <TableCell align="center">{BannerData.bannerHeading}</TableCell>
                                            <TableCell align="center">{BannerData.bannerSubheading}</TableCell>
                                            <TableCell align="center">
                                                <IconButton color="warning" onClick={handleClickOpen}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="error">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>


            <Dialog
                maxWidth={'md'}
                fullWidth
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Edit the Banner
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Formik>
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid size={{xs:12}}>
                                        <FormLabel
                                            htmlFor="banner-heading"
                                            sx={{
                                                fontWeight: 500,
                                                color: "var(--black-color)",
                                                fontSize: "18px",
                                            }}
                                        >
                                            Heading
                                        </FormLabel>
                                        <TextField
                                            id="banner-heading"
                                            variant="outlined"
                                            placeholder="banner Heading"
                                            fullWidth
                                            required
                                            sx={{
                                                marginTop: "15px",
                                                color: "var(--black-color)",
                                                "& .MuiOutlinedInput-root": {
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "var(--orange-color)",
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{xs:12}}>
                                        <FormLabel
                                            htmlFor="banner-subheading"
                                            sx={{
                                                fontWeight: 500,
                                                color: "var(--black-color)",
                                                fontSize: "18px",
                                            }}
                                        >
                                            Subheading
                                        </FormLabel>
                                        <TextField
                                            id="banner-subheading"
                                            variant="outlined"
                                            placeholder="banner subheading"
                                            fullWidth
                                            required
                                            sx={{
                                                marginTop: "15px",
                                                color: "var(--black-color)",
                                                "& .MuiOutlinedInput-root": {
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "var(--orange-color)",
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{xs:12}}>
                                    <FormLabel
                                            htmlFor="banner Image"
                                            sx={{
                                                fontWeight: 500,
                                                color: "var(--black-color)",
                                                fontSize: "18px",
                                            }}
                                        >
                                            Banner Image
                                        </FormLabel>
                                        <ImageUpload/>
                                    </Grid>
                                </Grid>
                            </Form>
                        </Formik>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} variant="contained" color="error">
                        Back
                    </Button>
                    <Button onClick={handleClose} autoFocus variant="contained" color="success">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default About