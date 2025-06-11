import React, { useState } from "react";
import { CommissionValidationSchema } from "../../utils/validationSchema";
import Grid from "@mui/material/Grid2";
import Dialog from "@mui/material/Dialog";
import { Formik, Form } from "formik";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { ComissionController } from "../../api/comission.controller";

import {
  Box,
  Button,
  FormLabel,
  FormControl,
  Select,
  MenuItem,
  Typography,
  TextField,
} from "@mui/material";
import ReactLoading from "react-loading";

export default function UpdateComission({ onAddSuccess,comissionData }) {
 console.log("Data:",comissionData);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    commission_id:comissionData.commission_id || "",
    type: comissionData.type || "FLIGHT_ONEWAY_DOMESTIC",
    commission_type: comissionData.commission_type || "PERCENTAGE",
    percentage: comissionData.percentage || 0,
    status: comissionData.status || true,
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          minWidth: "32px",
          padding: "4px",
          backgroundColor: "var(--orange-color)",
          "&:hover": {
            backgroundColor: "var(--blue-color)",
          },
        }}
      >
        <EditIcon fontSize="small" />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            height: "auto",
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Update Commission
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={CommissionValidationSchema}
            onSubmit={(values, { resetForm }) => {
           
              setLoading(true);
              ComissionController.updateComission(values)
                .then((response) => {
                  const newCom = response?.data?.data;
            console.log("update response:",response.data.data);
                  if (newCom) {
                    onAddSuccess(newCom);
                    handleClose();
                  }
                })
                .catch(console.error)
                .finally(() => {
                  setLoading(false);
                  resetForm();
                });
            }}
          >
            {({ values, handleChange, handleBlur, touched, errors }) => (
              <Form>
                {/* Form Fields */}
                <Grid container spacing={2}>
                  <Grid size={{xs:12}}>
                    <FormLabel htmlFor="type">Type</FormLabel>
                    <Select
                      fullWidth
                      id="type"
                      name="type"
                      size="small"
                      value={values.type}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.type && touched.type)}
                      sx={{ mt: 1 }}
                      
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
                    {touched.type && errors.type && (
                      <Typography variant="caption" color="error">
                        {errors.type}
                      </Typography>
                    )}
                  </Grid>

                  <Grid size={{xs:12}}>
                    <FormLabel htmlFor="commission_type">
                      Commission Type
                    </FormLabel>
                    <Select
                      fullWidth
                      id="commission_type"
                      name="commission_type"
                      size="small"
                      value={values.commission_type}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        errors.commission_type && touched.commission_type
                      )}
                      sx={{ mt: 1 }}
                    >
                      <MenuItem value="PERCENTAGE">PERCENTAGE</MenuItem>
                      <MenuItem value="FIXED">FIXED</MenuItem>
                    </Select>
                    {touched.commission_type && errors.commission_type && (
                      <Typography variant="caption" color="error">
                        {errors.commission_type}
                      </Typography>
                    )}
                  </Grid>

                  <Grid size={{xs:8}}>
                    <FormLabel htmlFor="percentage">Percentage (%)</FormLabel>
                    <TextField
                      fullWidth
                      size="small"
                      id="percentage"
                      name="percentage"
                      value={values.percentage}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter Percentage"
                      error={Boolean(errors.percentage && touched.percentage)}
                      sx={{ mt: 1 }}
                    />
                    {touched.percentage && errors.percentage && (
                      <Typography variant="caption" color="error">
                        {errors.percentage}
                      </Typography>
                    )}
                  </Grid>

                  <Grid size={{xs:4}}>
                    <FormLabel htmlFor="status">Status</FormLabel>
                    <Select
                      fullWidth
                      size="small"
                      id="status"
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.status && touched.status)}
                      sx={{ mt: 1 }}
                    >
                      <MenuItem value={true}>ACTIVE</MenuItem>
                      <MenuItem value={false}>INACTIVE</MenuItem>
                    </Select>
                    {touched.status && errors.status && (
                      <Typography variant="caption" color="error">
                        {errors.status}
                      </Typography>
                    )}
                  </Grid>

                  <Grid size={{xs:5}}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 3,
                        
                        backgroundColor: "var(--orange-color)",
                       
                      }}
                    >
                      {loading ? (
                        <ReactLoading
                          type="bars"
                          height={20}
                          width={20}
                          color="#fff"
                        />
                      ) : (
                        "Update Commission"
                      )}
                    </Button>
                    
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}
