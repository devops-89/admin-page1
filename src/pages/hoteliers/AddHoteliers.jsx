import React from "react";
import Grid from "@mui/material/Grid2";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";

const AddHoteliers = () => {
  return (
    <>
      <Grid container sx={{ marginBottom: '10px' }}>
        <Grid size={{ xs: 12, sm: 9 }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "5px",
              textAlign: { xs: "center", sm: "start" }
            }}
          >
            Add Hotelier Details
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "15px",
              fontWeight: "400",
              marginBottom: "5px",
              textAlign: { xs: "center", sm: "start" }
            }}
          >
            Submit Hotelier's Personal and Professional Details
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
          <Link to='/dashboard/hoteliers'><Button variant="contained" sx={{ backgroundColor: 'var(--orange-color)', marginBottom: '15px' }}>View All Hoteliers</Button></Link>
        </Grid>
      </Grid>


      <Formik>
        <Form>
          <Grid container spacing={2}>
            <Grid
              size={{ xs: 12, sm: 12, md: 12, lg: 9 }}
              sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <Grid
                sx={{
                  backgroundColor: "var(--white-color)",
                  padding: "20px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" }}>
                  <FormLabel htmlFor="hotelier-name" sx={{ fontWeight: 500 }}>
                    Full Name
                  </FormLabel>
                  <TextField
                    id="hotelier-name"
                    variant="outlined"
                    placeholder="Full Name"
                    fullWidth
                    required
                    sx={{
                      marginTop: 1,
                      color: "var(--black-color)",
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--orange-color)",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" }}>
                  <FormLabel htmlFor="role" sx={{ fontWeight: 500 }}>
                    Role
                  </FormLabel>
                  <TextField
                    id="role"
                    variant="outlined"
                    placeholder="Hotelier"
                    defaultValue="Hotelier"
                    fullWidth
                    required
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                    sx={{
                      marginTop: 1,
                      color: "var(--black-color)",
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--orange-color)",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" }}>
                  <FormLabel htmlFor="hotelier-email" sx={{ fontWeight: 500 }}>
                    Email
                  </FormLabel>
                  <TextField
                    id="hotelier-email"
                    variant="outlined"
                    placeholder="Email"
                    type="email"
                    fullWidth
                    required
                    sx={{
                      marginTop: 1,
                      color: "var(--black-color)",
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--orange-color)",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" }}>
                  <FormLabel htmlFor="hotelier-phone" sx={{ fontWeight: 500 }}>
                    Phone
                  </FormLabel>
                  <TextField
                    id="hotelier-phone"
                    variant="outlined"
                    placeholder="Phone"
                    fullWidth
                    required
                    sx={{
                      marginTop: 1,
                      color: "var(--black-color)",
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--orange-color)",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ sx: 12 }} sx={{ width: "100%" }}>
                  <FormLabel
                    htmlFor="hotelier-password"
                    sx={{ fontWeight: 500 }}
                  >
                    Password
                  </FormLabel>
                  <TextField
                    id="hotelier-password"
                    variant="outlined"
                    placeholder="Password"
                    type="password"
                    fullWidth
                    required
                    sx={{
                      marginTop: 1,
                      color: "var(--black-color)",
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--orange-color)",
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>

              <Grid
                sx={{
                  backgroundColor: "var(--white-color)",
                  padding: "20px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" }}>
                  <FormLabel
                    htmlFor="hotelier-address"
                    sx={{ fontWeight: 500 }}
                  >
                    Address
                  </FormLabel>
                  <TextField
                    id="hotelier-address"
                    variant="outlined"
                    placeholder="Address"
                    fullWidth
                    required
                    sx={{
                      marginTop: 1,
                      color: "var(--black-color)",
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--orange-color)",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" }}>
                  <FormLabel htmlFor="hotelier-city" sx={{ fontWeight: 500 }}>
                    City
                  </FormLabel>
                  <TextField
                    id="hotelier-city"
                    variant="outlined"
                    placeholder="City"
                    fullWidth
                    required
                    sx={{
                      marginTop: 1,
                      color: "var(--black-color)",
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--orange-color)",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ sx: 12, sm: 4 }} sx={{ width: "100%" }}>
                  <FormLabel htmlFor="hotelier-state" sx={{ fontWeight: 500 }}>
                    State
                  </FormLabel>
                  <TextField
                    id="hotelier-state"
                    variant="outlined"
                    placeholder="State"
                    fullWidth
                    required
                    sx={{
                      marginTop: 1,
                      color: "var(--black-color)",
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--orange-color)",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ sx: 12, sm: 4 }} sx={{ width: "100%" }}>
                  <FormLabel
                    htmlFor="hotelier-country"
                    sx={{ fontWeight: 500 }}
                  >
                    Country
                  </FormLabel>
                  <TextField
                    id="hotelier-country"
                    variant="outlined"
                    placeholder="Country"
                    fullWidth
                    required
                    sx={{
                      marginTop: 1,
                      color: "var(--black-color)",
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--orange-color)",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ sx: 12, sm: 4 }} sx={{ width: "100%" }}>
                  <FormLabel
                    htmlFor="hotelier-pincode"
                    sx={{ fontWeight: 500 }}
                  >
                    Pincode
                  </FormLabel>
                  <TextField
                    id="hotelier-pincode"
                    variant="outlined"
                    placeholder="Pincode"
                    type="number"
                    inputProps={{ min: 0, max: 100 }}
                    fullWidth
                    required
                    sx={{
                      marginTop: 1,
                      color: "var(--black-color)",
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--orange-color)",
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 3 }}>
              <Box
                sx={{
                  backgroundColor: "var(--white-color)",
                  padding: "15px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <Grid sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="h6">Publish</Typography>
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
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </>
  );
};

export default AddHoteliers;
