import React, { useState } from 'react'
import Grid from "@mui/material/Grid2";
import { useDropzone } from 'react-dropzone';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, IconButton, MenuItem, Rating, Select, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Form, Formik } from 'formik';



const AddPackage = () => {

    const [value, setValue] = useState(2);

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
                        Add Package Details
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
                        Experience luxury and comfort with our specially curated hotel packages.
                    </Typography>
                </Box>
            </Grid>

            <Formik>
                <Form>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 9 }} sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>


                            <Grid sx={{ backgroundColor: 'var(--white-color)', padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>

                                <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" }}>
                                    <FormLabel htmlFor="package-name" sx={{ fontWeight: 500 }}>
                                        Package Name
                                    </FormLabel>
                                    <TextField
                                        id="package-name"
                                        variant="outlined"
                                        placeholder="Package Name"
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
                                            htmlFor="package-type"
                                            sx={{
                                                '&.Mui-focused': {
                                                    color: 'var(--black-color)',
                                                },
                                            }}
                                        >
                                            Package Type
                                        </FormLabel>
                                        <Select
                                            id="package-type"
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
                                            <MenuItem value="standard">Standard</MenuItem>
                                            <MenuItem value="deluxe">Deluxe</MenuItem>
                                            <MenuItem value="premium">Premium</MenuItem>
                                        </Select>
                                    </FormControl>

                                </Grid>


                                <Grid item xs={12} sx={{ width: "100%" }}>
                                    <FormLabel sx={{ fontWeight: 500 }} htmlFor="package-description">
                                        Package Description
                                    </FormLabel>
                                    <TextField
                                        id="package-description"
                                        variant="outlined"
                                        placeholder="Enter a description of the Package"
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
                                    <FormLabel htmlFor="group-size" sx={{ fontWeight: 500 }}>
                                        Group Size
                                    </FormLabel>
                                    <TextField
                                        id="group-size"
                                        variant="outlined"
                                        placeholder='Group Size'
                                        type='number'
                                        inputProps={{ min: 0, max: 100 }}
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
                                    <FormLabel htmlFor="trip-duration" sx={{ fontWeight: 500 }}>
                                    Trip Duration
                                    </FormLabel>
                                <Grid sx={{display:'flex', gap:'10px'}}>
                                    <Grid size={{xs:12, sm:6}}>
                                    <TextField
                                        id="trip-duration"
                                        variant="outlined"
                                        placeholder='Days'
                                        type='number'
                                        inputProps={{ min: 0, max: 100 }}
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
                                    <Grid size={{xs:12, sm:6}}>
                                    <TextField
                                        id="trip-duration"
                                        variant="outlined"
                                        placeholder='Nights'
                                        type='number'
                                        inputProps={{ min: 0, max: 100 }}
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
                                </Grid>


                               
                                <Grid size={{ sx: 12, sm: 3 }} sx={{ width: "100%" }}>
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
                                            htmlFor="package-type"
                                            sx={{
                                                '&.Mui-focused': {
                                                    color: 'var(--black-color)',
                                                },
                                            }}
                                        >
                                            Category
                                        </FormLabel>
                                        <Select
                                            id="category"
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
                                            <MenuItem value="adult">Adult</MenuItem>
                                            <MenuItem value="child">Child</MenuItem>
                                            <MenuItem value="couple">Couple</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>


                                <Grid size={{ sx: 12, sm: 3 }} sx={{ width: "100%" }}>
                                    <FormLabel htmlFor="sale-price" sx={{ fontWeight: 500 }}>
                                        Sale Price
                                    </FormLabel>
                                    <TextField
                                        id="sale-price"
                                        variant="outlined"
                                        placeholder='Sale Price'
                                        fullWidth
                                        type='number'
                                        inputProps={{ min: 0, max: 100 }}
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

                                <Grid size={{ sx: 12, sm: 3 }} sx={{ width: "100%" }}>
                                    <FormLabel htmlFor="regular-price" sx={{ fontWeight: 500 }}>
                                     Regular Price
                                    </FormLabel>
                                    <TextField
                                        id="regular-price"
                                        variant="outlined"
                                        placeholder='Regular Price'
                                        fullWidth
                                        type='number'
                                        inputProps={{ min: 0, max: 100 }}
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

                                <Grid size={{ sx: 12, sm: 3 }} sx={{ width: "100%" }}>
                                    <FormLabel htmlFor="discount" sx={{ fontWeight: 500 }}>
                                     Discount
                                    </FormLabel>
                                    <TextField
                                        id="discount"
                                        variant="outlined"
                                        placeholder='Discount'
                                        fullWidth
                                        type='number'
                                        inputProps={{ min: 0, max: 100 }}
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
                                            <Grid size={{ xs: 12, sm: 6}} sx={{ width: '100%' }}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            '&.Mui-checked .MuiSvgIcon-root': {
                                                                color: 'var(--orange-color)',
                                                            },
                                                        }} />
                                                    }
                                                    label="Dinner"
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 6}} sx={{ width: '100%' }}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox sx={{
                                                            '&.Mui-checked .MuiSvgIcon-root': {
                                                                color: 'var(--orange-color)',
                                                            },
                                                        }} />
                                                    }
                                                    label="Breakfast"
                                                />
                                            </Grid>
                                            </Grid>
                                    </FormControl>
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