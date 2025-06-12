import React, { useState } from "react";
import { packageDayValidationSchema } from "../../../utils/validationSchema";
import Grid from "@mui/material/Grid2";
import Dialog from "@mui/material/Dialog";
import { Formik, Form } from "formik";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { PackageController } from "../../../api/package.controller";
import { COLORS } from "../../../utils/colors";
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
import { ErrorCode, useDropzone } from "react-dropzone";
export default function UpdatePackageDay({ packageDayData }) {
 console.log("Data:",packageDayData);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

   const initialValues = {
  // category_image: packageDayData?.category_image
  //   ? [
  //       {
  //         preview: packageDayData.category_image,
  //         path: packageDayData.category_image,
  //         relativePath: packageDayData.category_image,
  //       },
  //     ]
  //   : [],
    pkgday_duration:packageDayData.pkgday_duration || ""
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
          Update Package Days
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
        validationSchema={packageDayValidationSchema}
        onSubmit={(values, { resetForm }) => {
            console.log("Submited Values: ",values);
        //   setLoading(true);
        //   PackageController.updateCategories(packageDayData.category_id,values)
        //     .then((response) => {
        //       console.log("response coming: ", response);
        //       onAddSuccess(response.data.data);
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //     })
        //     .finally(() => {
        //       resetForm();
        //       setLoading(false);
        //     });
        }}
      >
        {({ values, handleChange, handleBlur, setFieldValue, errors }) => {
          

          return (
            <Form>
            

              <Grid item xs={12} sx={{ width: "100%", marginBlock: "10px" }}>
                <FormLabel htmlFor="pkgday_duration" sx={{ fontWeight: 500 }}>
                  Package Day Name
                </FormLabel>
                <TextField
                  id="pkgday_duration"
                  size="small"
                  variant="outlined"
                  name="pkgday_duration"
                  placeholder="Enter Amenity Name"
                  value={values.pkgday_duration}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  error={Boolean(errors.pkgday_duration)}
                  helperText={errors.pkgday_duration}
                />
             
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
                    "Add Category"
                  )}
                </Button>
              </Grid>
            </Form>
          );
        }}
      </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}
