import React, { useState } from "react";
import { categoryValidationSchema } from "../../../utils/validationSchema";
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
export default function UpdateCategory({ categoryData }) {
 console.log("Data:",categoryData);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

   const initialValues = {
  // category_image: categoryData?.category_image
  //   ? [
  //       {
  //         preview: categoryData.category_image,
  //         path: categoryData.category_image,
  //         relativePath: categoryData.category_image,
  //       },
  //     ]
  //   : [],
   category_image: [],
  category_name: categoryData.category_name || "",
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
          Update Category
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
        validationSchema={categoryValidationSchema}
        onSubmit={(values, { resetForm }) => {
            console.log("Submited Values: ",values);
          setLoading(true);
          PackageController.updateCategories(categoryData.category_id,values)
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
                  path: file.path || file.name,
                  relativePath: file.path || file.name,
                };
                setFieldValue("category_image", [previewFile]); // send as array
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
          // console.log()

          return (
            <Form>
              {/* Amenity Image upload start */}
           <Grid item xs={12} sx={{ width: "100%" }}>
  <Box sx={{ width: "100%", marginTop: 2 }}>
    <FormLabel sx={{ fontWeight: 500 }}>Category Image</FormLabel>
    <Box
      {...getMainRootProps()}
      sx={{
        border: errors.category_image ? "1px solid #d32f2f" : "1px dashed gray",
        padding: 2,
        textAlign: "center",
        cursor: "pointer",
        mt: 1,
        borderRadius: 1,
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
        Upload Category Image
      </Button>
    </Box>

    {values.category_image.length > 0 && (
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
          src={values.category_image[0].preview}
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
            URL.revokeObjectURL(values.category_image[0].preview);
            setFieldValue("category_image", []);
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

    {/* Show validation error like MUI's helperText */}
    {errors.category_image && (
      <Typography
        sx={{ color: "#d32f2f", fontSize: "0.75rem", marginTop: "4px", marginLeft: "14px" }}
      >
        {errors.category_image}
      </Typography>
    )}
  </Box>
</Grid>
              {/* Amenity Image upload end */}

              <Grid item xs={12} sx={{ width: "100%", marginBlock: "10px" }}>
                <FormLabel htmlFor="category_name" sx={{ fontWeight: 500 }}>
                  Category Name
                </FormLabel>
                <TextField
                  id="category_name"
                  size="small"
                  variant="outlined"
                  name="category_name"
                  placeholder="Enter Amenity Name"
                  value={values.category_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  error={Boolean(errors.category_name)}
                  helperText={errors.category_name}
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
