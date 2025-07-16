import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { setToast } from "../../redux/reducers/toast";
import ToastBar from "../../components/ToastBar";
import { TOAST_STATUS } from "../../utils/enum";
import { useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  IconButton,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import { Form, Formik } from "formik";
import { PackageController } from "../../api/package.controller";
import ReactLoading from "react-loading";

const AddPackage = () => {
  const dispatch=useDispatch();
  const [loading, setLoading] = useState(false);

  const [amenities, setAmenities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [packageDuration, setPackageDuration] = useState([]);

  useEffect(() => {
    // fetching amenities start
    PackageController.getAmenities()
      .then((response) => {
        setAmenities(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // fetching amenities end

    // fetching categories start
    PackageController.getCategories()
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // fetching categories end

    // fetching packageday start

    PackageController.getPackageDayList()
      .then((response) => {
        setPackageDuration(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // fetching packageday end
  }, []);

  const initialState = {
    package_name: "",
    package_slug: "",
    short_description: "",
    description: "",
    package_day: "",
    package_price: 0.0,
    selling_price: 0.0,
    package_destination: "",
    address1: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    package_type: "",
    near_by_location: "",
    highlight: "",
    amenities: [],
    main_image: [],
    banner_image: [],
    gallery_image: [],
    rating: 1,
  };

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
            Experience luxury and comfort with our specially curated hotel
            packages.
          </Typography>
        </Box>
      </Grid>

      <Formik
        initialValues={initialState}
        enableReinitialize
        onSubmit={(values,{resetForm}) => {
          // setLoading(true);
          console.log("creating package:", values);
          PackageController.createPackage(values)
            .then((response) => {
              console.log("response: ", response);
                dispatch(
                        setToast({
                          open: true,
                          message: "Package Created Successfully.",
                          severity: TOAST_STATUS.SUCCESS,
                        })
                      );

                      
              // if(response.status==200){
              //     alert("Package Added Successfully.");
              // }
            })
            .catch((error) => {
              console.log("error:", error);
                dispatch(
                        setToast({
                          open: true,
                          message: "Error in Creating Package!",
                          severity: TOAST_STATUS.ERROR,
                        })
                      );
            })
            .finally(() => {
              setLoading(false);
              resetForm();
            });
        }}
      >
        {({ values, handleChange, handleBlur, setFieldValue }) => {
          // main image logic start

          const { getRootProps: mainRootProps, getInputProps: mainInputProps } =
            useDropzone({
              onDrop: (acceptedFiles) => {
                const filePreviews = acceptedFiles.map((file) =>
                  Object.assign(file, { preview: URL.createObjectURL(file) })
                );

                setFieldValue("main_image", [filePreviews[0]]);
              },
              accept: {
                "image/jpeg": [],
                "image/png": [],
                "image/gif": [],
                "image/svg+xml": [],
                "image/jpg": [],
              },
              multiple: false,
            });
          //   main image logic end

          // banner   image logic start

          const {
            getRootProps: bannerRootProps,
            getInputProps: bannerInputProps,
          } = useDropzone({
            onDrop: (acceptedFiles) => {
              const filePreviews = acceptedFiles.map((file) =>
                Object.assign(file, { preview: URL.createObjectURL(file) })
              );

              setFieldValue("banner_image", [filePreviews[0]]);
            },
            accept: {
              "image/jpeg": [],
              "image/png": [],
              "image/gif": [],
              "image/svg+xml": [],
              "image/jpg": [],
            },
            multiple: false,
          });
          // banner image logic end

          // gallery image logic start

          const {
            getRootProps: galleryRootProps,
            getInputProps: galleryInputProps,
          } = useDropzone({
            onDrop: (acceptedFiles) => {
              const filePreviews = acceptedFiles.map((file) =>
                Object.assign(file, { preview: URL.createObjectURL(file) })
              );

              setFieldValue("gallery_image", [
                ...(values.gallery_image || []),
                ...filePreviews,
              ]);
            },
            accept: {
              "image/jpeg": [],
              "image/png": [],
              "image/gif": [],
              "image/svg+xml": [],
              "image/jpg": [],
            },
            multiple: true,
          });
          // gallery image logic end
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
                      padding: "20px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" }}>
                      <FormLabel
                        htmlFor="package_name"
                        sx={{ fontWeight: 500 }}
                      >
                        Package Name
                      </FormLabel>
                      <TextField
                        id="package_name"
                        name="package_name"
                        value={values.package_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        placeholder="Package Name"
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
                      <FormControl
                        fullWidth
                        sx={{
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      >
                        <FormLabel
                          htmlFor="package_slug"
                          sx={{
                            "&.Mui-focused": {
                              color: "var(--black-color)",
                            },
                          }}
                        >
                          Package Slug
                        </FormLabel>
                        <TextField
                          id="package_slug"
                          name="package_slug"
                          value={values.package_slug}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          fullWidth
                          placeholder="Enter Package Slug"
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
                      </FormControl>
                    </Grid>

                    <Grid size={{ sx: 12, sm: 12 }} sx={{ width: "100%" }}>
                      <FormControl
                        fullWidth
                        sx={{
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      >
                        <FormLabel
                          htmlFor="short_description"
                          sx={{
                            "&.Mui-focused": {
                              color: "var(--black-color)",
                            },
                          }}
                        >
                          Short Description
                        </FormLabel>
                        <TextField
                          id="short_description"
                          name="short_description"
                          value={values.short_description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          fullWidth
                          placeholder="Enter Short Description"
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
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sx={{ width: "100%" }}>
                      <FormLabel sx={{ fontWeight: 500 }} htmlFor="description">
                        Package Description
                      </FormLabel>
                      <TextField
                        id="description"
                        variant="outlined"
                        placeholder="Enter a description of the Package"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        multiline
                        rows={4}
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
                      <FormLabel htmlFor="package_day" sx={{ fontWeight: 500 }}>
                        Trip Duration
                      </FormLabel>
                      <Grid sx={{ display: "flex", gap: "10px" }}>
                        <Grid size={{ xs: 12, sm: 12 }}>
                          <Select
                            id="package_day"
                            name="package_day"
                            value={values.package_day}
                            onChange={(event) => {
                              setFieldValue("package_day", event.target.value);
                            }}
                            variant="outlined"
                            fullWidth
                            sx={{
                              marginTop: 1,
                              color: "var(--black-color)",
                              "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                  borderColor: "var(--orange-color)",
                                },
                              },
                            }}
                          >
                            {packageDuration.map((item, index) => (
                              <MenuItem
                                key={index}
                                value={item.pkgday_duration}
                              >
                                {item.pkgday_duration}
                              </MenuItem>
                            ))}
                          </Select>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" }}>
                      <FormControl
                        fullWidth
                        sx={{
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      >
                        <FormLabel
                          htmlFor="package_type"
                          sx={{
                            "&.Mui-focused": {
                              color: "var(--black-color)",
                            },
                          }}
                        >
                          Category
                        </FormLabel>
                        <Select
                          id="package_type"
                          name="package_type"
                          value={values.package_type}
                          onChange={(event) => {
                            setFieldValue("package_type", event.target.value);
                          }}
                          variant="outlined"
                          fullWidth
                          sx={{
                            marginTop: 1,
                            color: "var(--black-color)",
                            "& .MuiOutlinedInput-root": {
                              "&.Mui-focused fieldset": {
                                borderColor: "var(--orange-color)",
                              },
                            },
                          }}
                        >
                          {categories.map((item) => (
                            <MenuItem
                              key={item.category_name}
                              value={item.category_name}
                            >
                              {item.category_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid size={{ sx: 12, sm: 3 }} sx={{ width: "100%" }}>
                      <FormLabel
                        htmlFor="selling_price"
                        sx={{ fontWeight: 500 }}
                      >
                        Sale Price
                      </FormLabel>
                      <TextField
                        id="selling_price"
                        variant="outlined"
                        placeholder="Sale Price"
                        value={values.selling_price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        type="number"
                        inputProps={{ min: 0}}
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

                    <Grid size={{ sx: 12, sm: 3 }} sx={{ width: "100%" }}>
                      <FormLabel
                        htmlFor="package_price"
                        sx={{ fontWeight: 500 }}
                      >
                        Regular Price
                      </FormLabel>
                      <TextField
                        id="package_price"
                        variant="outlined"
                        placeholder="Regular Price"
                        fullWidth
                        type="number"
                        value={values.package_price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        inputProps={{ min: 0}}
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

                    <Grid item size={{ xs: 12, sm: 6 }} sx={{ width: "100%" }}>
                      <FormLabel htmlFor="amenities" sx={{ fontWeight: 500 }}>
                        Select Amenities
                      </FormLabel>
                      <Select
                        id="amenities"
                        name="amenities"
                        multiple
                        variant="outlined"
                        fullWidth
                        sx={{
                          marginTop: 1,
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                        value={values.amenities} // an array of full objects
                        onChange={(event) => {
                          const {
                            target: { value },
                          } = event;

                          // value is array of selected amenity objects
                          setFieldValue("amenities", value);
                        }}
                        renderValue={(selected) =>
                          selected.map((item) => item.amenite_name).join(", ")
                        }
                      >
                        {amenities.map((item) => (
                          <MenuItem key={item.amenite_id} value={item}>
                            <Checkbox
                              checked={values.amenities.some(
                                (a) => a.amenite_id === item.amenite_id
                              )}
                            />
                            <Typography>{item.amenite_name}</Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>

              
                  </Grid>

                  {/* third section start */}

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
                      <FormControl
                        fullWidth
                        sx={{
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      >
                        <FormLabel
                          htmlFor="package_destination"
                          sx={{
                            "&.Mui-focused": {
                              color: "var(--black-color)",
                            },
                          }}
                        >
                          Package Destination
                        </FormLabel>
                        <TextField
                          id="package_destination"
                          name="package_destination"
                          value={values.package_destination}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          fullWidth
                          placeholder="Package Destination"
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
                      </FormControl>
                    </Grid>

                    <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" }}>
                      <FormControl
                        fullWidth
                        sx={{
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      >
                        <FormLabel
                          htmlFor="address1"
                          sx={{
                            "&.Mui-focused": {
                              color: "var(--black-color)",
                            },
                          }}
                        >
                          Address 1
                        </FormLabel>
                        <TextField
                          id="address1"
                          name="address1"
                          value={values.address1}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          fullWidth
                          placeholder="Address 1"
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
                      </FormControl>
                    </Grid>

                    <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" }}>
                      <FormControl
                        fullWidth
                        sx={{
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      >
                        <FormLabel
                          htmlFor="city"
                          sx={{
                            "&.Mui-focused": {
                              color: "var(--black-color)",
                            },
                          }}
                        >
                          City
                        </FormLabel>
                        <TextField
                          id="city"
                          name="city"
                          value={values.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          fullWidth
                          placeholder="Enter City"
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
                      </FormControl>
                    </Grid>

                    <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" }}>
                      <FormControl
                        fullWidth
                        sx={{
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      >
                        <FormLabel
                          htmlFor="state"
                          sx={{
                            "&.Mui-focused": {
                              color: "var(--black-color)",
                            },
                          }}
                        >
                          State
                        </FormLabel>
                        <TextField
                          id="state"
                          name="state"
                          value={values.state}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          fullWidth
                          placeholder="Enter State"
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
                      </FormControl>
                    </Grid>
                    <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" }}>
                      <FormControl
                        fullWidth
                        sx={{
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      >
                        <FormLabel
                          htmlFor="country"
                          sx={{
                            "&.Mui-focused": {
                              color: "var(--black-color)",
                            },
                          }}
                        >
                          Country
                        </FormLabel>
                        <TextField
                          id="country"
                          name="country"
                          value={values.country}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          fullWidth
                          placeholder="Enter Country"
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
                      </FormControl>
                    </Grid>

                    <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" }}>
                      <FormControl
                        fullWidth
                        sx={{
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      >
                        <FormLabel
                          htmlFor="near_by_location"
                          sx={{
                            "&.Mui-focused": {
                              color: "var(--black-color)",
                            },
                          }}
                        >
                          Near Location
                        </FormLabel>
                        <TextField
                          id="near_by_location"
                          name="near_by_location"
                          value={values.near_by_location}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          fullWidth
                          placeholder="Enter Near Location"
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
                      </FormControl>
                    </Grid>

                    <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" }}>
                      <FormControl
                        fullWidth
                        sx={{
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      >
                        <FormLabel
                          htmlFor="zip"
                          sx={{
                            "&.Mui-focused": {
                              color: "var(--black-color)",
                            },
                          }}
                        >
                          Highlight
                        </FormLabel>
                        <TextField
                          id="highlight"
                          name="highlight"
                          value={values.highlight}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          fullWidth
                          placeholder="Enter Highlight"
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
                      </FormControl>
                    </Grid>
                    <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" }}>
                      <FormControl
                        fullWidth
                        sx={{
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      >
                        <FormLabel
                          htmlFor="zip"
                          sx={{
                            "&.Mui-focused": {
                              color: "var(--black-color)",
                            },
                          }}
                        >
                          ZIP
                        </FormLabel>
                        <TextField
                          id="zip"
                          name="zip"
                          value={values.zip}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          fullWidth
                          placeholder="Enter ZIP CODE"
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
                      </FormControl>
                    </Grid>
                  </Grid>

                  {/* Third section end */}

                  <Grid
                    sx={{
                      backgroundColor: "var(--white-color)",
                      padding: "20px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <Grid size={{ sx: 12 }} sx={{ width: "100%" }}>
                      <Box sx={{ width: "100%", marginTop: 2 }}>
                        <FormLabel
                          htmlFor="special-facilities"
                          sx={{ fontWeight: 500 }}
                        >
                          Main Image
                        </FormLabel>
                        <Box
                          {...mainRootProps()}
                          sx={{
                            border: "1px dashed gray",
                            padding: "20px",
                            textAlign: "center",
                            cursor: "pointer",
                            marginTop: 1,
                          }}
                        >
                          <input {...mainInputProps()} />
                          <Typography>Drop Files To Upload</Typography>
                          <Typography variant="body2">or</Typography>
                          <Button variant="contained" color="error">
                            Upload a image
                          </Button>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            flexWrap: "wrap",
                            marginTop: 2,
                          }}
                        >
                          {values["main_image"].map((image, index) => (
                            <Box
                              key={index}
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
                                alt={`preview-${index}`}
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
                                onClick={(index) => {
                                  setFieldValue("main_image", []);
                                }}
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Grid>

                    {/* banner image start */}
                    <Grid size={{ sx: 12 }} sx={{ width: "100%" }}>
                      <Box sx={{ width: "100%", marginTop: 2 }}>
                        <FormLabel
                          htmlFor="special-facilities"
                          sx={{ fontWeight: 500 }}
                        >
                          Banner Image
                        </FormLabel>
                        <Box
                          {...bannerRootProps()}
                          sx={{
                            border: "1px dashed gray",
                            padding: "20px",
                            textAlign: "center",
                            cursor: "pointer",
                            marginTop: 1,
                          }}
                        >
                          <input {...bannerInputProps()} />
                          <Typography>Drop Files To Upload</Typography>
                          <Typography variant="body2">or</Typography>
                          <Button variant="contained" color="error">
                            Upload a image
                          </Button>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            flexWrap: "wrap",
                            marginTop: 2,
                          }}
                        >
                          {values["banner_image"].map((image, index) => (
                            <Box
                              key={index}
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
                                alt={`preview-${index}`}
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
                                onClick={(index) => {
                                  setFieldValue("banner_image", []);
                                }}
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Grid>

                    {/* banner image end */}

                    {/* Gallery image start */}

                    <Grid size={{ sx: 12 }} sx={{ width: "100%" }}>
                      <Box sx={{ width: "100%", marginTop: 2 }}>
                        <FormLabel
                          htmlFor="special-facilities"
                          sx={{ fontWeight: 500 }}
                        >
                          Gallery Image
                        </FormLabel>
                        <Box
                          {...galleryRootProps()}
                          sx={{
                            border: "1px dashed gray",
                            padding: "20px",
                            textAlign: "center",
                            cursor: "pointer",
                            marginTop: 1,
                          }}
                        >
                          <input {...galleryInputProps()} />
                          <Typography>Drop Files To Upload</Typography>
                          <Typography variant="body2">or</Typography>
                          <Button variant="contained" color="error">
                            Upload a image
                          </Button>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            flexWrap: "wrap",
                            marginTop: 2,
                          }}
                        >
                          {values.gallery_image.map((image, index) => (
                            <Box
                              key={index}
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
                                alt={`preview-${index}`}
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
                                onClick={() => {
                                  setFieldValue(
                                    "gallery_image",
                                    values["gallery_image"].filter(
                                      (_, i) => i != index
                                    )
                                  );
                                }}
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Grid>

                    {/* Gallery image end */}
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
                      <FormLabel htmlFor="rating" sx={{ fontWeight: 500 }}>
                        Rating
                      </FormLabel>
                      <Rating
                        id="rating"
                        name="rating"
                        value={values.rating}
                        onChange={(event, newValue) => {
                          setFieldValue("rating", newValue);
                        }}
                        sx={{ marginTop: 1 }}
                      />
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
                        {loading ? (
                          <ReactLoading
                            type="bars"
                            color="white"
                            width={30}
                            height={30}
                          />
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </Grid>
                  </Box>
                </Grid>
                     {/* for toast rendering */}
        <ToastBar/>
              </Grid>
            </Form>
          );
        }}
   
      </Formik>
    </>
  );
};

export default AddPackage;
