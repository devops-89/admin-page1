import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useDropzone } from "react-dropzone";
import Grid from "@mui/material/Grid2";
import { amenityValidationSchema } from "../../../utils/validationSchema.js";
import { PackageController } from "../../../api/package.controller.js";
import {
  Box,
  Button,
  FormLabel,
  IconButton,
  Typography,
  Paper,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { COLORS } from "../../../utils/colors.js";
import ReactLoading from "react-loading";

const AddAmenity = ({ onAddSuccess }) => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    amenite_image: [],
    amenite_name: "",
  };

  return (
    <Paper sx={{ height: "auto", padding: "33px" }}>
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
        Add Amenity Details
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={amenityValidationSchema}
        onSubmit={(values, { resetForm }) => {
          const formData=new FormData();
          formData.append("amenite_name",values.amenite_name);
          
          if(values.amenite_image.length>0 && values.amenite_image[0].file){
            formData.append("amenite_image",values.amenite_image[0].file);
          }

          setLoading(true);
          PackageController.addAmenity(formData)
            .then((response) => {
              console.log("response coming: ", response);
              onAddSuccess(response.data.data);
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
        {({ values, handleChange, handleBlur, setFieldValue, errors }) => {
          const {
            getRootProps: getMainRootProps,
            getInputProps: getMainInputProps,
          } = useDropzone({
            onDrop: (acceptedFiles) => {
              const file = acceptedFiles[0];
              if (file) {
                const previewFile = {
                  preview: URL.createObjectURL(file),
                  file,
                  path: file.path || file.name,
                  relativePath: file.path || file.name,
                };
                setFieldValue("amenite_image", [previewFile]); // send as array
              }
            },
            accept: {
              "image/jpeg": [],
              "image/png": [],
              "image/jpg": [],
              "image/webp": [],
            },
            multiple: false,
          });

          return (
            <Form>
              {/* Amenity Image upload start */}
              <Grid item xs={12} sx={{ width: "100%" }}>
                <Box sx={{ width: "100%", marginTop: 2 }}>
                  <FormLabel sx={{ fontWeight: 500 }}>Main Image</FormLabel>
                  <Box
                    {...getMainRootProps()}
                    sx={{
                      border: "1px dashed gray",
                      padding: 2,
                      textAlign: "center",
                      cursor: "pointer",
                      mt: 1,
                    }}
                  >
                    <input {...getMainInputProps()} />
                    <Typography>Drop a file to upload</Typography>
                    <Typography variant="body2">or</Typography>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: COLORS.PRIMARY }}
                      color="error"
                    >
                      Upload Amenity image
                    </Button>
                  </Box>

                  {/* Image preview */}
                  {values.amenite_image.length > 0 && (
                    <Box
                      sx={{
                        mt: 2,
                        width: 100,
                        height: 100,
                        borderRadius: 1,
                        overflow: "hidden",
                        position: "relative",
                        border: "1px solid var(--black-color)",
                      }}
                    >
                      <img
                        src={values.amenite_image[0].preview}
                        alt="main-preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => {
                          URL.revokeObjectURL(values.amenite_image[0].preview);
                          setFieldValue("amenite_image", []);
                        }}
                        sx={{
                          position: "absolute",
                          top: 2,
                          right: 2,
                          backgroundColor: "rgba(255, 255, 255, 0.7)",
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  )}

                  {/* Validation error - show if touched and error exists */}
                  { errors.amenite_image && (
                    <Typography
                      sx={{
                        color: "#d32f2f",
                        fontSize: "0.75rem",
                        marginTop: "4px",
                        marginLeft: "14px",
                      }}
                    >
                      {errors.amenite_image}
                    </Typography>
                  )}
                </Box>
              </Grid>
              {/* Amenity Image upload end */}

              <Grid item xs={12} sx={{ width: "100%", marginBlock: "10px" }}>
                <FormLabel htmlFor="amenite_name" sx={{ fontWeight: 500 }}>
                  Amenity Name
                </FormLabel>
                <TextField
                  id="amenite_name"
                  size="small"
                  variant="outlined"
                  name="amenite_name"
                  placeholder="Enter Amenity Name"
                  value={values.amenite_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  error={Boolean(errors.amenite_name)}
                  helperText={errors.amenite_name}
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

export default AddAmenity;
