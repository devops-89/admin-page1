import {useState} from "react";
import { Formik, Form } from "formik";
import Grid from "@mui/material/Grid2";
import { packageDayValidationSchema } from "../../../utils/validationSchema.js";
import { PackageController } from "../../../api/package.controller.js";
import {
  
  Button,
  FormLabel,
  Box,
  Typography,
  Paper,
  TextField,
} from "@mui/material";

import ReactLoading from "react-loading";

const AddPackageDay= ({onAddSuccess}) => {

  const [loading,setLoading]=useState(false);

  const initialValues = {
   days:1,
      nights:0
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
          Add Trip Duration
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={packageDayValidationSchema}
        onSubmit={(values,{resetForm}) => {
          setLoading(true);
          PackageController.addPackageDayList(values)
            .then((response) => {
              console.log("response coming: ", response);
              onAddSuccess(response.data.data);
            })
            .catch((error) => {
              console.log(error);
              
            })
            .finally(()=>{
                 resetForm();
                 setLoading(false);
               
            });
        }}
      >
        {({ values, handleChange, handleBlur,errors }) => {
        
          return (
            <Form>
                <Grid item xs={12} sx={{ width: "100%" }}>
                    <Box sx={{ display: "flex", gap: 2, mt: 1 }}>

                        {/* Days */}
                        <Box>
                            <Typography sx={{margin:1}}>Days</Typography>
                            <TextField
                                id="days"
                                name="days"
                                select
                                size="small"
                                variant="outlined"
                                fullWidth
                                value={values.days}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.days)}
                                helperText={errors.days}
                                SelectProps={{ native: true }}
                            >
                                <option value="">Select Days</option>
                                <option value={1}>1 Day</option>
                                <option value={2}>2 Days</option>
                                <option value={3}>3 Days</option>
                                <option value={4}>4 Days</option>
                            </TextField>
                        </Box>

                        {/* Nights */}
                        <Box>
                            <Typography sx={{margin:1}}>Nights</Typography>
                            <TextField
                                id="nights"
                                name="nights"
                                select
                                size="small"
                                variant="outlined"
                                fullWidth
                                value={values.nights}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.nights)}
                                helperText={errors.nights}
                                SelectProps={{ native: true }}
                            >
                                <option value="">Select Nights</option>
                                <option value={0}>0 Nights</option>
                                <option value={1}>1 Night</option>
                                <option value={2}>2 Nights</option>
                                <option value={3}>3 Nights</option>
                                <option value={4}>4 Nights</option>
                            </TextField>
                        </Box>

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
                 {loading? <ReactLoading type="bars" height={30} width={30} color="white" />:"Add Package Day"}
                </Button>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Paper>
  );
};

export default AddPackageDay;
