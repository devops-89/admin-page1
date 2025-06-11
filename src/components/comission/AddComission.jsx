import React, { useState } from "react";
import { Formik, Form } from "formik";

import Grid from "@mui/material/Grid2";
import { ComissionController } from "../../api/comission.controller.js";
import { CommissionValidationSchema } from "../../utils/validationSchema.js";
import {
  Box,
  Button,
  FormLabel,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Paper,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { COLORS } from "../../utils/colors.js";
import ReactLoading from "react-loading";

const AddComission = ({ onAddSuccess }) => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    type: "FLIGHT_ONEWAY_DOMESTIC",
    commission_type: "PERCENTAGE",
    percentage: 0,
    status: true,
  };

  return (
    <Paper sx={{ height: "auto", padding: "20px" }}>
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
        Add Comission Details
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={CommissionValidationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Comission Values:", values);
          setLoading(true);
          ComissionController.addComission(values)
            .then((response) => {
             
              const newCom = response?.data?.commission;
              if (newCom) {
                onAddSuccess(newCom);
              }
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              resetForm();
              setLoading(false);
            });
        }}
      >
        {({ values, handleChange, handleBlur, touched, errors }) => {
          return (
            <Form>
              {/* Amenity Image upload start */}
              <Grid item xs={12} sx={{ width: "100%" }}>
                <Box sx={{ width: "100%", marginTop: 1 }}>
                  <FormLabel
                    sx={{ fontWeight: 500, display: "block" }}
                    htmlFor="type"
                  >
                    Type
                  </FormLabel>
                  <FormControl fullWidth>
                    <Select
                      id="type"
                      size="small"
                      value={values.type}
                      name="type"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      displayEmpty
                      error={Boolean(errors.type)}
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
                      <MenuItem value="FLIGHT_ONEWAY_DOMESTIC">
                        FLIGHT_ONEWAY_DOMESTIC
                      </MenuItem>
                      <MenuItem value="FLIGHT_ONEWAY_INTERNATIONAL">
                        FLIGHT_ONEWAY_INTERNATIONAL
                      </MenuItem>
                      <MenuItem value="FLIGHT_ROUNDTRIP_DOMESTIC">
                        FLIGHT_ROUNDTRIP_DOMESTIC
                      </MenuItem>
                      <MenuItem value="FLIGHT_ROUNDTRIP_INTERNATIONAL">
                        FLIGHT_ROUNDTRIP_INTERNATIONAL
                      </MenuItem>
                      <MenuItem value="FLIGHT_MULTICITY_DOMESTIC">
                        FLIGHT_MULTICITY_DOMESTIC
                      </MenuItem>
                      <MenuItem value="FLIGHT_MULTICITY_INTERNATIONAL">
                        FLIGHT_MULTICITY_INTERNATIONAL
                      </MenuItem>
                      <MenuItem value="HOTEL_DOMESTIC">HOTEL_DOMESTIC</MenuItem>
                      <MenuItem value="HOTEL_INTERNATIONAL">
                        HOTEL_INTERNATIONAL
                      </MenuItem>
                    </Select>
                  </FormControl>
                  {touched.type && errors.type && (
                    <Typography variant="caption" color="error">
                      {errors.type}
                    </Typography>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} sx={{ width: "100%" }}>
                <Box sx={{ width: "100%", marginTop: 1 }}>
                  <FormLabel
                    sx={{ fontWeight: 500, display: "block" }}
                    htmlFor="commission_type"
                  >
                    Commission Type
                  </FormLabel>
                  <FormControl fullWidth>
                    <Select
                      id="commission_type"
                      size="small"
                      value={values.commission_type}
                      name="commission_type"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      displayEmpty
                      error={Boolean(errors.commission_type)}
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
                      <MenuItem value="PERCENTAGE">PERCENTAGE</MenuItem>
                      <MenuItem value="FIXED">FIXED</MenuItem>
                    </Select>
                  </FormControl>
                  {touched.commission_type && errors.commission_type && (
                    <Typography variant="caption" color="error">
                      {errors.commission_type}
                    </Typography>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} sx={{ width: "100%" }}>
                <Box sx={{ width: "100%", marginTop: 1 }}>
                  <FormLabel
                    sx={{ fontWeight: 500, display: "block" }}
                    htmlFor="percentage"
                  >
                    Percentage(%)
                  </FormLabel>
                  <FormControl fullWidth>
                    <TextField
                      id="percentage"
                      name="percentage"
                      size="small"
                      placeholder="Enter Percentage"
                      value={values.percentage}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      displayEmpty
                      error={Boolean(errors.percentage)}
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
                    />
                  </FormControl>
                  {touched.percentage && errors.percentage && (
                    <Typography variant="caption" color="error">
                      {errors.percentage}
                    </Typography>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ width: "100%" }}>
                <Box sx={{ width: "100%", marginTop: 1 }}>
                  <FormLabel
                    sx={{ fontWeight: 500, display: "block" }}
                    htmlFor="status"
                  >
                    Status
                  </FormLabel>
                  <FormControl fullWidth>
                    <Select
                      size="small"
                      value={values.status}
                      id="status"
                      name="status"
                      error={Boolean(errors.status)}
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
                      onChange={handleChange}
                      displayEmpty
                    >
                      <MenuItem value={true}>ACTIVE</MenuItem>
                      <MenuItem value={false}>INACTIVE</MenuItem>
                    </Select>
                  </FormControl>
                  {touched.status && errors.status && (
                    <Typography variant="caption" color="error">
                      {errors.status}
                    </Typography>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} sx={{ width: "100%", marginBlock: "10px" }}>
                <Button
                  type="submit"
                  size="small"
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1,
                    fontSize: "16px",
                    mt: 2,
                    mb: 2,
                    backgroundColor: "var(--orange-color)",
                    "&:hover": { backgroundColor: "var(--blue-color)" },
                  }}
                >
                  {loading ? (
                    <ReactLoading
                      type="bars"
                      height={30}
                      width={30}
                      color="white"
                    />
                  ) : (
                    "Add Amenity"
                  )}
                </Button>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Paper>
  );
};

export default AddComission;
