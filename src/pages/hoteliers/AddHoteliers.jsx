import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Button,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { HotlierValidationSchema } from "../../utils/validationSchema";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";

const AddHoteliers = () => {
  const initialValue={
         "email": "",
        "password": "",
        "full_name": "",
        "phone_number": "",
        "country_code": "+91"
  };
  const [image, setImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const filePreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setImage(filePreview);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
      "image/svg+xml": [],
      "image/jpg": [],
    },
    multiple: false,
  });

  return (
    <>
      <Grid container sx={{ marginBottom: "10px" }}>
        <Grid size={{ xs: 12, sm: 9 }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "5px",
              textAlign: { xs: "center", sm: "start" },
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
              textAlign: { xs: "center", sm: "start" },
            }}
          >
            Submit Hotelier's Personal and Professional Details
          </Typography>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 3 }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", sm: "flex-end" },
          }}
        >
          <Link to="/dashboard/hoteliers">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "var(--orange-color)",
                marginBottom: "15px",
              }}
            >
              View All Hoteliers
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Formik initialValues={initialValue} validationSchema={HotlierValidationSchema} onSubmit={(values,{resetForm})=>{
          console.log("Form values are:",values);
          resetForm();
      }}  >
        {
          ({values,errors,handleBlur,handleChange})=>{
            return (
                    <Form>
          <Grid container spacing={2}>
            <Grid
              size={{ xs: 12, sm: 12, md: 12, lg: 9 }}
              sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <Grid
                sx={{
                  backgroundColor: "var(--white-color)",
                  padding: "30px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%",my:1 }}>
                  <FormLabel htmlFor="full_name" sx={{ fontWeight: 500 }}>
                    Full Name
                  </FormLabel>
                  <TextField
                    id="full_name"
                    variant="outlined"
                    placeholder="Full Name"
                    name="full_name"
                    value={values.full_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.full_name)}
                    helperText={errors.full_name}
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

                <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%",my:1 }}>
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

                <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" ,my:1}}>
                  <FormLabel htmlFor="email" sx={{ fontWeight: 500 }}>
                    Email
                  </FormLabel>
                  <TextField
                    id="hotelier-email"
                    variant="outlined"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
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

                <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%",my:1 }}>
                  <FormLabel htmlFor="phone_number" sx={{ fontWeight: 500 }}>
                    Phone
                  </FormLabel>
                  <TextField
                    id="phone_number"
                    variant="outlined"
                    placeholder="Phone"
                    name="phone_number"
                    value={values.phone_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.phone_number)}
                    helperText={errors.phone_number}
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

                <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%",my:1 }}>
                  <FormLabel
                    htmlFor="password"
                    sx={{ fontWeight: 500 }}
                  >
                    Password
                  </FormLabel>
                  <TextField
                    id="password"
                    variant="outlined"
                    placeholder="Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
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

              <Grid item sx={{ width: "100%",my:1 }} size={{ sx: 12, sm: 6 }}>
  <FormControl fullWidth required >
    <FormLabel htmlFor="country_code" sx={{ fontWeight: 500 }}>
      Country Code
    </FormLabel>
    <Select
      id="country_code"
      defaultValue="+91"
      displayEmpty
      name="country_code"
      value={values.country_code}
      onChange={handleChange}
      onBlur={handleBlur}
      variant="outlined"
      sx={{
        marginTop: 1,
        color: "var(--black-color)",
        backgroundColor: "white",
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(0, 0, 0, 0.23)",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--orange-color)",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--orange-color)",
        },
      }}
    >
      <MenuItem value="+91">+91 (India)</MenuItem>
      <MenuItem value="+1">+1 (USA)</MenuItem>
      <MenuItem value="+44">+44 (UK)</MenuItem>
      <MenuItem value="+61">+61 (Australia)</MenuItem>
      <MenuItem value="+81">+81 (Japan)</MenuItem>
    </Select>
  </FormControl>
</Grid>
              </Grid>

              {/* <Grid
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
              </Grid> */}
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
                <Grid size={{ sx: 12 }} sx={{ width: "100%",my:1 }}>
                  <Box sx={{ width: "100%", marginTop: 2 }}>
                    <FormLabel
                      htmlFor="profile-upload"
                      sx={{ fontWeight: 500 }}
                    >
                      Profile
                    </FormLabel>
                    <Box
                      {...getRootProps()}
                      sx={{
                        border: "1px dashed gray",
                        padding: "20px",
                        textAlign: "center",
                        cursor: "pointer",
                        marginTop: 1,
                      }}
                    >
                      <input {...getInputProps()} />
                      <Typography>Drop File To Upload</Typography>
                      <Typography variant="body2">or</Typography>
                      <Button variant="contained" color="error">
                        Upload an Image
                      </Button>
                    </Box>
                    <Box sx={{ marginTop: 2 }}>
                      {image && (
                        <Box
                          sx={{
                            position: "relative",
                            width: 100,
                            height: 100,
                            borderRadius: 1,
                            overflow: "hidden",
                            border: "1px solid var(--black-color)",
                          }}
                        >
                          <img
                            src={image.preview}
                            alt="preview"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <IconButton
                            size="small"
                            sx={{
                              position: "absolute",
                              top: 2,
                              right: 2,
                              backgroundColor: "rgba(255, 255, 255, 0.7)",
                            }}
                            onClick={removeImage}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Grid>

                <Grid sx={{ display: "flex", flexDirection: "column" }}>
                
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
            )
          }
        }
    
      </Formik>
    </>
  );
};

export default AddHoteliers;
