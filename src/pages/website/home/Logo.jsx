import React from 'react'
import Grid from "@mui/material/Grid2";
import { Button, FormLabel, TextField, Typography } from '@mui/material';
import ImageUpload from '../../../components/ImageUpload';
import { Form, Formik } from 'formik';

const Logo = () => {
    return (
        <>
            <Grid container>
                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ fontWeight: 600, marginBottom: '25px' }}>Updated Logo</Typography>
                    <Formik>
                        <Form>
                        <Grid container>
                        <Grid size={{xs:12, sm:12, md:6}}>
                        <ImageUpload />
                        </Grid>
                        <Grid size={{xs:12, sm:12, md:6}}>
                        <FormLabel htmlFor="alt-text" sx={{ fontWeight: 500, color:'var(--black-color)', fontSize:'18px' }}>
                                Alt Text
                            </FormLabel>
                            <TextField
                                id="alt-text"
                                variant="outlined"
                                placeholder="Enter Alt Text"
                                fullWidth
                                required
                                sx={{
                                     marginTop:'15px',
                                    color: "var(--black-color)",
                                    "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused fieldset": {
                                            borderColor: "var(--orange-color)",
                                        },
                                    },
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    py: 1,
                                    fontSize: "16px",
                                    mt: 2,
                                    mb: 2,
                                    backgroundColor: "var(--orange-color)",
                                    "&:hover": { backgroundColor: "var(--blue-color)" },
                                }}
                            >
                                Submit
                            </Button>
                        </Grid>
                        </Grid>
                        </Form>
                    </Formik>
                </Grid>
            </Grid>
        </>
    )
}

export default Logo