import {useState} from "react";
import { Formik, Form } from "formik";
import Grid from "@mui/material/Grid2";
import { packageDayValidationSchema } from "../../../utils/validationSchema.js";
import { PackageController } from "../../../api/package.controller.js";
import {
  
  Button,
  FormLabel,

  Typography,
  Paper,
  TextField,
} from "@mui/material";

import ReactLoading from "react-loading";

const AddPackageDay= ({onAddSuccess}) => {

  const [loading,setLoading]=useState(false);

  const initialValues = {
   pkgday_duration:""
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
        Add Package Day Details
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
         <Grid item xs={12} sx={{ width: "100%", marginBlock: "10px" }}>
                <FormLabel htmlFor="category_name" sx={{ fontWeight: 500 }}>
                 Add Trip Duration
                </FormLabel>
                <TextField
                  id="pkgday_duration"
                  size="small"
                  variant="outlined"
                  name="pkgday_duration"
                  placeholder="Enter Trip Duration"
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
