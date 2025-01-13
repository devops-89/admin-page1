import React, { useState } from 'react'
import Grid from "@mui/material/Grid2";
import { useDropzone } from 'react-dropzone';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, IconButton, MenuItem, Rating, Select, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Form, Formik } from 'formik';



const AddPackage = () => {

    const [value, setValue] = React.useState(2);

    const [images, setImages] = useState([]);

    const onDrop = (acceptedFiles) => {
        const filePreviews = acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
        );
        setImages((prevImages) => [...prevImages, ...filePreviews]);
    };

    const removeImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/gif': [],
            'image/svg+xml': [],
            'image/jpg': [],
        },
        multiple: true,
    });

    return (
        <>
            <Grid>
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: "18px",
                            fontWeight: "600",
                            marginBottom: "5px",
                            textAlign: { xs: "center", sm: "center", md: "start" },
                            "@media (min-width: 831px) and (max-width: 900px)": {
                                textAlign: "start",
                            },
                        }}
                    >
                        Add Hotel Details
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: "15px",
                            fontWeight: "400",
                            marginBottom: "15px",
                            textAlign: { xs: "center", sm: "center", md: "start" },
                            "@media (min-width: 831px) and (max-width: 900px)": {
                                textAlign: "start",
                            },
                        }}
                    >
                        Provide the essential information to showcase your hotel and attract potential guests.
                    </Typography>
                </Box>
            </Grid>

            <Formik>
                <Form>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 9 }} sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>


                            <Grid sx={{ backgroundColor: 'var(--white-color)', padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>

                                <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" }}>
                                    <FormLabel htmlFor="hotel-name" sx={{ fontWeight: 500 }}>
                                        Hotel Name
                                    </FormLabel>
                                    <TextField
                                        id="hotel-name"
                                        variant="outlined"
                                        placeholder="Hotel Name"
                                        fullWidth
                                        required
                                        sx={{
                                            marginTop: 1,
                                            color: 'var(--black-color)',
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'var(--orange-color)',
                                                },
                                            },
                                        }}
                                    />
                                </Grid>


                                <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" }}>
                                    <FormControl
                                        fullWidth
                                        sx={{
                                            color: 'var(--black-color)',
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'var(--orange-color)',
                                                },
                                            },
                                        }}
                                    >
                                        <FormLabel
                                            id="hotel-type-label"
                                            sx={{
                                                '&.Mui-focused': {
                                                    color: 'var(--black-color)',
                                                },
                                            }}
                                        >
                                            Hotel Type
                                        </FormLabel>
                                        <Select
                                            labelId="hotel-type-label"
                                            id="hotel-type"
                                            variant="outlined"
                                            sx={{
                                                marginTop: 1,
                                                color: 'var(--black-color)',
                                                '& .MuiOutlinedInput-root': {
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'var(--orange-color)',
                                                    },
                                                },
                                            }}
                                        >
                                            <MenuItem value="luxury">Luxury</MenuItem>
                                            <MenuItem value="budget">Budget</MenuItem>
                                            <MenuItem value="boutique">Boutique</MenuItem>
                                        </Select>
                                    </FormControl>

                                </Grid>

                                <Grid size={{ sx: 12, sm: 12 }} sx={{ width: "100%" }}>
                                    <FormLabel htmlFor="hotel-headline" sx={{ fontWeight: 500 }}>
                                        Hotel Headline
                                    </FormLabel>
                                    <TextField
                                        id="hotel-headline"
                                        variant="outlined"
                                        placeholder="Hotel Headline"
                                        fullWidth
                                        required
                                        sx={{
                                            marginTop: 1,
                                            color: 'var(--black-color)',
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'var(--orange-color)',
                                                },
                                            },
                                        }}
                                    />
                                </Grid>


                                <Grid item xs={12} sx={{ width: "100%" }}>
                                    <FormLabel sx={{ fontWeight: 500 }}>
                                        Hotel Description
                                    </FormLabel>
                                    <TextField
                                        id="hotel-description"
                                        variant="outlined"
                                        placeholder="Enter a description of the hotel"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        required
                                        sx={{
                                            marginTop: 1,
                                            color: 'var(--black-color)',
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'var(--orange-color)',
                                                },
                                            },
                                        }}
                                    />
                                </Grid>

                            </Grid>

                            <Grid sx={{ backgroundColor: 'var(--white-color)', padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>

                                <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" }}>
                                    <FormLabel htmlFor="hotel-number" sx={{ fontWeight: 500 }}>
                                        Hotel Number
                                    </FormLabel>
                                    <TextField
                                        id="hotel-number"
                                        variant="outlined"
                                        placeholder='Hotel Number'
                                        fullWidth
                                        required
                                        sx={{
                                            marginTop: 1,
                                            color: 'var(--black-color)',
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'var(--orange-color)',
                                                },
                                            },
                                        }}
                                    />
                                </Grid>


                                <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" }}>
                                    <FormLabel htmlFor="address" sx={{ fontWeight: 500 }}>
                                        Address
                                    </FormLabel>
                                    <TextField
                                        id="address"
                                        variant="outlined"
                                        placeholder='Hotel Address'
                                        fullWidth
                                        required
                                        sx={{
                                            marginTop: 1,
                                            color: 'var(--black-color)',
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'var(--orange-color)',
                                                },
                                            },
                                        }}
                                    />
                                </Grid>


                                <Grid size={{ sx: 12, sm: 4 }} sx={{ width: "100%" }}>
                                    <FormLabel htmlFor="city" sx={{ fontWeight: 500 }}>
                                        City
                                    </FormLabel>
                                    <TextField
                                        id="city"
                                        variant="outlined"
                                        placeholder='City'
                                        fullWidth
                                        required
                                        sx={{
                                            marginTop: 1,
                                            color: 'var(--black-color)',
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'var(--orange-color)',
                                                },
                                            },
                                        }}
                                    />
                                </Grid>


                                <Grid size={{ sx: 12, sm: 4 }} sx={{ width: "100%" }}>
                                    <FormLabel htmlFor="country" sx={{ fontWeight: 500 }}>
                                        Country
                                    </FormLabel>
                                    <TextField
                                        id="country"
                                        variant="outlined"
                                        placeholder='Country'
                                        fullWidth
                                        required
                                        sx={{
                                            marginTop: 1,
                                            color: 'var(--black-color)',
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'var(--orange-color)',
                                                },
                                            },
                                        }}
                                    />
                                </Grid>


                                <Grid size={{ sx: 12, sm: 4 }} sx={{ width: "100%" }}>
                                    <FormLabel htmlFor="pincode" sx={{ fontWeight: 500 }}>
                                        Pincode
                                    </FormLabel>
                                    <TextField
                                        id="pincode"
                                        variant="outlined"
                                        placeholder='Pincode'
                                        fullWidth
                                        required
                                        sx={{
                                            marginTop: 1,
                                            color: 'var(--black-color)',
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'var(--orange-color)',
                                                },
                                            },
                                        }}
                                    />
                                </Grid>


                                <Grid size={{ sx: 12 }} sx={{ width: "100%" }}>
                                    <FormControl>
                                        <FormLabel sx={{
                                            fontWeight: 500,
                                            '&.Mui-focused': {
                                                color: 'var(--black-color)',
                                            },
                                        }}>
                                            Select Amenities
                                        </FormLabel>
                                        <Grid sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                            <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ width: '100%' }}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            '&.Mui-checked .MuiSvgIcon-root': {
                                                                color: 'var(--orange-color)',
                                                            },
                                                        }} />
                                                    }
                                                    label="24-hour Security"
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ width: '100%' }}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            '&.Mui-checked .MuiSvgIcon-root': {
                                                                color: 'var(--orange-color)',
                                                            },
                                                        }} />
                                                    }
                                                    label="Air Conditioning"
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ width: '100%' }}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            '&.Mui-checked .MuiSvgIcon-root': {
                                                                color: 'var(--orange-color)',
                                                            },
                                                        }} />
                                                    }
                                                    label="Library"
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ width: '100%' }}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            '&.Mui-checked .MuiSvgIcon-root': {
                                                                color: 'var(--orange-color)',
                                                            },
                                                        }} />
                                                    }
                                                    label="Parking"
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ width: '100%' }}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            '&.Mui-checked .MuiSvgIcon-root': {
                                                                color: 'var(--orange-color)',
                                                            },
                                                        }} />
                                                    }
                                                    label="Power Backup"
                                                />
                                            </Grid>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox sx={{
                                                        '&.Mui-checked .MuiSvgIcon-root': {
                                                            color: 'var(--orange-color)',
                                                        },
                                                    }} />
                                                }
                                                label="TV"
                                            />
                                        </Grid>
                                    </FormControl>
                                </Grid>

                                <Grid size={{ sx: 12 }} sx={{ width: "100%" }}>
                                    <FormLabel htmlFor='hotel-attraction' sx={{ fontWeight: 500 }}>
                                        Hotel Attraction
                                    </FormLabel>
                                    <TextField
                                        id="hotel-attraction"
                                        variant="outlined"
                                        placeholder="Enter a description for hotel attraction"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        required
                                        sx={{
                                            marginTop: 1,
                                            color: 'var(--black-color)',
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'var(--orange-color)',
                                                },
                                            },
                                        }}
                                    />
                                </Grid>

                            </Grid>


                            <Grid sx={{ backgroundColor: 'var(--white-color)', padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>


                                <Grid size={{ sx: 12 }} sx={{ width: '100%' }}>
                                    <Box sx={{ width: '100%', marginTop: 2 }}>
                                        <FormLabel htmlFor='special-facilities' sx={{ fontWeight: 500 }}>
                                            Image Gallery
                                        </FormLabel>
                                        <Box
                                            {...getRootProps()}
                                            sx={{
                                                border: '1px dashed gray',
                                                padding: '20px',
                                                textAlign: 'center',
                                                cursor: 'pointer',
                                                marginTop: 1
                                            }}
                                        >
                                            <input {...getInputProps()} />
                                            <Typography>Drop Files To Upload</Typography>
                                            <Typography variant="body2">or</Typography>
                                            <Button variant="contained" color="error">
                                                Upload a image
                                            </Button>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginTop: 2 }}>
                                            {images.map((image, index) => (
                                                <Box
                                                    key={index}
                                                    sx={{
                                                        position: 'relative',
                                                        width: 100,
                                                        height: 100,
                                                        borderRadius: 1,
                                                        overflow: 'hidden',
                                                        border: '1px solid var(--black-color)',
                                                    }}
                                                >
                                                    <img
                                                        src={image.preview}
                                                        alt={`preview-${index}`}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                    <IconButton
                                                        size="small"
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 2,
                                                            right: 2,
                                                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                                        }}
                                                        onClick={() => removeImage(index)}
                                                    >
                                                        <CloseIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid size={{ sx: 12 }} sx={{ width: "100%" }}>
                                    <FormLabel htmlFor='special-facilities' sx={{ fontWeight: 500 }}>
                                        Special Facilites
                                    </FormLabel>
                                    <TextField
                                        id="special-facilities"
                                        variant="outlined"
                                        placeholder="Enter a description for hotel attraction"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        required
                                        sx={{
                                            marginTop: 1,
                                            color: 'var(--black-color)',
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'var(--orange-color)',
                                                },
                                            },
                                        }}
                                    />
                                </Grid>

                                <Grid size={{ sx: 12 }} sx={{ width: "100%" }}>
                                    <FormLabel htmlFor='hotel-policy' sx={{ fontWeight: 500 }}>
                                        Hotel Policy
                                    </FormLabel>
                                    <TextField
                                        id="hotel-policy"
                                        variant="outlined"
                                        placeholder="Enter a description for hotel attraction"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        required
                                        sx={{
                                            marginTop: 1,
                                            color: 'var(--black-color)',
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'var(--orange-color)',
                                                },
                                            },
                                        }}
                                    />
                                </Grid>








                            </Grid>

                        </Grid >

                        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 3 }}>
                            <Box sx={{ backgroundColor: 'var(--white-color)', padding: '15px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <FormLabel htmlFor="rating" sx={{ fontWeight: 500 }}>
                                        Rating
                                    </FormLabel>
                                    <Rating
                                        id="rating"
                                        name="rating"
                                        value={value}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                        sx={{ marginTop: 1 }}
                                    />
                                </Grid>

                                <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <FormLabel htmlFor="offer-percentage" sx={{ fontWeight: 500 }}>
                                        Booking Percentage(%)
                                    </FormLabel>
                                    <TextField
                                        id="offer-percentage"
                                        name="offer-percentage"
                                        type="number"
                                        placeholder='Enter Offer in %'
                                        inputProps={{ min: 0, max: 100 }}
                                        sx={{ marginTop: 1 }}
                                    />
                                </Grid>

                                <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Button
                                                      type="submit"
                                                      fullWidth
                                                      variant="contained"
                                                      sx={{
                                                        py: 1,
                                                        fontSize: "16px",
                                                        mt: 2,
                                                        mb: 2,
                                                        backgroundColor: "var(--orange-color)",
                                                        "&:hover": { backgroundColor: "var(--blue-color)" },
                                                      }}>Submit</Button>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid >
                </Form>
            </Formik>
        </>
    )
}

export default AddPackage;