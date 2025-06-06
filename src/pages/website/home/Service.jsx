import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormLabel, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Form, Formik } from "formik";
import ImageUpload from "../../../components/ImageUpload";

const Service = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const ServicesData = [
        {
            id: 1,
            serviceImg: "http://localhost:5173/src/assets/logo.png",
            serviceHeading: 'Flights',
            serviceUrl: '/services/flights',
        },
        {
            id: 2,
            serviceImg: "http://localhost:5173/src/assets/logo.png",
            serviceHeading: 'Hotels',
            serviceUrl: '/services/hotels',
        },
        {
            id: 3,
            serviceImg: "http://localhost:5173/src/assets/logo.png",
            serviceHeading: 'Helicopter',
            serviceUrl: '/services/helicopter',
        },
        {
            id: 4,
            serviceImg: "http://localhost:5173/src/assets/logo.png",
            serviceHeading: 'Holiday Packages',
            serviceUrl: '/services/holiday-packages',
        },
        {
            id: 5,
            serviceImg: "http://localhost:5173/src/assets/logo.png",
            serviceHeading: 'Cabs',
            serviceUrl: '/services/cabs',
        },
        {
            id: 6,
            serviceImg: "http://localhost:5173/src/assets/logo.png",
            serviceHeading: 'Our Hotels',
            serviceUrl: '/services/our-hotels',
        },
        {
            id: 7,
            serviceImg: "http://localhost:5173/src/assets/logo.png",
            serviceHeading: 'Destination Wedding',
            serviceUrl: '/services/destination-wedding',
        },
        {
            id: 8,
            serviceImg: "http://localhost:5173/src/assets/logo.png",
            serviceHeading: 'Gift Cards',
            serviceUrl: '/services/gift-cards',
        },
        {
            id: 9,
            serviceImg: "http://localhost:5173/src/assets/logo.png",
            serviceHeading: 'Forex',
            serviceUrl: '/services/forex',
        },
        {
            id: 10,
            serviceImg: "http://localhost:5173/src/assets/logo.png",
            serviceHeading: 'Self Drive',
            serviceUrl: '/services/self-drive',
        },
        {
            id: 11,
            serviceImg: "http://localhost:5173/src/assets/logo.png",
            serviceHeading: 'Outstation Cabs',
            serviceUrl: '/services/outstation-cabs',
        },
        {
            id: 12,
            serviceImg: "http://localhost:5173/src/assets/logo.png",
            serviceHeading: 'Activities',
            serviceUrl: '/services/activities',
        }
    ];
    

    const tableHeads = [
        {
            id: 1,
            label: 'ID',
        },
        {
            id: 2,
            label: 'Service Image',
        },
        {
            id: 3,
            label: 'Service Name',
        },
        {
            id: 4,
            label: 'Service Url',
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
                        Edit Services
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
                                {ServicesData.map((ServiceData, index) => {
                                    return (
                                        <TableRow>
                                            <TableCell align="center">{ServiceData.id}</TableCell>
                                            <TableCell align="center"><img style={{ width: "100px" }} src={ServiceData.serviceImg} alt={ServiceData.serviceHeading} /></TableCell>
                                            <TableCell align="center">{ServiceData.serviceHeading}</TableCell>
                                            <TableCell align="center">{ServiceData.serviceUrl}</TableCell>
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
                    Edit the Service
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Formik>
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid size={{xs:12}}>
                                        <FormLabel
                                            htmlFor="service-name"
                                            sx={{
                                                fontWeight: 500,
                                                color: "var(--black-color)",
                                                fontSize: "18px",
                                            }}
                                        >
                                            Service Name
                                        </FormLabel>
                                        <TextField
                                            id="service-name"
                                            variant="outlined"
                                            placeholder="Service Name"
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
                                            htmlFor="service-url"
                                            sx={{
                                                fontWeight: 500,
                                                color: "var(--black-color)",
                                                fontSize: "18px",
                                            }}
                                        >
                                            Service Url
                                        </FormLabel>
                                        <TextField
                                            id="service-url"
                                            variant="outlined"
                                            placeholder="Service Url"
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
                                            htmlFor="service-image"
                                            sx={{
                                                fontWeight: 500,
                                                color: "var(--black-color)",
                                                fontSize: "18px",
                                            }}
                                        >
                                            Service Image
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

export default Service